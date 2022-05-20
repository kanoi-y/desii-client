import { gql } from '@apollo/client'

export const GET_MESSAGE = gql`
  query GetMessage($getMessageId: String!) {
    getMessage(id: $getMessageId) {
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
      room {
        id
        groupId
        latestMessageId
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
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_MESSAGES = gql`
  query GetMessages($roomId: String!, $sort: orderByType) {
    GetMessages(roomId: $roomId, sort: $sort) {
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
      room {
        id
        groupId
        latestMessageId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`

export const CREATE_MESSAGE = gql`
  mutation CreateMessage(
    $messageType: MessageType!
    $roomId: String!
    $body: String!
  ) {
    CreateMessage(messageType: $messageType, roomId: $roomId, body: $body) {
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
      room {
        id
        groupId
        latestMessageId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($deleteMessageId: String!) {
    DeleteMessage(id: $deleteMessageId) {
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
      room {
        id
        groupId
        latestMessageId
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
