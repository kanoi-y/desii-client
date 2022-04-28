import { gql } from '@apollo/client'

export const GET_READ_MANAGEMENT = gql`
  query GetReadManagement($targetUserId: String!, $messageId: String!) {
    GetReadManagement(targetUserId: $targetUserId, messageId: $messageId) {
      id
      targetUserId
      messageId
      isRead
      createdAt
      updatedAt
    }
  }
`

export const GET_READ_MANAGEMENTS = gql`
  query GetReadManagements($messageId: String!) {
    GetReadManagements(messageId: $messageId) {
      id
      targetUserId
      messageId
      isRead
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_READ_MANAGEMENT = gql`
  mutation UpdateReadManagement($targetUserId: String!, $messageId: String!) {
    UpdateReadManagement(targetUserId: $targetUserId, messageId: $messageId) {
      id
      targetUserId
      messageId
      isRead
      createdAt
      updatedAt
    }
  }
`
