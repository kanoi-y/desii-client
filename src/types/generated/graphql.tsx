import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: Date;
};

export type Group = {
  __typename?: 'Group';
  adminUserId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  productId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Mutation = {
  __typename?: 'Mutation';
  DeleteUserGroupRelation: UserGroupRelation;
  createGroup: Group;
  createUser: User;
  createUserGroupRelation: UserGroupRelation;
  deleteGroup: Group;
  deleteUser: User;
  updateGroup: Group;
  updateUser: User;
};


export type MutationDeleteUserGroupRelationArgs = {
  groupId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  description?: InputMaybe<Scalars['String']>;
  image: Scalars['String'];
  name: Scalars['String'];
  productId: Scalars['String'];
};


export type MutationCreateUserArgs = {
  description?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationCreateUserGroupRelationArgs = {
  groupId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationDeleteGroupArgs = {
  id: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};


export type MutationUpdateGroupArgs = {
  adminUserId?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  GetUserGroupRelations: Array<UserGroupRelation>;
  getCurrentUser?: Maybe<User>;
  getGroup?: Maybe<Group>;
  getUser?: Maybe<User>;
  groups: Array<Group>;
  users: Array<Maybe<User>>;
};


export type QueryGetUserGroupRelationsArgs = {
  groupId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryGetCurrentUserArgs = {
  accessToken: Scalars['String'];
};


export type QueryGetGroupArgs = {
  id: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  accessToken?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UserGroupRelation = {
  __typename?: 'UserGroupRelation';
  createdAt: Scalars['DateTime'];
  groupId: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['String'];
};

export type GroupsQueryVariables = Exact<{ [key: string]: never; }>;


export type GroupsQuery = { __typename?: 'Query', groups: Array<{ __typename?: 'Group', id: string, name: string, description?: string | null | undefined, image: string, adminUserId: string, productId: string, createdAt: Date, updatedAt: Date }> };

export type GetGroupQueryVariables = Exact<{
  getGroupId: Scalars['String'];
}>;


export type GetGroupQuery = { __typename?: 'Query', getGroup?: { __typename?: 'Group', id: string, name: string, description?: string | null | undefined, image: string, adminUserId: string, productId: string, createdAt: Date, updatedAt: Date } | null | undefined };

export type CreateGroupMutationVariables = Exact<{
  name: Scalars['String'];
  image: Scalars['String'];
  productId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string, name: string, description?: string | null | undefined, image: string, adminUserId: string, productId: string, createdAt: Date, updatedAt: Date } };

export type DeleteGroupMutationVariables = Exact<{
  deleteGroupId: Scalars['String'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: { __typename?: 'Group', id: string, name: string, description?: string | null | undefined, image: string, adminUserId: string, productId: string, createdAt: Date, updatedAt: Date } };

export type UpdateGroupMutationVariables = Exact<{
  updateGroupId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  adminUserId?: InputMaybe<Scalars['String']>;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, name: string, description?: string | null | undefined, image: string, adminUserId: string, productId: string, createdAt: Date, updatedAt: Date } };

export type GetUserGroupRelationsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
}>;


export type GetUserGroupRelationsQuery = { __typename?: 'Query', GetUserGroupRelations: Array<{ __typename?: 'UserGroupRelation', id: string, userId: string, groupId: string, createdAt: Date, updatedAt: Date }> };

export type CreateUserGroupRelationMutationVariables = Exact<{
  userId: Scalars['String'];
  groupId: Scalars['String'];
}>;


export type CreateUserGroupRelationMutation = { __typename?: 'Mutation', createUserGroupRelation: { __typename?: 'UserGroupRelation', id: string, userId: string, groupId: string, createdAt: Date, updatedAt: Date } };

export type DeleteUserGroupRelationMutationVariables = Exact<{
  userId: Scalars['String'];
  groupId: Scalars['String'];
}>;


export type DeleteUserGroupRelationMutation = { __typename?: 'Mutation', DeleteUserGroupRelation: { __typename?: 'UserGroupRelation', id: string, userId: string, groupId: string, createdAt: Date, updatedAt: Date } };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string, name: string, email: string, description?: string | null | undefined, image?: string | null | undefined, createdAt: Date, updatedAt: Date } | null | undefined> };

export type GetCurrentUserQueryVariables = Exact<{
  accessToken: Scalars['String'];
}>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, name: string, email: string, description?: string | null | undefined, image?: string | null | undefined, createdAt: Date, updatedAt: Date } | null | undefined };

export type GetUserQueryVariables = Exact<{
  getUserId: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, name: string, email: string, description?: string | null | undefined, image?: string | null | undefined, createdAt: Date, updatedAt: Date } | null | undefined };

export type CreateUserMutationMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
}>;


export type CreateUserMutationMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, email: string, description?: string | null | undefined, image?: string | null | undefined, createdAt: Date, updatedAt: Date } };

export type DeleteUserMutationMutationVariables = Exact<{
  deleteUserId: Scalars['String'];
}>;


export type DeleteUserMutationMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: string, name: string, email: string, description?: string | null | undefined, image?: string | null | undefined, createdAt: Date, updatedAt: Date } };

export type UpdateUserMutationMutationVariables = Exact<{
  updateUserId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutationMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, email: string, description?: string | null | undefined, image?: string | null | undefined, createdAt: Date, updatedAt: Date } };


export const GroupsDocument = gql`
    query Groups {
  groups {
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
    `;

/**
 * __useGroupsQuery__
 *
 * To run a query within a React component, call `useGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, options);
      }
export function useGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupsQuery, GroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupsQuery, GroupsQueryVariables>(GroupsDocument, options);
        }
export type GroupsQueryHookResult = ReturnType<typeof useGroupsQuery>;
export type GroupsLazyQueryHookResult = ReturnType<typeof useGroupsLazyQuery>;
export type GroupsQueryResult = Apollo.QueryResult<GroupsQuery, GroupsQueryVariables>;
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
    `;

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
export function useGetGroupQuery(baseOptions: Apollo.QueryHookOptions<GetGroupQuery, GetGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupQuery, GetGroupQueryVariables>(GetGroupDocument, options);
      }
export function useGetGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupQuery, GetGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupQuery, GetGroupQueryVariables>(GetGroupDocument, options);
        }
export type GetGroupQueryHookResult = ReturnType<typeof useGetGroupQuery>;
export type GetGroupLazyQueryHookResult = ReturnType<typeof useGetGroupLazyQuery>;
export type GetGroupQueryResult = Apollo.QueryResult<GetGroupQuery, GetGroupQueryVariables>;
export const CreateGroupDocument = gql`
    mutation CreateGroup($name: String!, $image: String!, $productId: String!, $description: String) {
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
    `;
export type CreateGroupMutationFn = Apollo.MutationFunction<CreateGroupMutation, CreateGroupMutationVariables>;

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
export function useCreateGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateGroupMutation, CreateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(CreateGroupDocument, options);
      }
export type CreateGroupMutationHookResult = ReturnType<typeof useCreateGroupMutation>;
export type CreateGroupMutationResult = Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<CreateGroupMutation, CreateGroupMutationVariables>;
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
    `;
export type DeleteGroupMutationFn = Apollo.MutationFunction<DeleteGroupMutation, DeleteGroupMutationVariables>;

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
export function useDeleteGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGroupMutation, DeleteGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(DeleteGroupDocument, options);
      }
export type DeleteGroupMutationHookResult = ReturnType<typeof useDeleteGroupMutation>;
export type DeleteGroupMutationResult = Apollo.MutationResult<DeleteGroupMutation>;
export type DeleteGroupMutationOptions = Apollo.BaseMutationOptions<DeleteGroupMutation, DeleteGroupMutationVariables>;
export const UpdateGroupDocument = gql`
    mutation UpdateGroup($updateGroupId: String!, $name: String, $description: String, $image: String, $adminUserId: String) {
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
    `;
export type UpdateGroupMutationFn = Apollo.MutationFunction<UpdateGroupMutation, UpdateGroupMutationVariables>;

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
export function useUpdateGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGroupMutation, UpdateGroupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(UpdateGroupDocument, options);
      }
export type UpdateGroupMutationHookResult = ReturnType<typeof useUpdateGroupMutation>;
export type UpdateGroupMutationResult = Apollo.MutationResult<UpdateGroupMutation>;
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<UpdateGroupMutation, UpdateGroupMutationVariables>;
export const GetUserGroupRelationsDocument = gql`
    query GetUserGroupRelations($userId: String, $groupId: String) {
  GetUserGroupRelations(userId: $userId, groupId: $groupId) {
    id
    userId
    groupId
    createdAt
    updatedAt
  }
}
    `;

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
export function useGetUserGroupRelationsQuery(baseOptions?: Apollo.QueryHookOptions<GetUserGroupRelationsQuery, GetUserGroupRelationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserGroupRelationsQuery, GetUserGroupRelationsQueryVariables>(GetUserGroupRelationsDocument, options);
      }
export function useGetUserGroupRelationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserGroupRelationsQuery, GetUserGroupRelationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserGroupRelationsQuery, GetUserGroupRelationsQueryVariables>(GetUserGroupRelationsDocument, options);
        }
export type GetUserGroupRelationsQueryHookResult = ReturnType<typeof useGetUserGroupRelationsQuery>;
export type GetUserGroupRelationsLazyQueryHookResult = ReturnType<typeof useGetUserGroupRelationsLazyQuery>;
export type GetUserGroupRelationsQueryResult = Apollo.QueryResult<GetUserGroupRelationsQuery, GetUserGroupRelationsQueryVariables>;
export const CreateUserGroupRelationDocument = gql`
    mutation CreateUserGroupRelation($userId: String!, $groupId: String!) {
  createUserGroupRelation(userId: $userId, groupId: $groupId) {
    id
    userId
    groupId
    createdAt
    updatedAt
  }
}
    `;
export type CreateUserGroupRelationMutationFn = Apollo.MutationFunction<CreateUserGroupRelationMutation, CreateUserGroupRelationMutationVariables>;

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
export function useCreateUserGroupRelationMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserGroupRelationMutation, CreateUserGroupRelationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserGroupRelationMutation, CreateUserGroupRelationMutationVariables>(CreateUserGroupRelationDocument, options);
      }
export type CreateUserGroupRelationMutationHookResult = ReturnType<typeof useCreateUserGroupRelationMutation>;
export type CreateUserGroupRelationMutationResult = Apollo.MutationResult<CreateUserGroupRelationMutation>;
export type CreateUserGroupRelationMutationOptions = Apollo.BaseMutationOptions<CreateUserGroupRelationMutation, CreateUserGroupRelationMutationVariables>;
export const DeleteUserGroupRelationDocument = gql`
    mutation DeleteUserGroupRelation($userId: String!, $groupId: String!) {
  DeleteUserGroupRelation(userId: $userId, groupId: $groupId) {
    id
    userId
    groupId
    createdAt
    updatedAt
  }
}
    `;
export type DeleteUserGroupRelationMutationFn = Apollo.MutationFunction<DeleteUserGroupRelationMutation, DeleteUserGroupRelationMutationVariables>;

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
export function useDeleteUserGroupRelationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserGroupRelationMutation, DeleteUserGroupRelationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserGroupRelationMutation, DeleteUserGroupRelationMutationVariables>(DeleteUserGroupRelationDocument, options);
      }
export type DeleteUserGroupRelationMutationHookResult = ReturnType<typeof useDeleteUserGroupRelationMutation>;
export type DeleteUserGroupRelationMutationResult = Apollo.MutationResult<DeleteUserGroupRelationMutation>;
export type DeleteUserGroupRelationMutationOptions = Apollo.BaseMutationOptions<DeleteUserGroupRelationMutation, DeleteUserGroupRelationMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
    name
    email
    description
    image
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;
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
    `;

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
export function useGetCurrentUserQuery(baseOptions: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
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
    `;

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
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const CreateUserMutationDocument = gql`
    mutation CreateUserMutation($name: String!, $email: String!, $description: String, $image: String) {
  createUser(name: $name, email: $email, description: $description, image: $image) {
    id
    name
    email
    description
    image
    createdAt
    updatedAt
  }
}
    `;
export type CreateUserMutationMutationFn = Apollo.MutationFunction<CreateUserMutationMutation, CreateUserMutationMutationVariables>;

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
export function useCreateUserMutationMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutationMutation, CreateUserMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutationMutation, CreateUserMutationMutationVariables>(CreateUserMutationDocument, options);
      }
export type CreateUserMutationMutationHookResult = ReturnType<typeof useCreateUserMutationMutation>;
export type CreateUserMutationMutationResult = Apollo.MutationResult<CreateUserMutationMutation>;
export type CreateUserMutationMutationOptions = Apollo.BaseMutationOptions<CreateUserMutationMutation, CreateUserMutationMutationVariables>;
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
    `;
export type DeleteUserMutationMutationFn = Apollo.MutationFunction<DeleteUserMutationMutation, DeleteUserMutationMutationVariables>;

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
export function useDeleteUserMutationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutationMutation, DeleteUserMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutationMutation, DeleteUserMutationMutationVariables>(DeleteUserMutationDocument, options);
      }
export type DeleteUserMutationMutationHookResult = ReturnType<typeof useDeleteUserMutationMutation>;
export type DeleteUserMutationMutationResult = Apollo.MutationResult<DeleteUserMutationMutation>;
export type DeleteUserMutationMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutationMutation, DeleteUserMutationMutationVariables>;
export const UpdateUserMutationDocument = gql`
    mutation UpdateUserMutation($updateUserId: String!, $name: String, $email: String, $description: String, $image: String) {
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
    `;
export type UpdateUserMutationMutationFn = Apollo.MutationFunction<UpdateUserMutationMutation, UpdateUserMutationMutationVariables>;

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
export function useUpdateUserMutationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutationMutation, UpdateUserMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutationMutation, UpdateUserMutationMutationVariables>(UpdateUserMutationDocument, options);
      }
export type UpdateUserMutationMutationHookResult = ReturnType<typeof useUpdateUserMutationMutation>;
export type UpdateUserMutationMutationResult = Apollo.MutationResult<UpdateUserMutationMutation>;
export type UpdateUserMutationMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutationMutation, UpdateUserMutationMutationVariables>;