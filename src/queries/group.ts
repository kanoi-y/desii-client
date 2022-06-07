import { gql } from '@apollo/client'

export const GET_GROUP_BY_ID = gql`
  query GetGroup($getGroupId: String!) {
    getGroup(id: $getGroupId) {
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
`

export const CREATE_GROUP = gql`
  mutation CreateGroup(
    $name: String!
    $image: String!
    $productId: String!
    $description: String
  ) {
    createGroup(
      name: $name
      image: $image
      productId: $productId
      description: $description
    ) {
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
`
export const DELETE_GROUP = gql`
  mutation DeleteGroup($deleteGroupId: String!) {
    deleteGroup(id: $deleteGroupId) {
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
`

export const UPDATE_GROUP = gql`
  mutation UpdateGroup(
    $updateGroupId: String!
    $name: String
    $description: String
    $image: String
    $adminUserId: String
  ) {
    updateGroup(
      id: $updateGroupId
      name: $name
      description: $description
      image: $image
      adminUserId: $adminUserId
    ) {
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
`
