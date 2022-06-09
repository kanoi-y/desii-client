import { gql } from '@apollo/client'

export const GET_ROOM = gql`
  query GetRoom($getRoomId: String!) {
    GetRoom(id: $getRoomId) {
      id
      latestMessageId
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
      createdAt
      updatedAt
    }
  }
`

export const GET_ONE_ON_ONE_ROOM = gql`
  query GetOneOnOneRoom($memberId: String!) {
    GetOneOnOneRoom(memberId: $memberId) {
      id
      latestMessageId
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
      createdAt
      updatedAt
    }
  }
`

export const GET_ROOMS_BY_LOGIN_USER_ID = gql`
  query GetRoomsByLoginUserId($getRoomType: GetRoomType!) {
    GetRoomsByLoginUserId(getRoomType: $getRoomType) {
      id
      latestMessageId
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
      createdAt
      updatedAt
    }
  }
`

export const CREATE_ROOM = gql`
  mutation CreateRoom($memberId: String!) {
    CreateRoom(memberId: $memberId) {
      id
      latestMessageId
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
      createdAt
      updatedAt
    }
  }
`

export const DELETE_ROOM = gql`
  mutation DeleteRoom($deleteRoomId: String!) {
    DeleteRoom(id: $deleteRoomId) {
      id
      latestMessageId
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
      createdAt
      updatedAt
    }
  }
`
