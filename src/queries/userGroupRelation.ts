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
        roomId
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
        roomId
        createdAt
        updatedAt
      }
    }
  }
`

export const DELETE_USER_GROUP_RELATION = gql`
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
        roomId
        createdAt
        updatedAt
      }
    }
  }
`
