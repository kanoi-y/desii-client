import { gql } from '@apollo/client'

export const GET_NOTIFICATIONS = gql`
  query GetNotifications($targetUserId: String!) {
    GetNotifications(targetUserId: $targetUserId) {
      id
      type
      createdUserId
      targetUserId
      message
      url
      isChecked
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_NOTIFICATION = gql`
  mutation UpdateNotification(
    $updateNotificationId: String!
    $isChecked: Boolean!
  ) {
    UpdateNotification(id: $updateNotificationId, isChecked: $isChecked) {
      id
      type
      createdUserId
      targetUserId
      message
      url
      isChecked
      createdAt
      updatedAt
    }
  }
`
