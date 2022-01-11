/* eslint-disable import/no-named-as-default */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ApolloClient from "apollo-boost";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import gql from "graphql-tag";
import fetch from "node-fetch";

admin.initializeApp();

const client = new ApolloClient({
  uri: functions.config().hasura.url,
  fetch: fetch as any,
  request: (operation: any): void => {
    operation.setContext({
      headers: {
        "x-hasura-admin-secret": functions.config().hasura.admin_secret,
      },
    });
  },
});

export const setCustomClaims = functions.auth.user().onCreate(async (user) => {
  // Hasuraの検証用のカスタムクレーム（属性情報）
  const customClaims = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": user.uid,
    },
  };

  try {
    // カスタムクレームの設定
    await admin.auth().setCustomUserClaims(user.uid, customClaims);

    // Hasuraサーバーへのユーザーデータの作成リクエスト
    await client.mutate({
      variables: { id: user.uid, name: user.displayName || "unknown" },
      mutation: gql`
        mutation InsertUsers($id: String, $name: String) {
          insert_users(objects: { id: $id, name: $name }) {
            returning {
              id
              name
              created_at
            }
          }
        }
      `,
    });

    // 初回ログインの際にユーザー作成と、カスタムクレームの設定には遅延があるため、
    // tokenリフレッシュのフック用にFirestoreへのmetaデータ追加を行う
    await admin.firestore().collection("user_meta").doc(user.uid).create({
      refreshTime: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (e) {
    console.log(e);
  }
});
