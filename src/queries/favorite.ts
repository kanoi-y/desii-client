import { gql } from '@apollo/client'

export const GET_FAVORITES = gql`
  query GetFavorites($createdUserId: String, $postId: String) {
    GetFavorites(createdUserId: $createdUserId, postId: $postId) {
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
export const CREATE_FAVORITE = gql`
  mutation CreateFavorite($postId: String!) {
    createFavorite(postId: $postId) {
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
export const DELETE_FAVORITE = gql`
  mutation DeleteUserGroupRelation($userId: String!, $groupId: String!) {
    DeleteUserGroupRelation(userId: $userId, groupId: $groupId) {
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
