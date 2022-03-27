import { gql } from '@apollo/client'

export const GET_CURRENT_USER = gql`
  query GetCurrentUser($accessToken: String!) {
    getCurrentUser(accessToken: $accessToken) {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
  }
`

export const GET_USER_BY_ID = gql`
  query GetUser($getUserId: String!) {
    getUser(id: $getUserId) {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $description: String
    $image: String
  ) {
    createUser(
      name: $name
      email: $email
      description: $description
      image: $image
    ) {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: String!) {
    deleteUser(id: $deleteUserId) {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $updateUserId: String!
    $name: String
    $email: String
    $description: String
    $image: String
  ) {
    updateUser(
      id: $updateUserId
      name: $name
      email: $email
      description: $description
      image: $image
    ) {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
  }
`
