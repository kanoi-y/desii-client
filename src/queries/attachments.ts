import { gql } from '@apollo/client'

export const GET_ATTACHMENT_BY_ID = gql`
  query GetAttachmentById($id: uuid!) {
    attachments_by_pk(_id: $id) {
      _id
      name
      size
      filePath
      createdUserId
      createdAt
      updatedAt
    }
  }
`

export const CREATE_ATTACHMENT = gql`
  mutation CreateAttachment(
    $name: String!
    $size: Int!
    $filePath: String!
    $createdUserId: uuid!
  ) {
    insert_attachments_one(
      object: {
        name: $name
        size: $size
        filePath: $filePath
        createdUserId: $createdUserId
      }
    ) {
      _id
      name
      size
      filePath
      createdUserId
      createdAt
      updatedAt
    }
  }
`

export const DELETE_ATTACHMENT = gql`
  mutation DeleteAttachment($id: uuid!) {
    delete_attachments_by_pk(_id: $id) {
      _id
      name
      size
      filePath
      createdUserId
      createdAt
      updatedAt
    }
  }
`
