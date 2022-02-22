import { gql } from '@apollo/client'

export const GET_USER_GROUP_RELATIONS = gql`
  query GetUserGroupRelations($userId: String, $groupId: String) {
    GetUserGroupRelations(userId: $userId, groupId: $groupId) {
      id
      userId
      groupId
      createdAt
      updatedAt
      user {
        id
        name
        email
        description
        image
        accessToken
        createdAt
        updatedAt
      }
      group {
        id
        name
        description
        image
        adminUserId
        productId
        createdAt
        updatedAt
      }
    }
  }
`

export const CREATE_USER_GROUP_RELATION = gql`
  mutation CreateUserGroupRelation($userId: String!, $groupId: String!) {
    createUserGroupRelation(userId: $userId, groupId: $groupId) {
      id
      userId
      groupId
      createdAt
      updatedAt
      user {
        id
        name
        email
        description
        image
        accessToken
        createdAt
        updatedAt
      }
      group {
        id
        name
        description
        image
        adminUserId
        productId
        createdAt
        updatedAt
      }
    }
  }
`

export const DELETE_USER_GROUP_RELATION = gql`
  mutation DeleteFavorite($postId: String!) {
    DeleteFavorite(postId: $postId) {
      id
      createdUserId
      postId
      createdAt
      updatedAt
      createdUser {
        id
        name
        email
        emailVerified
        description
        image
        accessToken
        createdAt
        updatedAt
      }
      post {
        id
        title
        content
        category
        createdUserId
        isPrivate
        groupId
        bgImage
        createdAt
        updatedAt
      }
    }
  }
`
