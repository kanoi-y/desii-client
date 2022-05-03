import { gql } from '@apollo/client'

export const GET_ROOM = gql`
  query GetRoom($getRoomId: String!) {
    GetRoom(id: $getRoomId) {
      id
      groupId
      latestMessageId
      latestMessage {
        id
        type
        roomId
        userId
        body
        user {
          id
          name
          email
          description
          image
          createdAt
          updatedAt
        }
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
      groupId
      latestMessageId
      latestMessage {
        id
        type
        roomId
        userId
        body
        user {
          id
          name
          email
          description
          image
          createdAt
          updatedAt
        }
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
      groupId
      latestMessageId
      latestMessage {
        id
        type
        roomId
        userId
        body
        user {
          id
          name
          email
          description
          image
          createdAt
          updatedAt
        }
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
      groupId
      latestMessageId
      latestMessage {
        id
        type
        roomId
        userId
        body
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
      groupId
      latestMessageId
      latestMessage {
        id
        type
        roomId
        userId
        body
        user {
          id
          name
          email
          description
          image
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
