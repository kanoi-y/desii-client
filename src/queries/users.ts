import { gql } from '@apollo/client'

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      description
      email
      image
      iconImageId
      createdAt
      updatedAt
    }
  }
`

export const GET_USER_BY_ID = gql`
  query GetUserById($id: uuid!) {
    users_by_pk(id: $id) {
      id
      name
      description
      email
      image
      iconImageId
      createdAt
      updatedAt
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $description: String!
    $email: String!
    $iconImageId: uuid!
  ) {
    insert_users_one(
      object: {
        name: $name
        description: $description
        email: $email
        iconImageId: $iconImageId
      }
    ) {
      _id
      name
      description
      email
      iconImageId
      createdAt
      updatedAt
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($id: uuid!) {
    delete_users_by_pk(_id: $id) {
      _id
      name
      description
      email
      iconImageId
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: uuid!
    $name: String
    $description: String
    $email: String
    $iconImageId: uuid
  ) {
    update_users_by_pk(
      pk_columns: { _id: $id }
      _set: {
        name: $name
        description: $description
        email: $email
        iconImageId: $iconImageId
      }
    ) {
      _id
      name
      description
      email
      iconImageId
      createdAt
      updatedAt
    }
  }
`

