import { gql } from '@apollo/client'

export const GET_ATTACHMENT_BY_ID = gql`
  query GetAttachmentById($getAttachmentByIdId: String!) {
    GetAttachmentById(id: $getAttachmentByIdId) {
      id
      name
      filePath
      createdUserId
      createdAt
      updatedAt
    }
  }
`

export const CREATE_ATTACHMENT = gql`
  mutation CreateAttachment($file: Upload!) {
    createAttachment(file: $file) {
      id
      name
      filePath
      createdUserId
      createdAt
      updatedAt
    }
  }
`
