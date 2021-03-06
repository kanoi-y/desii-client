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
      bgImage
      createdAt
      updatedAt
    }
  }
`

export const GET_POSTS = gql`
  query GetPosts(
    $userId: String
    $groupId: String
    $category: PostCategory
    $isPrivate: Boolean
    $sort: postOrderByType
    $take: Int
    $skip: Int
    $searchText: String
  ) {
    GetPosts(
      userId: $userId
      groupId: $groupId
      category: $category
      isPrivate: $isPrivate
      sort: $sort
      take: $take
      skip: $skip
      searchText: $searchText
    ) {
      count
      posts {
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

export const GET_MATCHING_POSTS = gql`
  query GetMatchingPosts($postId: String!) {
    GetMatchingPosts(postId: $postId) {
      count
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

export const CREATE_POST = gql`
  mutation CreatePost(
    $title: String!
    $content: String!
    $category: PostCategory!
    $isPrivate: Boolean!
    $groupId: String
    $bgImage: String
  ) {
    createPost(
      title: $title
      content: $content
      category: $category
      isPrivate: $isPrivate
      groupId: $groupId
      bgImage: $bgImage
    ) {
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
      bgImage
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
    $bgImage: String
  ) {
    updatePost(
      id: $updatePostId
      title: $title
      content: $content
      category: $category
      isPrivate: $isPrivate
      bgImage: $bgImage
    ) {
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
`
