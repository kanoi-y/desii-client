import { gql } from '@apollo/client'

export const GET_ONE_ON_ONE_ROOMS = gql`
  query GetOneOnOneRooms($targetMemberId: String!, $sort: orderByType) {
    GetOneOnOneRooms(targetMemberId: $targetMemberId, sort: $sort) {
      id
      memberId1
      memberId2
      latestMessageId
      latestMessage {
        id
        type
        targetId
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

export const CREATE_ONE_ON_ONE_ROOM = gql`
  mutation CreateOneOnOneRoom($memberId1: String!, $memberId2: String!) {
    CreateOneOnOneRoom(memberId1: $memberId1, memberId2: $memberId2) {
      id
      memberId1
      memberId2
      latestMessageId
      createdAt
      updatedAt
    }
  }
`

export const DELETE_ONE_ON_ONE_ROOM = gql`
  mutation DeleteOneOnOneRoom($deleteOneOnOneRoomId: String!) {
    DeleteOneOnOneRoom(id: $deleteOneOnOneRoomId) {
      id
      memberId1
      memberId2
      latestMessageId
      createdAt
      updatedAt
    }
  }
`
