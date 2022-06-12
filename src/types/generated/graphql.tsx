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

export type Favorite = {
  __typename?: 'Favorite';
  createdAt: Scalars['DateTime'];
  createdUser: User;
  createdUserId: Scalars['String'];
  id: Scalars['String'];
  post: Post;
  postId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export enum GetRoomType {
  All = 'ALL',
  OnlyGroup = 'ONLY_GROUP',
  OnlyOneOnOne = 'ONLY_ONE_ON_ONE'
}

export type Group = {
  __typename?: 'Group';
  adminUserId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image: Scalars['String'];
  name: Scalars['String'];
  productId: Scalars['String'];
  roomId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type MatchingPostInfoType = {
  __typename?: 'MatchingPostInfoType';
  count: Scalars['Int'];
  post: Post;
};

export type Message = {
  __typename?: 'Message';
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  room: Room;
  roomId: Scalars['String'];
  type: MessageType;
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export enum MessageType {
  Media = 'MEDIA',
  Post = 'POST',
  Text = 'TEXT'
}

export type Mutation = {
  __typename?: 'Mutation';
  CreateMessage: Message;
  CreateRoom: Room;
  DeleteFavorite: Favorite;
  DeleteMessage: Message;
  DeleteRoom: Room;
  DeleteTagPostRelation: TagPostRelation;
  DeleteTagPostRelations: Array<TagPostRelation>;
  DeleteUserGroupRelation: UserGroupRelation;
  UpdateNotification: Notification;
  UpdateReadManagement: ReadManagement;
  createFavorite: Favorite;
  createGroup: Group;
  createPost: Post;
  createTag: Tag;
  createTagPostRelation: TagPostRelation;
  createTagPostRelations: Array<TagPostRelation>;
  createUser: User;
  createUserGroupRelation: UserGroupRelation;
  deleteGroup: Group;
  deletePost: Post;
  deleteUser: User;
  updateGroup: Group;
  updatePost: Post;
  updateUser: User;
};


export type MutationCreateMessageArgs = {
  body: Scalars['String'];
  messageType: MessageType;
  roomId: Scalars['String'];
};


export type MutationCreateRoomArgs = {
  memberId: Scalars['String'];
};


export type MutationDeleteFavoriteArgs = {
  postId: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['String'];
};


export type MutationDeleteRoomArgs = {
  id: Scalars['String'];
};


export type MutationDeleteTagPostRelationArgs = {
  postId: Scalars['String'];
  tagId: Scalars['String'];
};


export type MutationDeleteTagPostRelationsArgs = {
  tagPostTypes: Array<TagPostInputType>;
};


export type MutationDeleteUserGroupRelationArgs = {
  groupId: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationUpdateNotificationArgs = {
  id: Scalars['String'];
  isChecked: Scalars['Boolean'];
};


export type MutationUpdateReadManagementArgs = {
  messageId: Scalars['String'];
  targetUserId: Scalars['String'];
};


export type MutationCreateFavoriteArgs = {
  postId: Scalars['String'];
};


export type MutationCreateGroupArgs = {
  description?: InputMaybe<Scalars['String']>;
  image: Scalars['String'];
  name: Scalars['String'];
  productId: Scalars['String'];
};


export type MutationCreatePostArgs = {
  bgImage?: InputMaybe<Scalars['String']>;
  category: PostCategory;
  content: Scalars['String'];
  groupId?: InputMaybe<Scalars['String']>;
  isPrivate: Scalars['Boolean'];
  title: Scalars['String'];
};


export type MutationCreateTagArgs = {
  name: Scalars['String'];
};


export type MutationCreateTagPostRelationArgs = {
  postId: Scalars['String'];
  tagId: Scalars['String'];
};


export type MutationCreateTagPostRelationsArgs = {
  postId: Scalars['String'];
  tagIds: Array<Scalars['String']>;
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


export type MutationDeletePostArgs = {
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


export type MutationUpdatePostArgs = {
  bgImage?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<PostCategory>;
  content?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['DateTime'];
  createdUserId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isChecked: Scalars['Boolean'];
  message: Scalars['String'];
  targetUserId: Scalars['String'];
  type: NotificationType;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export enum NotificationType {
  FetchReaction = 'FETCH_REACTION',
  MatchPost = 'MATCH_POST'
}

export type Post = {
  __typename?: 'Post';
  bgImage?: Maybe<Scalars['String']>;
  category: PostCategory;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  createdUserId: Scalars['String'];
  groupId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export enum PostCategory {
  GiveMe = 'GIVE_ME',
  GiveYou = 'GIVE_YOU'
}

export type Query = {
  __typename?: 'Query';
  GetFavorites: Array<Favorite>;
  GetMatchingPosts: Array<MatchingPostInfoType>;
  GetMessages: Array<Message>;
  GetNotifications: Array<Notification>;
  GetOneOnOneRoom?: Maybe<Room>;
  GetPosts: Array<Post>;
  GetReadManagement?: Maybe<ReadManagement>;
  GetReadManagements: Array<ReadManagement>;
  GetRoom?: Maybe<Room>;
  GetRoomsByLoginUserId: Array<Room>;
  GetTagByName?: Maybe<Tag>;
  GetTagPostRelations: Array<TagPostRelation>;
  GetUserGroupRelations: Array<UserGroupRelation>;
  getAllTags: Array<Tag>;
  getCurrentUser?: Maybe<User>;
  getGroup?: Maybe<Group>;
  getGroupByRoomId?: Maybe<Group>;
  getMessage?: Maybe<Message>;
  getPost?: Maybe<Post>;
  getRoomMembers: Array<RoomMember>;
  getTargetRoomMember?: Maybe<RoomMember>;
  getUser?: Maybe<User>;
};


export type QueryGetFavoritesArgs = {
  createdUserId?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<OrderByType>;
};


export type QueryGetMatchingPostsArgs = {
  postId: Scalars['String'];
};


export type QueryGetMessagesArgs = {
  roomId: Scalars['String'];
  sort?: InputMaybe<OrderByType>;
};


export type QueryGetNotificationsArgs = {
  sort?: InputMaybe<OrderByType>;
  targetUserId: Scalars['String'];
};


export type QueryGetOneOnOneRoomArgs = {
  memberId: Scalars['String'];
};


export type QueryGetPostsArgs = {
  groupId?: InputMaybe<Scalars['String']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  sort?: InputMaybe<PostOrderByType>;
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryGetReadManagementArgs = {
  messageId: Scalars['String'];
  targetUserId: Scalars['String'];
};


export type QueryGetReadManagementsArgs = {
  messageId?: InputMaybe<Scalars['String']>;
  targetUserId?: InputMaybe<Scalars['String']>;
};


export type QueryGetRoomArgs = {
  id: Scalars['String'];
};


export type QueryGetRoomsByLoginUserIdArgs = {
  getRoomType: GetRoomType;
};


export type QueryGetTagByNameArgs = {
  name: Scalars['String'];
};


export type QueryGetTagPostRelationsArgs = {
  postId?: InputMaybe<Scalars['String']>;
  tagId?: InputMaybe<Scalars['String']>;
};


export type QueryGetUserGroupRelationsArgs = {
  groupId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryGetAllTagsArgs = {
  searchText?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<OrderByType>;
};


export type QueryGetCurrentUserArgs = {
  accessToken: Scalars['String'];
};


export type QueryGetGroupArgs = {
  id: Scalars['String'];
};


export type QueryGetGroupByRoomIdArgs = {
  roomId: Scalars['String'];
};


export type QueryGetMessageArgs = {
  id: Scalars['String'];
};


export type QueryGetPostArgs = {
  id: Scalars['String'];
};


export type QueryGetRoomMembersArgs = {
  roomId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};


export type QueryGetTargetRoomMemberArgs = {
  roomId: Scalars['String'];
  userId: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};

export type ReadManagement = {
  __typename?: 'ReadManagement';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  isRead: Scalars['Boolean'];
  messageId: Scalars['String'];
  targetUserId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  latestMessageId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type RoomMember = {
  __typename?: 'RoomMember';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  room: Room;
  roomId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  name: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type TagPostInputType = {
  postId: Scalars['String'];
  tagId: Scalars['String'];
};

export type TagPostRelation = {
  __typename?: 'TagPostRelation';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  post: Post;
  postId: Scalars['String'];
  tag: Tag;
  tagId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
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
  group: Group;
  groupId: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export enum OrderByType {
  Asc = 'asc',
  Desc = 'desc'
}

export enum PostOrderByType {
  Asc = 'asc',
  Desc = 'desc',
  Favorite = 'favorite'
}

export type GetFavoritesQueryVariables = Exact<{
  createdUserId?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<OrderByType>;
}>;


export type GetFavoritesQuery = { __typename?: 'Query', GetFavorites: Array<{ __typename?: 'Favorite', id: string, createdUserId: string, postId: string, createdAt: Date, updatedAt: Date, createdUser: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, accessToken?: string | null, createdAt: Date, updatedAt: Date }, post: { __typename?: 'Post', id: string, title: string, content: string, category: PostCategory, createdUserId: string, isPrivate: boolean, groupId?: string | null, bgImage?: string | null, createdAt: Date, updatedAt: Date } }> };

export type CreateFavoriteMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type CreateFavoriteMutation = { __typename?: 'Mutation', createFavorite: { __typename?: 'Favorite', id: string, createdUserId: string, postId: string, createdAt: Date, updatedAt: Date, createdUser: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, accessToken?: string | null, createdAt: Date, updatedAt: Date }, post: { __typename?: 'Post', id: string, title: string, content: string, category: PostCategory, createdUserId: string, isPrivate: boolean, groupId?: string | null, bgImage?: string | null, createdAt: Date, updatedAt: Date } } };

export type DeleteFavoriteMutationVariables = Exact<{
  postId: Scalars['String'];
}>;


export type DeleteFavoriteMutation = { __typename?: 'Mutation', DeleteFavorite: { __typename?: 'Favorite', id: string, createdUserId: string, postId: string, createdAt: Date, updatedAt: Date, createdUser: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, accessToken?: string | null, createdAt: Date, updatedAt: Date }, post: { __typename?: 'Post', id: string, title: string, content: string, category: PostCategory, createdUserId: string, isPrivate: boolean, groupId?: string | null, bgImage?: string | null, createdAt: Date, updatedAt: Date } } };

export type GetGroupQueryVariables = Exact<{
  getGroupId: Scalars['String'];
}>;


export type GetGroupQuery = { __typename?: 'Query', getGroup?: { __typename?: 'Group', id: string, name: string, description?: string | null, image: string, adminUserId: string, productId: string, roomId: string, createdAt: Date, updatedAt: Date } | null };

export type GetGroupByRoomIdQueryVariables = Exact<{
  roomId: Scalars['String'];
}>;


export type GetGroupByRoomIdQuery = { __typename?: 'Query', getGroupByRoomId?: { __typename?: 'Group', id: string, name: string, description?: string | null, image: string, adminUserId: string, productId: string, roomId: string, createdAt: Date, updatedAt: Date } | null };

export type CreateGroupMutationVariables = Exact<{
  name: Scalars['String'];
  image: Scalars['String'];
  productId: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
}>;


export type CreateGroupMutation = { __typename?: 'Mutation', createGroup: { __typename?: 'Group', id: string, name: string, description?: string | null, image: string, adminUserId: string, productId: string, roomId: string, createdAt: Date, updatedAt: Date } };

export type DeleteGroupMutationVariables = Exact<{
  deleteGroupId: Scalars['String'];
}>;


export type DeleteGroupMutation = { __typename?: 'Mutation', deleteGroup: { __typename?: 'Group', id: string, name: string, description?: string | null, image: string, adminUserId: string, productId: string, roomId: string, createdAt: Date, updatedAt: Date } };

export type UpdateGroupMutationVariables = Exact<{
  updateGroupId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  adminUserId?: InputMaybe<Scalars['String']>;
}>;


export type UpdateGroupMutation = { __typename?: 'Mutation', updateGroup: { __typename?: 'Group', id: string, name: string, description?: string | null, image: string, adminUserId: string, productId: string, roomId: string, createdAt: Date, updatedAt: Date } };

export type GetMessageQueryVariables = Exact<{
  getMessageId: Scalars['String'];
}>;


export type GetMessageQuery = { __typename?: 'Query', getMessage?: { __typename?: 'Message', id: string, type: MessageType, roomId: string, userId: string, body: string, createdAt: Date, updatedAt: Date, user: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, createdAt: Date, updatedAt: Date }, room: { __typename?: 'Room', id: string, latestMessageId?: string | null, createdAt: Date, updatedAt: Date } } | null };

export type GetMessagesQueryVariables = Exact<{
  roomId: Scalars['String'];
  sort?: InputMaybe<OrderByType>;
}>;


export type GetMessagesQuery = { __typename?: 'Query', GetMessages: Array<{ __typename?: 'Message', id: string, type: MessageType, roomId: string, userId: string, body: string, createdAt: Date, updatedAt: Date, user: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, createdAt: Date, updatedAt: Date }, room: { __typename?: 'Room', id: string, latestMessageId?: string | null, createdAt: Date, updatedAt: Date } }> };

export type CreateMessageMutationVariables = Exact<{
  messageType: MessageType;
  roomId: Scalars['String'];
  body: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', CreateMessage: { __typename?: 'Message', id: string, type: MessageType, roomId: string, userId: string, body: string, createdAt: Date, updatedAt: Date, user: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, createdAt: Date, updatedAt: Date }, room: { __typename?: 'Room', id: string, latestMessageId?: string | null, createdAt: Date, updatedAt: Date } } };

export type DeleteMessageMutationVariables = Exact<{
  deleteMessageId: Scalars['String'];
}>;


export type DeleteMessageMutation = { __typename?: 'Mutation', DeleteMessage: { __typename?: 'Message', id: string, type: MessageType, roomId: string, userId: string, body: string, createdAt: Date, updatedAt: Date, user: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, createdAt: Date, updatedAt: Date }, room: { __typename?: 'Room', id: string, latestMessageId?: string | null, createdAt: Date, updatedAt: Date } } };

export type GetNotificationsQueryVariables = Exact<{
  targetUserId: Scalars['String'];
  sort?: InputMaybe<OrderByType>;
}>;


export type GetNotificationsQuery = { __typename?: 'Query', GetNotifications: Array<{ __typename?: 'Notification', id: string, type: NotificationType, createdUserId?: string | null, targetUserId: string, message: string, url: string, isChecked: boolean, createdAt: Date, updatedAt: Date }> };

export type UpdateNotificationMutationVariables = Exact<{
  updateNotificationId: Scalars['String'];
  isChecked: Scalars['Boolean'];
}>;


export type UpdateNotificationMutation = { __typename?: 'Mutation', UpdateNotification: { __typename?: 'Notification', id: string, type: NotificationType, createdUserId?: string | null, targetUserId: string, message: string, url: string, isChecked: boolean, createdAt: Date, updatedAt: Date } };

export type GetPostQueryVariables = Exact<{
  getPostId: Scalars['String'];
}>;


export type GetPostQuery = { __typename?: 'Query', getPost?: { __typename?: 'Post', id: string, title: string, content: string, category: PostCategory, createdUserId: string, isPrivate: boolean, groupId?: string | null, bgImage?: string | null, createdAt: Date, updatedAt: Date } | null };

export type GetPostsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  sort?: InputMaybe<PostOrderByType>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', GetPosts: Array<{ __typename?: 'Post', id: string, title: string, content: string, category: PostCategory, createdUserId: string, isPrivate: boolean, groupId?: string | null, bgImage?: string | null, createdAt: Date, updatedAt: Date }> };

export type GetMatchingPostsQueryVariables = Exact<{
  postId: Scalars['String'];
}>;


export type GetMatchingPostsQuery = { __typename?: 'Query', GetMatchingPosts: Array<{ __typename?: 'MatchingPostInfoType', count: number, post: { __typename?: 'Post', id: string, title: string, content: string, category: PostCategory, createdUserId: string, isPrivate: boolean, groupId?: string | null, bgImage?: string | null, createdAt: Date, updatedAt: Date } }> };

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  content: Scalars['String'];
  category: PostCategory;
  isPrivate: Scalars['Boolean'];
  groupId?: InputMaybe<Scalars['String']>;
  bgImage?: InputMaybe<Scalars['String']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: string, title: string, content: string, category: PostCategory, createdUserId: string, isPrivate: boolean, groupId?: string | null, bgImage?: string | null, createdAt: Date, updatedAt: Date } };

export type DeletePostMutationVariables = Exact<{
  deletePostId: Scalars['String'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'Post', id: string, title: string, content: string, category: PostCategory, createdUserId: string, isPrivate: boolean, groupId?: string | null, bgImage?: string | null, createdAt: Date, updatedAt: Date } };

export type UpdatePostMutationVariables = Exact<{
  updatePostId: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  content?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<PostCategory>;
  isPrivate?: InputMaybe<Scalars['Boolean']>;
  bgImage?: InputMaybe<Scalars['String']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: string, title: string, content: string, category: PostCategory, createdUserId: string, isPrivate: boolean, groupId?: string | null, bgImage?: string | null, createdAt: Date, updatedAt: Date } };

export type GetReadManagementQueryVariables = Exact<{
  targetUserId: Scalars['String'];
  messageId: Scalars['String'];
}>;


export type GetReadManagementQuery = { __typename?: 'Query', GetReadManagement?: { __typename?: 'ReadManagement', id: string, targetUserId: string, messageId: string, isRead: boolean, createdAt: Date, updatedAt: Date } | null };

export type GetReadManagementsQueryVariables = Exact<{
  targetUserId?: InputMaybe<Scalars['String']>;
  messageId?: InputMaybe<Scalars['String']>;
}>;


export type GetReadManagementsQuery = { __typename?: 'Query', GetReadManagements: Array<{ __typename?: 'ReadManagement', id: string, targetUserId: string, messageId: string, isRead: boolean, createdAt: Date, updatedAt: Date }> };

export type UpdateReadManagementMutationVariables = Exact<{
  targetUserId: Scalars['String'];
  messageId: Scalars['String'];
}>;


export type UpdateReadManagementMutation = { __typename?: 'Mutation', UpdateReadManagement: { __typename?: 'ReadManagement', id: string, targetUserId: string, messageId: string, isRead: boolean, createdAt: Date, updatedAt: Date } };

export type GetRoomQueryVariables = Exact<{
  getRoomId: Scalars['String'];
}>;


export type GetRoomQuery = { __typename?: 'Query', GetRoom?: { __typename?: 'Room', id: string, latestMessageId?: string | null, createdAt: Date, updatedAt: Date } | null };

export type GetOneOnOneRoomQueryVariables = Exact<{
  memberId: Scalars['String'];
}>;


export type GetOneOnOneRoomQuery = { __typename?: 'Query', GetOneOnOneRoom?: { __typename?: 'Room', id: string, latestMessageId?: string | null, createdAt: Date, updatedAt: Date } | null };

export type GetRoomsByLoginUserIdQueryVariables = Exact<{
  getRoomType: GetRoomType;
}>;


export type GetRoomsByLoginUserIdQuery = { __typename?: 'Query', GetRoomsByLoginUserId: Array<{ __typename?: 'Room', id: string, latestMessageId?: string | null, createdAt: Date, updatedAt: Date }> };

export type CreateRoomMutationVariables = Exact<{
  memberId: Scalars['String'];
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', CreateRoom: { __typename?: 'Room', id: string, latestMessageId?: string | null, createdAt: Date, updatedAt: Date } };

export type DeleteRoomMutationVariables = Exact<{
  deleteRoomId: Scalars['String'];
}>;


export type DeleteRoomMutation = { __typename?: 'Mutation', DeleteRoom: { __typename?: 'Room', id: string, latestMessageId?: string | null, createdAt: Date, updatedAt: Date } };

export type GetTargetRoomMemberQueryVariables = Exact<{
  roomId: Scalars['String'];
  userId: Scalars['String'];
}>;


export type GetTargetRoomMemberQuery = { __typename?: 'Query', getTargetRoomMember?: { __typename?: 'RoomMember', id: string, roomId: string, userId: string, createdAt: Date, updatedAt: Date, room: { __typename?: 'Room', id: string, latestMessageId?: string | null, createdAt: Date, updatedAt: Date }, user: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, createdAt: Date, updatedAt: Date } } | null };

export type GetRoomMembersQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  roomId?: InputMaybe<Scalars['String']>;
}>;


export type GetRoomMembersQuery = { __typename?: 'Query', getRoomMembers: Array<{ __typename?: 'RoomMember', id: string, roomId: string, userId: string, createdAt: Date, updatedAt: Date, room: { __typename?: 'Room', id: string, latestMessageId?: string | null, createdAt: Date, updatedAt: Date }, user: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, accessToken?: string | null, createdAt: Date, updatedAt: Date } }> };

export type GetAllTagsQueryVariables = Exact<{
  sort?: InputMaybe<OrderByType>;
  searchText?: InputMaybe<Scalars['String']>;
}>;


export type GetAllTagsQuery = { __typename?: 'Query', getAllTags: Array<{ __typename?: 'Tag', id: string, name: string, createdAt: Date, updatedAt: Date }> };

export type GetTagByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetTagByNameQuery = { __typename?: 'Query', GetTagByName?: { __typename?: 'Tag', id: string, name: string, createdAt: Date, updatedAt: Date } | null };

export type CreateTagMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'Tag', id: string, name: string, createdAt: Date, updatedAt: Date } };

export type GetTagPostRelationsQueryVariables = Exact<{
  tagId?: InputMaybe<Scalars['String']>;
  postId?: InputMaybe<Scalars['String']>;
}>;


export type GetTagPostRelationsQuery = { __typename?: 'Query', GetTagPostRelations: Array<{ __typename?: 'TagPostRelation', id: string, tagId: string, postId: string, createdAt: Date, updatedAt: Date, tag: { __typename?: 'Tag', id: string, name: string, createdAt: Date, updatedAt: Date }, post: { __typename?: 'Post', id: string, title: string, content: string, category: PostCategory, createdUserId: string, isPrivate: boolean, groupId?: string | null, bgImage?: string | null, createdAt: Date, updatedAt: Date } }> };

export type CreateTagPostRelationMutationVariables = Exact<{
  tagId: Scalars['String'];
  postId: Scalars['String'];
}>;


export type CreateTagPostRelationMutation = { __typename?: 'Mutation', createTagPostRelation: { __typename?: 'TagPostRelation', id: string, tagId: string, postId: string, createdAt: Date, updatedAt: Date, tag: { __typename?: 'Tag', id: string, name: string, createdAt: Date, updatedAt: Date }, post: { __typename?: 'Post', id: string, title: string, content: string, category: PostCategory, createdUserId: string, isPrivate: boolean, groupId?: string | null, bgImage?: string | null, createdAt: Date, updatedAt: Date } } };

export type CreateTagPostRelationsMutationVariables = Exact<{
  tagIds: Array<Scalars['String']> | Scalars['String'];
  postId: Scalars['String'];
}>;


export type CreateTagPostRelationsMutation = { __typename?: 'Mutation', createTagPostRelations: Array<{ __typename?: 'TagPostRelation', id: string, tagId: string, postId: string, createdAt: Date, updatedAt: Date, tag: { __typename?: 'Tag', id: string, name: string, createdAt: Date, updatedAt: Date }, post: { __typename?: 'Post', id: string, title: string, content: string, category: PostCategory, createdUserId: string, isPrivate: boolean, groupId?: string | null, bgImage?: string | null, createdAt: Date, updatedAt: Date } }> };

export type DeleteTagPostRelationMutationVariables = Exact<{
  tagId: Scalars['String'];
  postId: Scalars['String'];
}>;


export type DeleteTagPostRelationMutation = { __typename?: 'Mutation', DeleteTagPostRelation: { __typename?: 'TagPostRelation', id: string, tagId: string, postId: string, createdAt: Date, updatedAt: Date, tag: { __typename?: 'Tag', id: string, name: string, createdAt: Date, updatedAt: Date }, post: { __typename?: 'Post', id: string, title: string, content: string, category: PostCategory, createdUserId: string, isPrivate: boolean, groupId?: string | null, bgImage?: string | null, createdAt: Date, updatedAt: Date } } };

export type DeleteTagPostRelationsMutationVariables = Exact<{
  tagPostTypes: Array<TagPostInputType> | TagPostInputType;
}>;


export type DeleteTagPostRelationsMutation = { __typename?: 'Mutation', DeleteTagPostRelations: Array<{ __typename?: 'TagPostRelation', id: string, tagId: string, postId: string, createdAt: Date, updatedAt: Date, tag: { __typename?: 'Tag', id: string, name: string, createdAt: Date, updatedAt: Date }, post: { __typename?: 'Post', id: string, title: string, content: string, category: PostCategory, createdUserId: string, isPrivate: boolean, groupId?: string | null, bgImage?: string | null, createdAt: Date, updatedAt: Date } }> };

export type GetUserGroupRelationsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  groupId?: InputMaybe<Scalars['String']>;
}>;


export type GetUserGroupRelationsQuery = { __typename?: 'Query', GetUserGroupRelations: Array<{ __typename?: 'UserGroupRelation', id: string, userId: string, groupId: string, createdAt: Date, updatedAt: Date, user: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, accessToken?: string | null, createdAt: Date, updatedAt: Date }, group: { __typename?: 'Group', id: string, name: string, description?: string | null, image: string, adminUserId: string, productId: string, roomId: string, createdAt: Date, updatedAt: Date } }> };

export type CreateUserGroupRelationMutationVariables = Exact<{
  userId: Scalars['String'];
  groupId: Scalars['String'];
}>;


export type CreateUserGroupRelationMutation = { __typename?: 'Mutation', createUserGroupRelation: { __typename?: 'UserGroupRelation', id: string, userId: string, groupId: string, createdAt: Date, updatedAt: Date, user: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, accessToken?: string | null, createdAt: Date, updatedAt: Date }, group: { __typename?: 'Group', id: string, name: string, description?: string | null, image: string, adminUserId: string, productId: string, roomId: string, createdAt: Date, updatedAt: Date } } };

export type DeleteUserGroupRelationMutationVariables = Exact<{
  userId: Scalars['String'];
  groupId: Scalars['String'];
}>;


export type DeleteUserGroupRelationMutation = { __typename?: 'Mutation', DeleteUserGroupRelation: { __typename?: 'UserGroupRelation', id: string, userId: string, groupId: string, createdAt: Date, updatedAt: Date, user: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, accessToken?: string | null, createdAt: Date, updatedAt: Date }, group: { __typename?: 'Group', id: string, name: string, description?: string | null, image: string, adminUserId: string, productId: string, roomId: string, createdAt: Date, updatedAt: Date } } };

export type GetCurrentUserQueryVariables = Exact<{
  accessToken: Scalars['String'];
}>;


export type GetCurrentUserQuery = { __typename?: 'Query', getCurrentUser?: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, createdAt: Date, updatedAt: Date } | null };

export type GetUserQueryVariables = Exact<{
  getUserId: Scalars['String'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, createdAt: Date, updatedAt: Date } | null };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, createdAt: Date, updatedAt: Date } };

export type DeleteUserMutationVariables = Exact<{
  deleteUserId: Scalars['String'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, createdAt: Date, updatedAt: Date } };

export type UpdateUserMutationVariables = Exact<{
  updateUserId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name: string, email: string, description?: string | null, image?: string | null, createdAt: Date, updatedAt: Date } };


export const GetFavoritesDocument = gql`
    query GetFavorites($createdUserId: String, $postId: String, $sort: orderByType) {
  GetFavorites(createdUserId: $createdUserId, postId: $postId, sort: $sort) {
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
    `;

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
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetFavoritesQuery(baseOptions?: Apollo.QueryHookOptions<GetFavoritesQuery, GetFavoritesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFavoritesQuery, GetFavoritesQueryVariables>(GetFavoritesDocument, options);
      }
export function useGetFavoritesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFavoritesQuery, GetFavoritesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFavoritesQuery, GetFavoritesQueryVariables>(GetFavoritesDocument, options);
        }
export type GetFavoritesQueryHookResult = ReturnType<typeof useGetFavoritesQuery>;
export type GetFavoritesLazyQueryHookResult = ReturnType<typeof useGetFavoritesLazyQuery>;
export type GetFavoritesQueryResult = Apollo.QueryResult<GetFavoritesQuery, GetFavoritesQueryVariables>;
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
    `;
export type CreateFavoriteMutationFn = Apollo.MutationFunction<CreateFavoriteMutation, CreateFavoriteMutationVariables>;

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
export function useCreateFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<CreateFavoriteMutation, CreateFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFavoriteMutation, CreateFavoriteMutationVariables>(CreateFavoriteDocument, options);
      }
export type CreateFavoriteMutationHookResult = ReturnType<typeof useCreateFavoriteMutation>;
export type CreateFavoriteMutationResult = Apollo.MutationResult<CreateFavoriteMutation>;
export type CreateFavoriteMutationOptions = Apollo.BaseMutationOptions<CreateFavoriteMutation, CreateFavoriteMutationVariables>;
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
    `;
export type DeleteFavoriteMutationFn = Apollo.MutationFunction<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>;

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
export function useDeleteFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>(DeleteFavoriteDocument, options);
      }
export type DeleteFavoriteMutationHookResult = ReturnType<typeof useDeleteFavoriteMutation>;
export type DeleteFavoriteMutationResult = Apollo.MutationResult<DeleteFavoriteMutation>;
export type DeleteFavoriteMutationOptions = Apollo.BaseMutationOptions<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>;
export const GetGroupDocument = gql`
    query GetGroup($getGroupId: String!) {
  getGroup(id: $getGroupId) {
    id
    name
    description
    image
    adminUserId
    productId
    roomId
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
export const GetGroupByRoomIdDocument = gql`
    query GetGroupByRoomId($roomId: String!) {
  getGroupByRoomId(roomId: $roomId) {
    id
    name
    description
    image
    adminUserId
    productId
    roomId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetGroupByRoomIdQuery__
 *
 * To run a query within a React component, call `useGetGroupByRoomIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupByRoomIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupByRoomIdQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useGetGroupByRoomIdQuery(baseOptions: Apollo.QueryHookOptions<GetGroupByRoomIdQuery, GetGroupByRoomIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupByRoomIdQuery, GetGroupByRoomIdQueryVariables>(GetGroupByRoomIdDocument, options);
      }
export function useGetGroupByRoomIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupByRoomIdQuery, GetGroupByRoomIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupByRoomIdQuery, GetGroupByRoomIdQueryVariables>(GetGroupByRoomIdDocument, options);
        }
export type GetGroupByRoomIdQueryHookResult = ReturnType<typeof useGetGroupByRoomIdQuery>;
export type GetGroupByRoomIdLazyQueryHookResult = ReturnType<typeof useGetGroupByRoomIdLazyQuery>;
export type GetGroupByRoomIdQueryResult = Apollo.QueryResult<GetGroupByRoomIdQuery, GetGroupByRoomIdQueryVariables>;
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
    roomId
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
    roomId
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
    roomId
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
export const GetMessageDocument = gql`
    query GetMessage($getMessageId: String!) {
  getMessage(id: $getMessageId) {
    id
    type
    roomId
    userId
    body
    user {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
    room {
      id
      latestMessageId
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetMessageQuery__
 *
 * To run a query within a React component, call `useGetMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessageQuery({
 *   variables: {
 *      getMessageId: // value for 'getMessageId'
 *   },
 * });
 */
export function useGetMessageQuery(baseOptions: Apollo.QueryHookOptions<GetMessageQuery, GetMessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessageQuery, GetMessageQueryVariables>(GetMessageDocument, options);
      }
export function useGetMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessageQuery, GetMessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessageQuery, GetMessageQueryVariables>(GetMessageDocument, options);
        }
export type GetMessageQueryHookResult = ReturnType<typeof useGetMessageQuery>;
export type GetMessageLazyQueryHookResult = ReturnType<typeof useGetMessageLazyQuery>;
export type GetMessageQueryResult = Apollo.QueryResult<GetMessageQuery, GetMessageQueryVariables>;
export const GetMessagesDocument = gql`
    query GetMessages($roomId: String!, $sort: orderByType) {
  GetMessages(roomId: $roomId, sort: $sort) {
    id
    type
    roomId
    userId
    body
    user {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
    room {
      id
      latestMessageId
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($messageType: MessageType!, $roomId: String!, $body: String!) {
  CreateMessage(messageType: $messageType, roomId: $roomId, body: $body) {
    id
    type
    roomId
    userId
    body
    user {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
    room {
      id
      latestMessageId
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      messageType: // value for 'messageType'
 *      roomId: // value for 'roomId'
 *      body: // value for 'body'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($deleteMessageId: String!) {
  DeleteMessage(id: $deleteMessageId) {
    id
    type
    roomId
    userId
    body
    user {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
    room {
      id
      latestMessageId
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      deleteMessageId: // value for 'deleteMessageId'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const GetNotificationsDocument = gql`
    query GetNotifications($targetUserId: String!, $sort: orderByType) {
  GetNotifications(targetUserId: $targetUserId, sort: $sort) {
    id
    type
    createdUserId
    targetUserId
    message
    url
    isChecked
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetNotificationsQuery__
 *
 * To run a query within a React component, call `useGetNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationsQuery({
 *   variables: {
 *      targetUserId: // value for 'targetUserId'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useGetNotificationsQuery(baseOptions: Apollo.QueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
      }
export function useGetNotificationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationsQuery, GetNotificationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotificationsQuery, GetNotificationsQueryVariables>(GetNotificationsDocument, options);
        }
export type GetNotificationsQueryHookResult = ReturnType<typeof useGetNotificationsQuery>;
export type GetNotificationsLazyQueryHookResult = ReturnType<typeof useGetNotificationsLazyQuery>;
export type GetNotificationsQueryResult = Apollo.QueryResult<GetNotificationsQuery, GetNotificationsQueryVariables>;
export const UpdateNotificationDocument = gql`
    mutation UpdateNotification($updateNotificationId: String!, $isChecked: Boolean!) {
  UpdateNotification(id: $updateNotificationId, isChecked: $isChecked) {
    id
    type
    createdUserId
    targetUserId
    message
    url
    isChecked
    createdAt
    updatedAt
  }
}
    `;
export type UpdateNotificationMutationFn = Apollo.MutationFunction<UpdateNotificationMutation, UpdateNotificationMutationVariables>;

/**
 * __useUpdateNotificationMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationMutation, { data, loading, error }] = useUpdateNotificationMutation({
 *   variables: {
 *      updateNotificationId: // value for 'updateNotificationId'
 *      isChecked: // value for 'isChecked'
 *   },
 * });
 */
export function useUpdateNotificationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNotificationMutation, UpdateNotificationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateNotificationMutation, UpdateNotificationMutationVariables>(UpdateNotificationDocument, options);
      }
export type UpdateNotificationMutationHookResult = ReturnType<typeof useUpdateNotificationMutation>;
export type UpdateNotificationMutationResult = Apollo.MutationResult<UpdateNotificationMutation>;
export type UpdateNotificationMutationOptions = Apollo.BaseMutationOptions<UpdateNotificationMutation, UpdateNotificationMutationVariables>;
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
    `;

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
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts($userId: String, $groupId: String, $isPrivate: Boolean, $sort: postOrderByType, $limit: Int, $page: Int) {
  GetPosts(
    userId: $userId
    groupId: $groupId
    isPrivate: $isPrivate
    sort: $sort
    limit: $limit
    page: $page
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
    `;

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
 *      sort: // value for 'sort'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetMatchingPostsDocument = gql`
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
    `;

/**
 * __useGetMatchingPostsQuery__
 *
 * To run a query within a React component, call `useGetMatchingPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMatchingPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMatchingPostsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetMatchingPostsQuery(baseOptions: Apollo.QueryHookOptions<GetMatchingPostsQuery, GetMatchingPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMatchingPostsQuery, GetMatchingPostsQueryVariables>(GetMatchingPostsDocument, options);
      }
export function useGetMatchingPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMatchingPostsQuery, GetMatchingPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMatchingPostsQuery, GetMatchingPostsQueryVariables>(GetMatchingPostsDocument, options);
        }
export type GetMatchingPostsQueryHookResult = ReturnType<typeof useGetMatchingPostsQuery>;
export type GetMatchingPostsLazyQueryHookResult = ReturnType<typeof useGetMatchingPostsLazyQuery>;
export type GetMatchingPostsQueryResult = Apollo.QueryResult<GetMatchingPostsQuery, GetMatchingPostsQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($title: String!, $content: String!, $category: PostCategory!, $isPrivate: Boolean!, $groupId: String, $bgImage: String) {
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
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

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
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
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
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

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
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($updatePostId: String!, $title: String, $content: String, $category: PostCategory, $isPrivate: Boolean, $bgImage: String) {
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
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

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
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const GetReadManagementDocument = gql`
    query GetReadManagement($targetUserId: String!, $messageId: String!) {
  GetReadManagement(targetUserId: $targetUserId, messageId: $messageId) {
    id
    targetUserId
    messageId
    isRead
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetReadManagementQuery__
 *
 * To run a query within a React component, call `useGetReadManagementQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReadManagementQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReadManagementQuery({
 *   variables: {
 *      targetUserId: // value for 'targetUserId'
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useGetReadManagementQuery(baseOptions: Apollo.QueryHookOptions<GetReadManagementQuery, GetReadManagementQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReadManagementQuery, GetReadManagementQueryVariables>(GetReadManagementDocument, options);
      }
export function useGetReadManagementLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReadManagementQuery, GetReadManagementQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReadManagementQuery, GetReadManagementQueryVariables>(GetReadManagementDocument, options);
        }
export type GetReadManagementQueryHookResult = ReturnType<typeof useGetReadManagementQuery>;
export type GetReadManagementLazyQueryHookResult = ReturnType<typeof useGetReadManagementLazyQuery>;
export type GetReadManagementQueryResult = Apollo.QueryResult<GetReadManagementQuery, GetReadManagementQueryVariables>;
export const GetReadManagementsDocument = gql`
    query GetReadManagements($targetUserId: String, $messageId: String) {
  GetReadManagements(targetUserId: $targetUserId, messageId: $messageId) {
    id
    targetUserId
    messageId
    isRead
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetReadManagementsQuery__
 *
 * To run a query within a React component, call `useGetReadManagementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReadManagementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReadManagementsQuery({
 *   variables: {
 *      targetUserId: // value for 'targetUserId'
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useGetReadManagementsQuery(baseOptions?: Apollo.QueryHookOptions<GetReadManagementsQuery, GetReadManagementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReadManagementsQuery, GetReadManagementsQueryVariables>(GetReadManagementsDocument, options);
      }
export function useGetReadManagementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReadManagementsQuery, GetReadManagementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReadManagementsQuery, GetReadManagementsQueryVariables>(GetReadManagementsDocument, options);
        }
export type GetReadManagementsQueryHookResult = ReturnType<typeof useGetReadManagementsQuery>;
export type GetReadManagementsLazyQueryHookResult = ReturnType<typeof useGetReadManagementsLazyQuery>;
export type GetReadManagementsQueryResult = Apollo.QueryResult<GetReadManagementsQuery, GetReadManagementsQueryVariables>;
export const UpdateReadManagementDocument = gql`
    mutation UpdateReadManagement($targetUserId: String!, $messageId: String!) {
  UpdateReadManagement(targetUserId: $targetUserId, messageId: $messageId) {
    id
    targetUserId
    messageId
    isRead
    createdAt
    updatedAt
  }
}
    `;
export type UpdateReadManagementMutationFn = Apollo.MutationFunction<UpdateReadManagementMutation, UpdateReadManagementMutationVariables>;

/**
 * __useUpdateReadManagementMutation__
 *
 * To run a mutation, you first call `useUpdateReadManagementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReadManagementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReadManagementMutation, { data, loading, error }] = useUpdateReadManagementMutation({
 *   variables: {
 *      targetUserId: // value for 'targetUserId'
 *      messageId: // value for 'messageId'
 *   },
 * });
 */
export function useUpdateReadManagementMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReadManagementMutation, UpdateReadManagementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReadManagementMutation, UpdateReadManagementMutationVariables>(UpdateReadManagementDocument, options);
      }
export type UpdateReadManagementMutationHookResult = ReturnType<typeof useUpdateReadManagementMutation>;
export type UpdateReadManagementMutationResult = Apollo.MutationResult<UpdateReadManagementMutation>;
export type UpdateReadManagementMutationOptions = Apollo.BaseMutationOptions<UpdateReadManagementMutation, UpdateReadManagementMutationVariables>;
export const GetRoomDocument = gql`
    query GetRoom($getRoomId: String!) {
  GetRoom(id: $getRoomId) {
    id
    latestMessageId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetRoomQuery__
 *
 * To run a query within a React component, call `useGetRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomQuery({
 *   variables: {
 *      getRoomId: // value for 'getRoomId'
 *   },
 * });
 */
export function useGetRoomQuery(baseOptions: Apollo.QueryHookOptions<GetRoomQuery, GetRoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomQuery, GetRoomQueryVariables>(GetRoomDocument, options);
      }
export function useGetRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomQuery, GetRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomQuery, GetRoomQueryVariables>(GetRoomDocument, options);
        }
export type GetRoomQueryHookResult = ReturnType<typeof useGetRoomQuery>;
export type GetRoomLazyQueryHookResult = ReturnType<typeof useGetRoomLazyQuery>;
export type GetRoomQueryResult = Apollo.QueryResult<GetRoomQuery, GetRoomQueryVariables>;
export const GetOneOnOneRoomDocument = gql`
    query GetOneOnOneRoom($memberId: String!) {
  GetOneOnOneRoom(memberId: $memberId) {
    id
    latestMessageId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetOneOnOneRoomQuery__
 *
 * To run a query within a React component, call `useGetOneOnOneRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneOnOneRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneOnOneRoomQuery({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useGetOneOnOneRoomQuery(baseOptions: Apollo.QueryHookOptions<GetOneOnOneRoomQuery, GetOneOnOneRoomQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneOnOneRoomQuery, GetOneOnOneRoomQueryVariables>(GetOneOnOneRoomDocument, options);
      }
export function useGetOneOnOneRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneOnOneRoomQuery, GetOneOnOneRoomQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneOnOneRoomQuery, GetOneOnOneRoomQueryVariables>(GetOneOnOneRoomDocument, options);
        }
export type GetOneOnOneRoomQueryHookResult = ReturnType<typeof useGetOneOnOneRoomQuery>;
export type GetOneOnOneRoomLazyQueryHookResult = ReturnType<typeof useGetOneOnOneRoomLazyQuery>;
export type GetOneOnOneRoomQueryResult = Apollo.QueryResult<GetOneOnOneRoomQuery, GetOneOnOneRoomQueryVariables>;
export const GetRoomsByLoginUserIdDocument = gql`
    query GetRoomsByLoginUserId($getRoomType: GetRoomType!) {
  GetRoomsByLoginUserId(getRoomType: $getRoomType) {
    id
    latestMessageId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetRoomsByLoginUserIdQuery__
 *
 * To run a query within a React component, call `useGetRoomsByLoginUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomsByLoginUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomsByLoginUserIdQuery({
 *   variables: {
 *      getRoomType: // value for 'getRoomType'
 *   },
 * });
 */
export function useGetRoomsByLoginUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetRoomsByLoginUserIdQuery, GetRoomsByLoginUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomsByLoginUserIdQuery, GetRoomsByLoginUserIdQueryVariables>(GetRoomsByLoginUserIdDocument, options);
      }
export function useGetRoomsByLoginUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomsByLoginUserIdQuery, GetRoomsByLoginUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomsByLoginUserIdQuery, GetRoomsByLoginUserIdQueryVariables>(GetRoomsByLoginUserIdDocument, options);
        }
export type GetRoomsByLoginUserIdQueryHookResult = ReturnType<typeof useGetRoomsByLoginUserIdQuery>;
export type GetRoomsByLoginUserIdLazyQueryHookResult = ReturnType<typeof useGetRoomsByLoginUserIdLazyQuery>;
export type GetRoomsByLoginUserIdQueryResult = Apollo.QueryResult<GetRoomsByLoginUserIdQuery, GetRoomsByLoginUserIdQueryVariables>;
export const CreateRoomDocument = gql`
    mutation CreateRoom($memberId: String!) {
  CreateRoom(memberId: $memberId) {
    id
    latestMessageId
    createdAt
    updatedAt
  }
}
    `;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      memberId: // value for 'memberId'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, options);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const DeleteRoomDocument = gql`
    mutation DeleteRoom($deleteRoomId: String!) {
  DeleteRoom(id: $deleteRoomId) {
    id
    latestMessageId
    createdAt
    updatedAt
  }
}
    `;
export type DeleteRoomMutationFn = Apollo.MutationFunction<DeleteRoomMutation, DeleteRoomMutationVariables>;

/**
 * __useDeleteRoomMutation__
 *
 * To run a mutation, you first call `useDeleteRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoomMutation, { data, loading, error }] = useDeleteRoomMutation({
 *   variables: {
 *      deleteRoomId: // value for 'deleteRoomId'
 *   },
 * });
 */
export function useDeleteRoomMutation(baseOptions?: Apollo.MutationHookOptions<DeleteRoomMutation, DeleteRoomMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteRoomMutation, DeleteRoomMutationVariables>(DeleteRoomDocument, options);
      }
export type DeleteRoomMutationHookResult = ReturnType<typeof useDeleteRoomMutation>;
export type DeleteRoomMutationResult = Apollo.MutationResult<DeleteRoomMutation>;
export type DeleteRoomMutationOptions = Apollo.BaseMutationOptions<DeleteRoomMutation, DeleteRoomMutationVariables>;
export const GetTargetRoomMemberDocument = gql`
    query GetTargetRoomMember($roomId: String!, $userId: String!) {
  getTargetRoomMember(roomId: $roomId, userId: $userId) {
    id
    roomId
    userId
    createdAt
    updatedAt
    room {
      id
      latestMessageId
      createdAt
      updatedAt
    }
    user {
      id
      name
      email
      description
      image
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetTargetRoomMemberQuery__
 *
 * To run a query within a React component, call `useGetTargetRoomMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTargetRoomMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTargetRoomMemberQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetTargetRoomMemberQuery(baseOptions: Apollo.QueryHookOptions<GetTargetRoomMemberQuery, GetTargetRoomMemberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTargetRoomMemberQuery, GetTargetRoomMemberQueryVariables>(GetTargetRoomMemberDocument, options);
      }
export function useGetTargetRoomMemberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTargetRoomMemberQuery, GetTargetRoomMemberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTargetRoomMemberQuery, GetTargetRoomMemberQueryVariables>(GetTargetRoomMemberDocument, options);
        }
export type GetTargetRoomMemberQueryHookResult = ReturnType<typeof useGetTargetRoomMemberQuery>;
export type GetTargetRoomMemberLazyQueryHookResult = ReturnType<typeof useGetTargetRoomMemberLazyQuery>;
export type GetTargetRoomMemberQueryResult = Apollo.QueryResult<GetTargetRoomMemberQuery, GetTargetRoomMemberQueryVariables>;
export const GetRoomMembersDocument = gql`
    query GetRoomMembers($userId: String, $roomId: String) {
  getRoomMembers(userId: $userId, roomId: $roomId) {
    id
    roomId
    userId
    createdAt
    updatedAt
    room {
      id
      latestMessageId
      createdAt
      updatedAt
    }
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
  }
}
    `;

/**
 * __useGetRoomMembersQuery__
 *
 * To run a query within a React component, call `useGetRoomMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoomMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoomMembersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useGetRoomMembersQuery(baseOptions?: Apollo.QueryHookOptions<GetRoomMembersQuery, GetRoomMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoomMembersQuery, GetRoomMembersQueryVariables>(GetRoomMembersDocument, options);
      }
export function useGetRoomMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoomMembersQuery, GetRoomMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoomMembersQuery, GetRoomMembersQueryVariables>(GetRoomMembersDocument, options);
        }
export type GetRoomMembersQueryHookResult = ReturnType<typeof useGetRoomMembersQuery>;
export type GetRoomMembersLazyQueryHookResult = ReturnType<typeof useGetRoomMembersLazyQuery>;
export type GetRoomMembersQueryResult = Apollo.QueryResult<GetRoomMembersQuery, GetRoomMembersQueryVariables>;
export const GetAllTagsDocument = gql`
    query GetAllTags($sort: orderByType, $searchText: String) {
  getAllTags(sort: $sort, searchText: $searchText) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetAllTagsQuery__
 *
 * To run a query within a React component, call `useGetAllTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTagsQuery({
 *   variables: {
 *      sort: // value for 'sort'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useGetAllTagsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(GetAllTagsDocument, options);
      }
export function useGetAllTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllTagsQuery, GetAllTagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllTagsQuery, GetAllTagsQueryVariables>(GetAllTagsDocument, options);
        }
export type GetAllTagsQueryHookResult = ReturnType<typeof useGetAllTagsQuery>;
export type GetAllTagsLazyQueryHookResult = ReturnType<typeof useGetAllTagsLazyQuery>;
export type GetAllTagsQueryResult = Apollo.QueryResult<GetAllTagsQuery, GetAllTagsQueryVariables>;
export const GetTagByNameDocument = gql`
    query GetTagByName($name: String!) {
  GetTagByName(name: $name) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetTagByNameQuery__
 *
 * To run a query within a React component, call `useGetTagByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGetTagByNameQuery(baseOptions: Apollo.QueryHookOptions<GetTagByNameQuery, GetTagByNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagByNameQuery, GetTagByNameQueryVariables>(GetTagByNameDocument, options);
      }
export function useGetTagByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagByNameQuery, GetTagByNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagByNameQuery, GetTagByNameQueryVariables>(GetTagByNameDocument, options);
        }
export type GetTagByNameQueryHookResult = ReturnType<typeof useGetTagByNameQuery>;
export type GetTagByNameLazyQueryHookResult = ReturnType<typeof useGetTagByNameLazyQuery>;
export type GetTagByNameQueryResult = Apollo.QueryResult<GetTagByNameQuery, GetTagByNameQueryVariables>;
export const CreateTagDocument = gql`
    mutation CreateTag($name: String!) {
  createTag(name: $name) {
    id
    name
    createdAt
    updatedAt
  }
}
    `;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const GetTagPostRelationsDocument = gql`
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
    `;

/**
 * __useGetTagPostRelationsQuery__
 *
 * To run a query within a React component, call `useGetTagPostRelationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTagPostRelationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTagPostRelationsQuery({
 *   variables: {
 *      tagId: // value for 'tagId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetTagPostRelationsQuery(baseOptions?: Apollo.QueryHookOptions<GetTagPostRelationsQuery, GetTagPostRelationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTagPostRelationsQuery, GetTagPostRelationsQueryVariables>(GetTagPostRelationsDocument, options);
      }
export function useGetTagPostRelationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTagPostRelationsQuery, GetTagPostRelationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTagPostRelationsQuery, GetTagPostRelationsQueryVariables>(GetTagPostRelationsDocument, options);
        }
export type GetTagPostRelationsQueryHookResult = ReturnType<typeof useGetTagPostRelationsQuery>;
export type GetTagPostRelationsLazyQueryHookResult = ReturnType<typeof useGetTagPostRelationsLazyQuery>;
export type GetTagPostRelationsQueryResult = Apollo.QueryResult<GetTagPostRelationsQuery, GetTagPostRelationsQueryVariables>;
export const CreateTagPostRelationDocument = gql`
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
    `;
export type CreateTagPostRelationMutationFn = Apollo.MutationFunction<CreateTagPostRelationMutation, CreateTagPostRelationMutationVariables>;

/**
 * __useCreateTagPostRelationMutation__
 *
 * To run a mutation, you first call `useCreateTagPostRelationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagPostRelationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagPostRelationMutation, { data, loading, error }] = useCreateTagPostRelationMutation({
 *   variables: {
 *      tagId: // value for 'tagId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateTagPostRelationMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagPostRelationMutation, CreateTagPostRelationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagPostRelationMutation, CreateTagPostRelationMutationVariables>(CreateTagPostRelationDocument, options);
      }
export type CreateTagPostRelationMutationHookResult = ReturnType<typeof useCreateTagPostRelationMutation>;
export type CreateTagPostRelationMutationResult = Apollo.MutationResult<CreateTagPostRelationMutation>;
export type CreateTagPostRelationMutationOptions = Apollo.BaseMutationOptions<CreateTagPostRelationMutation, CreateTagPostRelationMutationVariables>;
export const CreateTagPostRelationsDocument = gql`
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
    `;
export type CreateTagPostRelationsMutationFn = Apollo.MutationFunction<CreateTagPostRelationsMutation, CreateTagPostRelationsMutationVariables>;

/**
 * __useCreateTagPostRelationsMutation__
 *
 * To run a mutation, you first call `useCreateTagPostRelationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagPostRelationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagPostRelationsMutation, { data, loading, error }] = useCreateTagPostRelationsMutation({
 *   variables: {
 *      tagIds: // value for 'tagIds'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateTagPostRelationsMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagPostRelationsMutation, CreateTagPostRelationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagPostRelationsMutation, CreateTagPostRelationsMutationVariables>(CreateTagPostRelationsDocument, options);
      }
export type CreateTagPostRelationsMutationHookResult = ReturnType<typeof useCreateTagPostRelationsMutation>;
export type CreateTagPostRelationsMutationResult = Apollo.MutationResult<CreateTagPostRelationsMutation>;
export type CreateTagPostRelationsMutationOptions = Apollo.BaseMutationOptions<CreateTagPostRelationsMutation, CreateTagPostRelationsMutationVariables>;
export const DeleteTagPostRelationDocument = gql`
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
    `;
export type DeleteTagPostRelationMutationFn = Apollo.MutationFunction<DeleteTagPostRelationMutation, DeleteTagPostRelationMutationVariables>;

/**
 * __useDeleteTagPostRelationMutation__
 *
 * To run a mutation, you first call `useDeleteTagPostRelationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagPostRelationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagPostRelationMutation, { data, loading, error }] = useDeleteTagPostRelationMutation({
 *   variables: {
 *      tagId: // value for 'tagId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeleteTagPostRelationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTagPostRelationMutation, DeleteTagPostRelationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTagPostRelationMutation, DeleteTagPostRelationMutationVariables>(DeleteTagPostRelationDocument, options);
      }
export type DeleteTagPostRelationMutationHookResult = ReturnType<typeof useDeleteTagPostRelationMutation>;
export type DeleteTagPostRelationMutationResult = Apollo.MutationResult<DeleteTagPostRelationMutation>;
export type DeleteTagPostRelationMutationOptions = Apollo.BaseMutationOptions<DeleteTagPostRelationMutation, DeleteTagPostRelationMutationVariables>;
export const DeleteTagPostRelationsDocument = gql`
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
    `;
export type DeleteTagPostRelationsMutationFn = Apollo.MutationFunction<DeleteTagPostRelationsMutation, DeleteTagPostRelationsMutationVariables>;

/**
 * __useDeleteTagPostRelationsMutation__
 *
 * To run a mutation, you first call `useDeleteTagPostRelationsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTagPostRelationsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTagPostRelationsMutation, { data, loading, error }] = useDeleteTagPostRelationsMutation({
 *   variables: {
 *      tagPostTypes: // value for 'tagPostTypes'
 *   },
 * });
 */
export function useDeleteTagPostRelationsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTagPostRelationsMutation, DeleteTagPostRelationsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTagPostRelationsMutation, DeleteTagPostRelationsMutationVariables>(DeleteTagPostRelationsDocument, options);
      }
export type DeleteTagPostRelationsMutationHookResult = ReturnType<typeof useDeleteTagPostRelationsMutation>;
export type DeleteTagPostRelationsMutationResult = Apollo.MutationResult<DeleteTagPostRelationsMutation>;
export type DeleteTagPostRelationsMutationOptions = Apollo.BaseMutationOptions<DeleteTagPostRelationsMutation, DeleteTagPostRelationsMutationVariables>;
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
      roomId
      createdAt
      updatedAt
    }
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
      roomId
      createdAt
      updatedAt
    }
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
      roomId
      createdAt
      updatedAt
    }
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
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $email: String!, $description: String, $image: String) {
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
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($deleteUserId: String!) {
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
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      deleteUserId: // value for 'deleteUserId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserId: String!, $name: String, $email: String, $description: String, $image: String) {
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
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserId: // value for 'updateUserId'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      description: // value for 'description'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;