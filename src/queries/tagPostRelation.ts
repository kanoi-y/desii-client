import { gql } from '@apollo/client'

export const GET_TAG_POST_RELATIONS = gql`
  query GetTagPostRelations($tagId: String, $postId: String) {
    GetTagPostRelations(tagId: $tagId, postId: $postId) {
      id
      tagId
      postId
      createdAt
      updatedAt
      tag {
        id
        name
        createdAt
        updatedAt
      }
      post {
        id
        title
        content
        category
        createdUserId
        isPrivate
        groupId
        bgImage
        createdAt
        updatedAt
      }
    }
  }
`

export const CREATE_TAG_POST_RELATION = gql`
  mutation CreateTagPostRelation($tagId: String!, $postId: String!) {
    createTagPostRelation(tagId: $tagId, postId: $postId) {
      id
      tagId
      postId
      createdAt
      updatedAt
      tag {
        id
        name
        createdAt
        updatedAt
      }
      post {
        id
        title
        content
        category
        createdUserId
        isPrivate
        groupId
        bgImage
        createdAt
        updatedAt
      }
    }
  }
`

export const CREATE_TAG_POST_RELATIONS = gql`
  mutation CreateTagPostRelations($tagIds: [String!]!, $postId: String!) {
    createTagPostRelations(tagIds: $tagIds, postId: $postId) {
      id
      tagId
      postId
      createdAt
      updatedAt
      tag {
        id
        name
        createdAt
        updatedAt
      }
      post {
        id
        title
        content
        category
        createdUserId
        isPrivate
        groupId
        bgImage
        createdAt
        updatedAt
      }
    }
  }
`

export const DELETE_TAG_POST_RELATION = gql`
  mutation DeleteTagPostRelation($tagId: String!, $postId: String!) {
    DeleteTagPostRelation(tagId: $tagId, postId: $postId) {
      id
      tagId
      postId
      createdAt
      updatedAt
      tag {
        id
        name
        createdAt
        updatedAt
      }
      post {
        id
        title
        content
        category
        createdUserId
        isPrivate
        groupId
        bgImage
        createdAt
        updatedAt
      }
    }
  }
`

export const DELETE_TAG_POST_RELATIONS = gql`
  mutation DeleteTagPostRelations($tagPostTypes: [TagPostInputType!]!) {
    DeleteTagPostRelations(tagPostTypes: $tagPostTypes) {
      id
      tagId
      postId
      createdAt
      updatedAt
      tag {
        id
        name
        createdAt
        updatedAt
      }
      post {
        id
        title
        content
        category
        createdUserId
        isPrivate
        groupId
        bgImage
        createdAt
        updatedAt
      }
    }
  }
`
