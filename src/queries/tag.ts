import { gql } from '@apollo/client'

export const GET_TAG_BY_NAME = gql`
  query GetTagByName($name: String!) {
    GetTagByName(name: $name) {
      id
      name
      createdAt
      updatedAt
    }
  }
`
export const CREATE_TAG = gql`
  mutation CreateTag($name: String!) {
    createTag(name: $name) {
      id
      name
      createdAt
      updatedAt
    }
  }
`
