import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
  query GetMessages($targetId: String!, $sort: orderByType) {
    GetMessages(targetId: $targetId, sort: $sort) {
      id
      type
      targetId
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
    $targetId: String!
    $body: String!
  ) {
    CreateMessage(messageType: $messageType, targetId: $targetId, body: $body) {
      id
      type
      targetId
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
      targetId
      userId
      body
      createdAt
      updatedAt
    }
  }
`
