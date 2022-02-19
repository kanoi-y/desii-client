import { gql } from '@apollo/client'

export const GET_POST_BY_ID = gql`
  query GetPost($getPostId: String!) {
    getPost(id: $getPostId) {
      id
      title
      content
      category
      createdUserId
      isPrivate
      groupId
      createdAt
      updatedAt
    }
  }
`

export const GET_POSTS = gql`
  query GetPosts($userId: String, $groupId: String) {
    GetPosts(userId: $userId, groupId: $groupId) {
      id
      title
      content
      category
      createdUserId
      isPrivate
      groupId
      createdAt
      updatedAt
    }
  }
`

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $content: String!
    $category: PostCategory!
    $isPrivate: Boolean!
    $groupId: String
  ) {
    createPost(
      title: $title
      content: $content
      category: $category
      isPrivate: $isPrivate
      groupId: $groupId
    ) {
      id
      title
      content
      category
      createdUserId
      isPrivate
      groupId
      createdAt
      updatedAt
    }
  }
`
export const DELETE_POST = gql`
  mutation DeletePost($deletePostId: String!) {
    deletePost(id: $deletePostId) {
      id
      title
      content
      category
      createdUserId
      isPrivate
      groupId
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_POST = gql`
  mutation UpdatePost(
    $updatePostId: String!
    $title: String
    $content: String
    $category: PostCategory
    $isPrivate: Boolean
  ) {
    updatePost(
      id: $updatePostId
      title: $title
      content: $content
      category: $category
      isPrivate: $isPrivate
    ) {
      id
      title
      content
      category
      createdUserId
      isPrivate
      groupId
      createdAt
      updatedAt
    }
  }
`