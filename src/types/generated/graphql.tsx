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

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser: User;
  updateUser: User;
};


export type MutationCreateUserArgs = {
  description?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String'];
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
  getCurrentUser?: Maybe<User>;
  getUser?: Maybe<User>;
  users: Array<Maybe<User>>;
};


export type QueryGetCurrentUserArgs = {
  accessToken: Scalars['String'];
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