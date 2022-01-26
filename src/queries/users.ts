import { gql } from '@apollo/client'

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
  mutation CreateUserMutation(
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
  mutation DeleteUserMutation($deleteUserId: String!) {
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
  mutation UpdateUserMutation(
    $updateUserId: String!
    $name: String!
    $email: String!
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
