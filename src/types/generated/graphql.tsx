import * as Apollo from '@apollo/client'
import { gql } from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date
}

export type Favorite = {
  __typename?: 'Favorite'
  createdAt: Scalars['DateTime']
  createdUser: User
  createdUserId: Scalars['String']
  id: Scalars['String']
  post: Post
  postId: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type Group = {
  __typename?: 'Group'
  adminUserId: Scalars['String']
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['String']
  image: Scalars['String']
  name: Scalars['String']
  productId: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type Mutation = {
  __typename?: 'Mutation'
  DeleteFavorite: Favorite
  DeleteUserGroupRelation: UserGroupRelation
  createFavorite: Favorite
  createGroup: Group
  createPost: Post
  createUser: User
  createUserGroupRelation: UserGroupRelation
  deleteGroup: Group
  deletePost: Post
  deleteUser: User
  updateGroup: Group
  updatePost: Post
  updateUser: User
}

export type MutationDeleteFavoriteArgs = {
  postId: Scalars['String']
}

export type MutationDeleteUserGroupRelationArgs = {
  groupId: Scalars['String']
  userId: Scalars['String']
}

export type MutationCreateFavoriteArgs = {
  postId: Scalars['String']
}

export type MutationCreateGroupArgs = {
  description?: InputMaybe<Scalars['String']>
  image: Scalars['String']
  name: Scalars['String']
  productId: Scalars['String']
}

export type MutationCreatePostArgs = {
  bgImage?: InputMaybe<Scalars['String']>
  category: PostCategory
  content: Scalars['String']
  groupId?: InputMaybe<Scalars['String']>
  isPrivate: Scalars['Boolean']
  title: Scalars['String']
}

export type MutationCreateUserArgs = {
  description?: InputMaybe<Scalars['String']>
  email: Scalars['String']
  image?: InputMaybe<Scalars['String']>
  name: Scalars['String']
}

export type MutationCreateUserGroupRelationArgs = {
  groupId: Scalars['String']
  userId: Scalars['String']
}

export type MutationDeleteGroupArgs = {
  id: Scalars['String']
}

export type MutationDeletePostArgs = {
  id: Scalars['String']
}

export type MutationDeleteUserArgs = {
  id: Scalars['String']
}

export type MutationUpdateGroupArgs = {
  adminUserId?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  id: Scalars['String']
  image?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type MutationUpdatePostArgs = {
  bgImage?: InputMaybe<Scalars['String']>
  category?: InputMaybe<PostCategory>
  content?: InputMaybe<Scalars['String']>
  id: Scalars['String']
  isPrivate?: InputMaybe<Scalars['Boolean']>
  title?: InputMaybe<Scalars['String']>
}

export type MutationUpdateUserArgs = {
  description?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  id: Scalars['String']
  image?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type Post = {
  __typename?: 'Post'
  bgImage?: Maybe<Scalars['String']>
  category: PostCategory
  content: Scalars['String']
  createdAt: Scalars['DateTime']
  createdUserId: Scalars['String']
  groupId?: Maybe<Scalars['String']>
  id: Scalars['String']
  isPrivate: Scalars['Boolean']
  title: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export enum PostCategory {
  GiveMe = 'GIVE_ME',
  GiveYou = 'GIVE_YOU',
}

export type Query = {
  __typename?: 'Query'
  GetFavorites: Array<Favorite>
  GetPosts: Array<Post>
  GetUserGroupRelations: Array<UserGroupRelation>
  getCurrentUser?: Maybe<User>
  getGroup?: Maybe<Group>
  getPost?: Maybe<Post>
  getUser?: Maybe<User>
}

export type QueryGetFavoritesArgs = {
  createdUserId?: InputMaybe<Scalars['String']>
  postId?: InputMaybe<Scalars['String']>
}

export type QueryGetPostsArgs = {
  groupId?: InputMaybe<Scalars['String']>
  isPrivate?: InputMaybe<Scalars['Boolean']>
  userId?: InputMaybe<Scalars['String']>
}

export type QueryGetUserGroupRelationsArgs = {
  groupId?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['String']>
}

export type QueryGetCurrentUserArgs = {
  accessToken: Scalars['String']
}

export type QueryGetGroupArgs = {
  id: Scalars['String']
}

export type QueryGetPostArgs = {
  id: Scalars['String']
}

export type QueryGetUserArgs = {
  id: Scalars['String']
}

export type User = {
  __typename?: 'User'
  accessToken?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  email: Scalars['String']
  emailVerified?: Maybe<Scalars['DateTime']>
  id: Scalars['String']
  image?: Maybe<Scalars['String']>
  name: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export type UserGroupRelation = {
  __typename?: 'UserGroupRelation'
  createdAt: Scalars['DateTime']
  group: Group
  groupId: Scalars['String']
  id: Scalars['String']
  updatedAt: Scalars['DateTime']
  user: User
  userId: Scalars['String']
}

export type GetFavoritesQueryVariables = Exact<{
  createdUserId?: InputMaybe<Scalars['String']>
  postId?: InputMaybe<Scalars['String']>
}>

export type GetFavoritesQuery = {
  __typename?: 'Query'
  GetFavorites: Array<{
    __typename?: 'Favorite'
    id: string
    createdUserId: string
    postId: string
    createdAt: Date
    updatedAt: Date
    createdUser: {
      __typename?: 'User'
      id: string
      name: string
      email: string
      description?: string | null
      image?: string | null
      accessToken?: string | null
      createdAt: Date
      updatedAt: Date
    }
    post: {
      __typename?: 'Post'
      id: string
      title: string
      content: string
      category: PostCategory
      createdUserId: string
      isPrivate: boolean
      groupId?: string | null
      bgImage?: string | null
      createdAt: Date
      updatedAt: Date
    }
  }>
}

export type CreateFavoriteMutationVariables = Exact<{
  postId: Scalars['String']
}>

export type CreateFavoriteMutation = {
  __typename?: 'Mutation'
  createFavorite: {
    __typename?: 'Favorite'
    id: string
    createdUserId: string
    postId: string
    createdAt: Date
    updatedAt: Date
    createdUser: {
      __typename?: 'User'
      id: string
      name: string
      email: string
      description?: string | null
      image?: string | null
      accessToken?: string | null
      createdAt: Date
      updatedAt: Date
    }
    post: {
      __typename?: 'Post'
      id: string
      title: string
      content: string
      category: PostCategory
      createdUserId: string
      isPrivate: boolean
      groupId?: string | null
      bgImage?: string | null
      createdAt: Date
      updatedAt: Date
    }
  }
}

export type DeleteFavoriteMutationVariables = Exact<{
  postId: Scalars['String']
}>

export type DeleteFavoriteMutation = {
  __typename?: 'Mutation'
  DeleteFavorite: {
    __typename?: 'Favorite'
    id: string
    createdUserId: string
    postId: string
    createdAt: Date
    updatedAt: Date
    createdUser: {
      __typename?: 'User'
      id: string
      name: string
      email: string
      description?: string | null
      image?: string | null
      accessToken?: string | null
      createdAt: Date
      updatedAt: Date
    }
    post: {
      __typename?: 'Post'
      id: string
      title: string
      content: string
      category: PostCategory
      createdUserId: string
      isPrivate: boolean
      groupId?: string | null
      bgImage?: string | null
      createdAt: Date
      updatedAt: Date
    }
  }
}

export type GetGroupQueryVariables = Exact<{
  getGroupId: Scalars['String']
}>

export type GetGroupQuery = {
  __typename?: 'Query'
  getGroup?: {
    __typename?: 'Group'
    id: string
    name: string
    description?: string | null
    image: string
    adminUserId: string
    productId: string
    createdAt: Date
    updatedAt: Date
  } | null
}

export type CreateGroupMutationVariables = Exact<{
  name: Scalars['String']
  image: Scalars['String']
  productId: Scalars['String']
  description?: InputMaybe<Scalars['String']>
}>

export type CreateGroupMutation = {
  __typename?: 'Mutation'
  createGroup: {
    __typename?: 'Group'
    id: string
    name: string
    description?: string | null
    image: string
    adminUserId: string
    productId: string
    createdAt: Date
    updatedAt: Date
  }
}

export type DeleteGroupMutationVariables = Exact<{
  deleteGroupId: Scalars['String']
}>

export type DeleteGroupMutation = {
  __typename?: 'Mutation'
  deleteGroup: {
    __typename?: 'Group'
    id: string
    name: string
    description?: string | null
    image: string
    adminUserId: string
    productId: string
    createdAt: Date
    updatedAt: Date
  }
}

export type UpdateGroupMutationVariables = Exact<{
  updateGroupId: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  image?: InputMaybe<Scalars['String']>
  adminUserId?: InputMaybe<Scalars['String']>
}>

export type UpdateGroupMutation = {
  __typename?: 'Mutation'
  updateGroup: {
    __typename?: 'Group'
    id: string
    name: string
    description?: string | null
    image: string
    adminUserId: string
    productId: string
    createdAt: Date
    updatedAt: Date
  }
}

export type GetPostQueryVariables = Exact<{
  getPostId: Scalars['String']
}>

export type GetPostQuery = {
  __typename?: 'Query'
  getPost?: {
    __typename?: 'Post'
    id: string
    title: string
    content: string
    category: PostCategory
    createdUserId: string
    isPrivate: boolean
    groupId?: string | null
    bgImage?: string | null
    createdAt: Date
    updatedAt: Date
  } | null
}

export type GetPostsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>
  groupId?: InputMaybe<Scalars['String']>
  isPrivate?: InputMaybe<Scalars['Boolean']>
}>

export type GetPostsQuery = {
  __typename?: 'Query'
  GetPosts: Array<{
    __typename?: 'Post'
    id: string
    title: string
    content: string
    category: PostCategory
    createdUserId: string
    isPrivate: boolean
    groupId?: string | null
    bgImage?: string | null
    createdAt: Date
    updatedAt: Date
  }>
}

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String']
  content: Scalars['String']
  category: PostCategory
  isPrivate: Scalars['Boolean']
  groupId?: InputMaybe<Scalars['String']>
  bgImage?: InputMaybe<Scalars['String']>
}>

export type CreatePostMutation = {
  __typename?: 'Mutation'
  createPost: {
    __typename?: 'Post'
    id: string
    title: string
    content: string
    category: PostCategory
    createdUserId: string
    isPrivate: boolean
    groupId?: string | null
    bgImage?: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export type DeletePostMutationVariables = Exact<{
  deletePostId: Scalars['String']
}>

export type DeletePostMutation = {
  __typename?: 'Mutation'
  deletePost: {
    __typename?: 'Post'
    id: string
    title: string
    content: string
    category: PostCategory
    createdUserId: string
    isPrivate: boolean
    groupId?: string | null
    bgImage?: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export type UpdatePostMutationVariables = Exact<{
  updatePostId: Scalars['String']
  title?: InputMaybe<Scalars['String']>
  content?: InputMaybe<Scalars['String']>
  category?: InputMaybe<PostCategory>
  isPrivate?: InputMaybe<Scalars['Boolean']>
  bgImage?: InputMaybe<Scalars['String']>
}>

export type UpdatePostMutation = {
  __typename?: 'Mutation'
  updatePost: {
    __typename?: 'Post'
    id: string
    title: string
    content: string
    category: PostCategory
    createdUserId: string
    isPrivate: boolean
    groupId?: string | null
    bgImage?: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export type GetUserGroupRelationsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>
  groupId?: InputMaybe<Scalars['String']>
}>

export type GetUserGroupRelationsQuery = {
  __typename?: 'Query'
  GetUserGroupRelations: Array<{
    __typename?: 'UserGroupRelation'
    id: string
    userId: string
    groupId: string
    createdAt: Date
    updatedAt: Date
    user: {
      __typename?: 'User'
      id: string
      name: string
      email: string
      description?: string | null
      image?: string | null
      accessToken?: string | null
      createdAt: Date
      updatedAt: Date
    }
    group: {
      __typename?: 'Group'
      id: string
      name: string
      description?: string | null
      image: string
      adminUserId: string
      productId: string
      createdAt: Date
      updatedAt: Date
    }
  }>
}

export type CreateUserGroupRelationMutationVariables = Exact<{
  userId: Scalars['String']
  groupId: Scalars['String']
}>

export type CreateUserGroupRelationMutation = {
  __typename?: 'Mutation'
  createUserGroupRelation: {
    __typename?: 'UserGroupRelation'
    id: string
    userId: string
    groupId: string
    createdAt: Date
    updatedAt: Date
    user: {
      __typename?: 'User'
      id: string
      name: string
      email: string
      description?: string | null
      image?: string | null
      accessToken?: string | null
      createdAt: Date
      updatedAt: Date
    }
    group: {
      __typename?: 'Group'
      id: string
      name: string
      description?: string | null
      image: string
      adminUserId: string
      productId: string
      createdAt: Date
      updatedAt: Date
    }
  }
}

export type DeleteUserGroupRelationMutationVariables = Exact<{
  userId: Scalars['String']
  groupId: Scalars['String']
}>

export type DeleteUserGroupRelationMutation = {
  __typename?: 'Mutation'
  DeleteUserGroupRelation: {
    __typename?: 'UserGroupRelation'
    id: string
    userId: string
    groupId: string
    createdAt: Date
    updatedAt: Date
    user: {
      __typename?: 'User'
      id: string
      name: string
      email: string
      description?: string | null
      image?: string | null
      accessToken?: string | null
      createdAt: Date
      updatedAt: Date
    }
    group: {
      __typename?: 'Group'
      id: string
      name: string
      description?: string | null
      image: string
      adminUserId: string
      productId: string
      createdAt: Date
      updatedAt: Date
    }
  }
}

export type GetCurrentUserQueryVariables = Exact<{
  accessToken: Scalars['String']
}>

export type GetCurrentUserQuery = {
  __typename?: 'Query'
  getCurrentUser?: {
    __typename?: 'User'
    id: string
    name: string
    email: string
    description?: string | null
    image?: string | null
    createdAt: Date
    updatedAt: Date
  } | null
}

export type GetUserQueryVariables = Exact<{
  getUserId: Scalars['String']
}>

export type GetUserQuery = {
  __typename?: 'Query'
  getUser?: {
    __typename?: 'User'
    id: string
    name: string
    email: string
    description?: string | null
    image?: string | null
    createdAt: Date
    updatedAt: Date
  } | null
}

export type CreateUserMutationMutationVariables = Exact<{
  name: Scalars['String']
  email: Scalars['String']
  description?: InputMaybe<Scalars['String']>
  image?: InputMaybe<Scalars['String']>
}>

export type CreateUserMutationMutation = {
  __typename?: 'Mutation'
  createUser: {
    __typename?: 'User'
    id: string
    name: string
    email: string
    description?: string | null
    image?: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export type DeleteUserMutationMutationVariables = Exact<{
  deleteUserId: Scalars['String']
}>

export type DeleteUserMutationMutation = {
  __typename?: 'Mutation'
  deleteUser: {
    __typename?: 'User'
    id: string
    name: string
    email: string
    description?: string | null
    image?: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export type UpdateUserMutationMutationVariables = Exact<{
  updateUserId: Scalars['String']
  name?: InputMaybe<Scalars['String']>
  email?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  image?: InputMaybe<Scalars['String']>
}>

export type UpdateUserMutationMutation = {
  __typename?: 'Mutation'
  updateUser: {
    __typename?: 'User'
    id: string
    name: string
    email: string
    description?: string | null
    image?: string | null
    createdAt: Date
    updatedAt: Date
  }
}

export const GetFavoritesDocument = gql`
  query GetFavorites($createdUserId: String, $postId: String) {
    GetFavorites(createdUserId: $createdUserId, postId: $postId) {
      id
      createdUserId
      postId
      createdAt
      updatedAt
      createdUser {
        id
        name
        email
        description
        image
        accessToken
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

/**
 * __useGetFavoritesQuery__
 *
 * To run a query within a React component, call `useGetFavoritesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFavoritesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFavoritesQuery({
 *   variables: {
 *      createdUserId: // value for 'createdUserId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetFavoritesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetFavoritesQuery,
    GetFavoritesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetFavoritesQuery, GetFavoritesQueryVariables>(
    GetFavoritesDocument,
    options
  )
}
export function useGetFavoritesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetFavoritesQuery,
    GetFavoritesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetFavoritesQuery, GetFavoritesQueryVariables>(
    GetFavoritesDocument,
    options
  )
}
export type GetFavoritesQueryHookResult = ReturnType<
  typeof useGetFavoritesQuery
>
export type GetFavoritesLazyQueryHookResult = ReturnType<
  typeof useGetFavoritesLazyQuery
>
export type GetFavoritesQueryResult = Apollo.QueryResult<
  GetFavoritesQuery,
  GetFavoritesQueryVariables
>
export const CreateFavoriteDocument = gql`
  mutation CreateFavorite($postId: String!) {
    createFavorite(postId: $postId) {
      id
      createdUserId
      postId
      createdAt
      updatedAt
      createdUser {
        id
        name
        email
        description
        image
        accessToken
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
export type CreateFavoriteMutationFn = Apollo.MutationFunction<
  CreateFavoriteMutation,
  CreateFavoriteMutationVariables
>

/**
 * __useCreateFavoriteMutation__
 *
 * To run a mutation, you first call `useCreateFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFavoriteMutation, { data, loading, error }] = useCreateFavoriteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateFavoriteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateFavoriteMutation,
    CreateFavoriteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateFavoriteMutation,
    CreateFavoriteMutationVariables
  >(CreateFavoriteDocument, options)
}
export type CreateFavoriteMutationHookResult = ReturnType<
  typeof useCreateFavoriteMutation
>
export type CreateFavoriteMutationResult =
  Apollo.MutationResult<CreateFavoriteMutation>
export type CreateFavoriteMutationOptions = Apollo.BaseMutationOptions<
  CreateFavoriteMutation,
  CreateFavoriteMutationVariables
>
export const DeleteFavoriteDocument = gql`
  mutation DeleteFavorite($postId: String!) {
    DeleteFavorite(postId: $postId) {
      id
      createdUserId
      postId
      createdAt
      updatedAt
      createdUser {
        id
        name
        email
        description
        image
        accessToken
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
export type DeleteFavoriteMutationFn = Apollo.MutationFunction<
  DeleteFavoriteMutation,
  DeleteFavoriteMutationVariables
>

/**
 * __useDeleteFavoriteMutation__
 *
 * To run a mutation, you first call `useDeleteFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFavoriteMutation, { data, loading, error }] = useDeleteFavoriteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeleteFavoriteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteFavoriteMutation,
    DeleteFavoriteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteFavoriteMutation,
    DeleteFavoriteMutationVariables
  >(DeleteFavoriteDocument, options)
}
export type DeleteFavoriteMutationHookResult = ReturnType<
  typeof useDeleteFavoriteMutation
>
export type DeleteFavoriteMutationResult =
  Apollo.MutationResult<DeleteFavoriteMutation>
export type DeleteFavoriteMutationOptions = Apollo.BaseMutationOptions<
  DeleteFavoriteMutation,
  DeleteFavoriteMutationVariables
>
export const GetGroupDocument = gql`
  query GetGroup($getGroupId: String!) {
    getGroup(id: $getGroupId) {
      id
      name
      description
      image
      adminUserId
      productId
      createdAt
      updatedAt
    }
  }
`

/**
 * __useGetGroupQuery__
 *
 * To run a query within a React component, call `useGetGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupQuery({
 *   variables: {
 *      getGroupId: // value for 'getGroupId'
 *   },
 * });
 */
export function useGetGroupQuery(
  baseOptions: Apollo.QueryHookOptions<GetGroupQuery, GetGroupQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetGroupQuery, GetGroupQueryVariables>(
    GetGroupDocument,
    options
  )
}
export function useGetGroupLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGroupQuery,
    GetGroupQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetGroupQuery, GetGroupQueryVariables>(
    GetGroupDocument,
    options
  )
}
export type GetGroupQueryHookResult = ReturnType<typeof useGetGroupQuery>
export type GetGroupLazyQueryHookResult = ReturnType<
  typeof useGetGroupLazyQuery
>
export type GetGroupQueryResult = Apollo.QueryResult<
  GetGroupQuery,
  GetGroupQueryVariables
>
export const CreateGroupDocument = gql`
  mutation CreateGroup(
    $name: String!
    $image: String!
    $productId: String!
    $description: String
  ) {
    createGroup(
      name: $name
      image: $image
      productId: $productId
      description: $description
    ) {
      id
      name
      description
      image
      adminUserId
      productId
      createdAt
      updatedAt
    }
  }
`
export type CreateGroupMutationFn = Apollo.MutationFunction<
  CreateGroupMutation,
  CreateGroupMutationVariables
>

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      name: // value for 'name'
 *      image: // value for 'image'
 *      productId: // value for 'productId'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreateGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateGroupMutation,
    CreateGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(
    CreateGroupDocument,
    options
  )
}
export type CreateGroupMutationHookResult = ReturnType<
  typeof useCreateGroupMutation
>
export type CreateGroupMutationResult =
  Apollo.MutationResult<CreateGroupMutation>
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<
  CreateGroupMutation,
  CreateGroupMutationVariables
>
export const DeleteGroupDocument = gql`
  mutation DeleteGroup($deleteGroupId: String!) {
    deleteGroup(id: $deleteGroupId) {
      id
      name
      description
      image
      adminUserId
      productId
      createdAt
      updatedAt
    }
  }
`
export type DeleteGroupMutationFn = Apollo.MutationFunction<
  DeleteGroupMutation,
  DeleteGroupMutationVariables
>

/**
 * __useDeleteGroupMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutation, { data, loading, error }] = useDeleteGroupMutation({
 *   variables: {
 *      deleteGroupId: // value for 'deleteGroupId'
 *   },
 * });
 */
export function useDeleteGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteGroupMutation,
    DeleteGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(
    DeleteGroupDocument,
    options
  )
}
export type DeleteGroupMutationHookResult = ReturnType<
  typeof useDeleteGroupMutation
>
export type DeleteGroupMutationResult =
  Apollo.MutationResult<DeleteGroupMutation>
export type DeleteGroupMutationOptions = Apollo.BaseMutationOptions<
  DeleteGroupMutation,
  DeleteGroupMutationVariables
>
export const UpdateGroupDocument = gql`
  mutation UpdateGroup(
    $updateGroupId: String!
    $name: String
    $description: String
    $image: String
    $adminUserId: String
  ) {
    updateGroup(
      id: $updateGroupId
      name: $name
      description: $description
      image: $image
      adminUserId: $adminUserId
    ) {
      id
      name
      description
      image
      adminUserId
      productId
      createdAt
      updatedAt
    }
  }
`
export type UpdateGroupMutationFn = Apollo.MutationFunction<
  UpdateGroupMutation,
  UpdateGroupMutationVariables
>

/**
 * __useUpdateGroupMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMutation, { data, loading, error }] = useUpdateGroupMutation({
 *   variables: {
 *      updateGroupId: // value for 'updateGroupId'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *      adminUserId: // value for 'adminUserId'
 *   },
 * });
 */
export function useUpdateGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateGroupMutation,
    UpdateGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(
    UpdateGroupDocument,
    options
  )
}
export type UpdateGroupMutationHookResult = ReturnType<
  typeof useUpdateGroupMutation
>
export type UpdateGroupMutationResult =
  Apollo.MutationResult<UpdateGroupMutation>
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<
  UpdateGroupMutation,
  UpdateGroupMutationVariables
>
export const GetPostDocument = gql`
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

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      getPostId: // value for 'getPostId'
 *   },
 * });
 */
export function useGetPostQuery(
  baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(
    GetPostDocument,
    options
  )
}
export function useGetPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(
    GetPostDocument,
    options
  )
}
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>
export type GetPostQueryResult = Apollo.QueryResult<
  GetPostQuery,
  GetPostQueryVariables
>
export const GetPostsDocument = gql`
  query GetPosts($userId: String, $groupId: String, $isPrivate: Boolean) {
    GetPosts(userId: $userId, groupId: $groupId, isPrivate: $isPrivate) {
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

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      groupId: // value for 'groupId'
 *      isPrivate: // value for 'isPrivate'
 *   },
 * });
 */
export function useGetPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    options
  )
}
export function useGetPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPostsQuery,
    GetPostsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(
    GetPostsDocument,
    options
  )
}
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>
export type GetPostsLazyQueryHookResult = ReturnType<
  typeof useGetPostsLazyQuery
>
export type GetPostsQueryResult = Apollo.QueryResult<
  GetPostsQuery,
  GetPostsQueryVariables
>
export const CreatePostDocument = gql`
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
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      category: // value for 'category'
 *      isPrivate: // value for 'isPrivate'
 *      groupId: // value for 'groupId'
 *      bgImage: // value for 'bgImage'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePostMutation,
    CreatePostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options
  )
}
export type CreatePostMutationHookResult = ReturnType<
  typeof useCreatePostMutation
>
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>
export const DeletePostDocument = gql`
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
export type DeletePostMutationFn = Apollo.MutationFunction<
  DeletePostMutation,
  DeletePostMutationVariables
>

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      deletePostId: // value for 'deletePostId'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePostMutation,
    DeletePostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument,
    options
  )
}
export type DeletePostMutationHookResult = ReturnType<
  typeof useDeletePostMutation
>
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
  DeletePostMutation,
  DeletePostMutationVariables
>
export const UpdatePostDocument = gql`
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
export type UpdatePostMutationFn = Apollo.MutationFunction<
  UpdatePostMutation,
  UpdatePostMutationVariables
>

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      updatePostId: // value for 'updatePostId'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *      category: // value for 'category'
 *      isPrivate: // value for 'isPrivate'
 *      bgImage: // value for 'bgImage'
 *   },
 * });
 */
export function useUpdatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument,
    options
  )
}
export type UpdatePostMutationHookResult = ReturnType<
  typeof useUpdatePostMutation
>
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<
  UpdatePostMutation,
  UpdatePostMutationVariables
>
export const GetUserGroupRelationsDocument = gql`
  query GetUserGroupRelations($userId: String, $groupId: String) {
    GetUserGroupRelations(userId: $userId, groupId: $groupId) {
      id
      userId
      groupId
      createdAt
      updatedAt
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
      group {
        id
        name
        description
        image
        adminUserId
        productId
        createdAt
        updatedAt
      }
    }
  }
`

/**
 * __useGetUserGroupRelationsQuery__
 *
 * To run a query within a React component, call `useGetUserGroupRelationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserGroupRelationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserGroupRelationsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGetUserGroupRelationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUserGroupRelationsQuery,
    GetUserGroupRelationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetUserGroupRelationsQuery,
    GetUserGroupRelationsQueryVariables
  >(GetUserGroupRelationsDocument, options)
}
export function useGetUserGroupRelationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserGroupRelationsQuery,
    GetUserGroupRelationsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetUserGroupRelationsQuery,
    GetUserGroupRelationsQueryVariables
  >(GetUserGroupRelationsDocument, options)
}
export type GetUserGroupRelationsQueryHookResult = ReturnType<
  typeof useGetUserGroupRelationsQuery
>
export type GetUserGroupRelationsLazyQueryHookResult = ReturnType<
  typeof useGetUserGroupRelationsLazyQuery
>
export type GetUserGroupRelationsQueryResult = Apollo.QueryResult<
  GetUserGroupRelationsQuery,
  GetUserGroupRelationsQueryVariables
>
export const CreateUserGroupRelationDocument = gql`
  mutation CreateUserGroupRelation($userId: String!, $groupId: String!) {
    createUserGroupRelation(userId: $userId, groupId: $groupId) {
      id
      userId
      groupId
      createdAt
      updatedAt
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
      group {
        id
        name
        description
        image
        adminUserId
        productId
        createdAt
        updatedAt
      }
    }
  }
`
export type CreateUserGroupRelationMutationFn = Apollo.MutationFunction<
  CreateUserGroupRelationMutation,
  CreateUserGroupRelationMutationVariables
>

/**
 * __useCreateUserGroupRelationMutation__
 *
 * To run a mutation, you first call `useCreateUserGroupRelationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserGroupRelationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserGroupRelationMutation, { data, loading, error }] = useCreateUserGroupRelationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useCreateUserGroupRelationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserGroupRelationMutation,
    CreateUserGroupRelationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateUserGroupRelationMutation,
    CreateUserGroupRelationMutationVariables
  >(CreateUserGroupRelationDocument, options)
}
export type CreateUserGroupRelationMutationHookResult = ReturnType<
  typeof useCreateUserGroupRelationMutation
>
export type CreateUserGroupRelationMutationResult =
  Apollo.MutationResult<CreateUserGroupRelationMutation>
export type CreateUserGroupRelationMutationOptions = Apollo.BaseMutationOptions<
  CreateUserGroupRelationMutation,
  CreateUserGroupRelationMutationVariables
>
export const DeleteUserGroupRelationDocument = gql`
  mutation DeleteUserGroupRelation($userId: String!, $groupId: String!) {
    DeleteUserGroupRelation(userId: $userId, groupId: $groupId) {
      id
      userId
      groupId
      createdAt
      updatedAt
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
      group {
        id
        name
        description
        image
        adminUserId
        productId
        createdAt
        updatedAt
      }
    }
  }
`
export type DeleteUserGroupRelationMutationFn = Apollo.MutationFunction<
  DeleteUserGroupRelationMutation,
  DeleteUserGroupRelationMutationVariables
>

/**
 * __useDeleteUserGroupRelationMutation__
 *
 * To run a mutation, you first call `useDeleteUserGroupRelationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserGroupRelationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserGroupRelationMutation, { data, loading, error }] = useDeleteUserGroupRelationMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useDeleteUserGroupRelationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserGroupRelationMutation,
    DeleteUserGroupRelationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteUserGroupRelationMutation,
    DeleteUserGroupRelationMutationVariables
  >(DeleteUserGroupRelationDocument, options)
}
export type DeleteUserGroupRelationMutationHookResult = ReturnType<
  typeof useDeleteUserGroupRelationMutation
>
export type DeleteUserGroupRelationMutationResult =
  Apollo.MutationResult<DeleteUserGroupRelationMutation>
export type DeleteUserGroupRelationMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserGroupRelationMutation,
  DeleteUserGroupRelationMutationVariables
>
export const GetCurrentUserDocument = gql`
  query GetCurrentUser($accessToken: String!) {
    getCurrentUser(accessToken: $accessToken) {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
  }
`

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  )
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  )
}
export type GetCurrentUserQueryHookResult = ReturnType<
  typeof useGetCurrentUserQuery
>
export type GetCurrentUserLazyQueryHookResult = ReturnType<
  typeof useGetCurrentUserLazyQuery
>
export type GetCurrentUserQueryResult = Apollo.QueryResult<
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables
>
export const GetUserDocument = gql`
  query GetUser($getUserId: String!) {
    getUser(id: $getUserId) {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
  }
`

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      getUserId: // value for 'getUserId'
 *   },
 * });
 */
export function useGetUserQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  )
}
export function useGetUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(
    GetUserDocument,
    options
  )
}
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>
export type GetUserQueryResult = Apollo.QueryResult<
  GetUserQuery,
  GetUserQueryVariables
>
export const CreateUserMutationDocument = gql`
  mutation CreateUserMutation(
    $name: String!
    $email: String!
    $description: String
    $image: String
  ) {
    createUser(
      name: $name
      email: $email
      description: $description
      image: $image
    ) {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
  }
`
export type CreateUserMutationMutationFn = Apollo.MutationFunction<
  CreateUserMutationMutation,
  CreateUserMutationMutationVariables
>

/**
 * __useCreateUserMutationMutation__
 *
 * To run a mutation, you first call `useCreateUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutationMutation, { data, loading, error }] = useCreateUserMutationMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateUserMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateUserMutationMutation,
    CreateUserMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateUserMutationMutation,
    CreateUserMutationMutationVariables
  >(CreateUserMutationDocument, options)
}
export type CreateUserMutationMutationHookResult = ReturnType<
  typeof useCreateUserMutationMutation
>
export type CreateUserMutationMutationResult =
  Apollo.MutationResult<CreateUserMutationMutation>
export type CreateUserMutationMutationOptions = Apollo.BaseMutationOptions<
  CreateUserMutationMutation,
  CreateUserMutationMutationVariables
>
export const DeleteUserMutationDocument = gql`
  mutation DeleteUserMutation($deleteUserId: String!) {
    deleteUser(id: $deleteUserId) {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
  }
`
export type DeleteUserMutationMutationFn = Apollo.MutationFunction<
  DeleteUserMutationMutation,
  DeleteUserMutationMutationVariables
>

/**
 * __useDeleteUserMutationMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutationMutation, { data, loading, error }] = useDeleteUserMutationMutation({
 *   variables: {
 *      deleteUserId: // value for 'deleteUserId'
 *   },
 * });
 */
export function useDeleteUserMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteUserMutationMutation,
    DeleteUserMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteUserMutationMutation,
    DeleteUserMutationMutationVariables
  >(DeleteUserMutationDocument, options)
}
export type DeleteUserMutationMutationHookResult = ReturnType<
  typeof useDeleteUserMutationMutation
>
export type DeleteUserMutationMutationResult =
  Apollo.MutationResult<DeleteUserMutationMutation>
export type DeleteUserMutationMutationOptions = Apollo.BaseMutationOptions<
  DeleteUserMutationMutation,
  DeleteUserMutationMutationVariables
>
export const UpdateUserMutationDocument = gql`
  mutation UpdateUserMutation(
    $updateUserId: String!
    $name: String
    $email: String
    $description: String
    $image: String
  ) {
    updateUser(
      id: $updateUserId
      name: $name
      email: $email
      description: $description
      image: $image
    ) {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
  }
`
export type UpdateUserMutationMutationFn = Apollo.MutationFunction<
  UpdateUserMutationMutation,
  UpdateUserMutationMutationVariables
>

/**
 * __useUpdateUserMutationMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutationMutation, { data, loading, error }] = useUpdateUserMutationMutation({
 *   variables: {
 *      updateUserId: // value for 'updateUserId'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdateUserMutationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutationMutation,
    UpdateUserMutationMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateUserMutationMutation,
    UpdateUserMutationMutationVariables
  >(UpdateUserMutationDocument, options)
}
export type UpdateUserMutationMutationHookResult = ReturnType<
  typeof useUpdateUserMutationMutation
>
export type UpdateUserMutationMutationResult =
  Apollo.MutationResult<UpdateUserMutationMutation>
export type UpdateUserMutationMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutationMutation,
  UpdateUserMutationMutationVariables
>
