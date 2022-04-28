import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
  query GetMessages($roomId: String!, $sort: orderByType) {
    GetMessages(roomId: $roomId, sort: $sort) {
      id
      type
      roomId
      userId
      body
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
      createdAt
      updatedAt
    }
  }
`
