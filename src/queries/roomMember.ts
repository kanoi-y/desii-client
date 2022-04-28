import { gql } from '@apollo/client'

export const GET_ROOM_MEMBERS = gql`
  query GetRoomMembers($userId: String, $roomId: String) {
    getRoomMembers(userId: $userId, roomId: $roomId) {
      id
      roomId
      userId
      createdAt
      updatedAt
      room {
        id
        groupId
        latestMessageId
        createdAt
        updatedAt
      }
      user {
        id
        name
        email
        description
        image
        accessToken
        createdAt
        updatedAt
      }
    }
  }
`
