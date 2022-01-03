import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: Date;
  uuid: string;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "attachments" */
export type Attachments = {
  __typename?: 'attachments';
  _id: Scalars['uuid'];
  createdAt: Scalars['timestamptz'];
  createdUserId?: Maybe<Scalars['uuid']>;
  filePath: Scalars['String'];
  name: Scalars['String'];
  size: Scalars['Int'];
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user?: Maybe<Users>;
  /** An object relationship */
  userByCreateduserid?: Maybe<Users>;
};

/** aggregated selection of "attachments" */
export type Attachments_Aggregate = {
  __typename?: 'attachments_aggregate';
  aggregate?: Maybe<Attachments_Aggregate_Fields>;
  nodes: Array<Attachments>;
};

/** aggregate fields of "attachments" */
export type Attachments_Aggregate_Fields = {
  __typename?: 'attachments_aggregate_fields';
  avg?: Maybe<Attachments_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Attachments_Max_Fields>;
  min?: Maybe<Attachments_Min_Fields>;
  stddev?: Maybe<Attachments_Stddev_Fields>;
  stddev_pop?: Maybe<Attachments_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Attachments_Stddev_Samp_Fields>;
  sum?: Maybe<Attachments_Sum_Fields>;
  var_pop?: Maybe<Attachments_Var_Pop_Fields>;
  var_samp?: Maybe<Attachments_Var_Samp_Fields>;
  variance?: Maybe<Attachments_Variance_Fields>;
};


/** aggregate fields of "attachments" */
export type Attachments_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Attachments_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Attachments_Avg_Fields = {
  __typename?: 'attachments_avg_fields';
  size?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "attachments". All fields are combined with a logical 'AND'. */
export type Attachments_Bool_Exp = {
  _and?: InputMaybe<Array<Attachments_Bool_Exp>>;
  _id?: InputMaybe<Uuid_Comparison_Exp>;
  _not?: InputMaybe<Attachments_Bool_Exp>;
  _or?: InputMaybe<Array<Attachments_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  createdUserId?: InputMaybe<Uuid_Comparison_Exp>;
  filePath?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  size?: InputMaybe<Int_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  userByCreateduserid?: InputMaybe<Users_Bool_Exp>;
};

/** unique or primary key constraints on table "attachments" */
export enum Attachments_Constraint {
  /** unique or primary key constraint */
  AttachmentsCreatedUserIdKey = 'attachments_createdUserId_key',
  /** unique or primary key constraint */
  AttachmentsPkey = 'attachments_pkey'
}

/** input type for incrementing numeric columns in table "attachments" */
export type Attachments_Inc_Input = {
  size?: InputMaybe<Scalars['Int']>;
};

/** input type for inserting data into table "attachments" */
export type Attachments_Insert_Input = {
  _id?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  createdUserId?: InputMaybe<Scalars['uuid']>;
  filePath?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  userByCreateduserid?: InputMaybe<Users_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Attachments_Max_Fields = {
  __typename?: 'attachments_max_fields';
  _id?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  createdUserId?: Maybe<Scalars['uuid']>;
  filePath?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Attachments_Min_Fields = {
  __typename?: 'attachments_min_fields';
  _id?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  createdUserId?: Maybe<Scalars['uuid']>;
  filePath?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  size?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "attachments" */
export type Attachments_Mutation_Response = {
  __typename?: 'attachments_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Attachments>;
};

/** input type for inserting object relation for remote table "attachments" */
export type Attachments_Obj_Rel_Insert_Input = {
  data: Attachments_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Attachments_On_Conflict>;
};

/** on conflict condition type for table "attachments" */
export type Attachments_On_Conflict = {
  constraint: Attachments_Constraint;
  update_columns?: Array<Attachments_Update_Column>;
  where?: InputMaybe<Attachments_Bool_Exp>;
};

/** Ordering options when selecting data from "attachments". */
export type Attachments_Order_By = {
  _id?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  createdUserId?: InputMaybe<Order_By>;
  filePath?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  size?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  userByCreateduserid?: InputMaybe<Users_Order_By>;
};

/** primary key columns input for table: attachments */
export type Attachments_Pk_Columns_Input = {
  _id: Scalars['uuid'];
};

/** select columns of table "attachments" */
export enum Attachments_Select_Column {
  /** column name */
  Id = '_id',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedUserId = 'createdUserId',
  /** column name */
  FilePath = 'filePath',
  /** column name */
  Name = 'name',
  /** column name */
  Size = 'size',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "attachments" */
export type Attachments_Set_Input = {
  _id?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  createdUserId?: InputMaybe<Scalars['uuid']>;
  filePath?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Attachments_Stddev_Fields = {
  __typename?: 'attachments_stddev_fields';
  size?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Attachments_Stddev_Pop_Fields = {
  __typename?: 'attachments_stddev_pop_fields';
  size?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Attachments_Stddev_Samp_Fields = {
  __typename?: 'attachments_stddev_samp_fields';
  size?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Attachments_Sum_Fields = {
  __typename?: 'attachments_sum_fields';
  size?: Maybe<Scalars['Int']>;
};

/** update columns of table "attachments" */
export enum Attachments_Update_Column {
  /** column name */
  Id = '_id',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedUserId = 'createdUserId',
  /** column name */
  FilePath = 'filePath',
  /** column name */
  Name = 'name',
  /** column name */
  Size = 'size',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** aggregate var_pop on columns */
export type Attachments_Var_Pop_Fields = {
  __typename?: 'attachments_var_pop_fields';
  size?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Attachments_Var_Samp_Fields = {
  __typename?: 'attachments_var_samp_fields';
  size?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Attachments_Variance_Fields = {
  __typename?: 'attachments_variance_fields';
  size?: Maybe<Scalars['Float']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "attachments" */
  delete_attachments?: Maybe<Attachments_Mutation_Response>;
  /** delete single row from the table: "attachments" */
  delete_attachments_by_pk?: Maybe<Attachments>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** insert data into the table: "attachments" */
  insert_attachments?: Maybe<Attachments_Mutation_Response>;
  /** insert a single row into the table: "attachments" */
  insert_attachments_one?: Maybe<Attachments>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** update data of the table: "attachments" */
  update_attachments?: Maybe<Attachments_Mutation_Response>;
  /** update single row of the table: "attachments" */
  update_attachments_by_pk?: Maybe<Attachments>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
};


/** mutation root */
export type Mutation_RootDelete_AttachmentsArgs = {
  where: Attachments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Attachments_By_PkArgs = {
  _id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  _id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsert_AttachmentsArgs = {
  objects: Array<Attachments_Insert_Input>;
  on_conflict?: InputMaybe<Attachments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Attachments_OneArgs = {
  object: Attachments_Insert_Input;
  on_conflict?: InputMaybe<Attachments_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AttachmentsArgs = {
  _inc?: InputMaybe<Attachments_Inc_Input>;
  _set?: InputMaybe<Attachments_Set_Input>;
  where: Attachments_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Attachments_By_PkArgs = {
  _inc?: InputMaybe<Attachments_Inc_Input>;
  _set?: InputMaybe<Attachments_Set_Input>;
  pk_columns: Attachments_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "attachments" */
  attachments: Array<Attachments>;
  /** fetch aggregated fields from the table: "attachments" */
  attachments_aggregate: Attachments_Aggregate;
  /** fetch data from the table: "attachments" using primary key columns */
  attachments_by_pk?: Maybe<Attachments>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Query_RootAttachmentsArgs = {
  distinct_on?: InputMaybe<Array<Attachments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Attachments_Order_By>>;
  where?: InputMaybe<Attachments_Bool_Exp>;
};


export type Query_RootAttachments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Attachments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Attachments_Order_By>>;
  where?: InputMaybe<Attachments_Bool_Exp>;
};


export type Query_RootAttachments_By_PkArgs = {
  _id: Scalars['uuid'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  _id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "attachments" */
  attachments: Array<Attachments>;
  /** fetch aggregated fields from the table: "attachments" */
  attachments_aggregate: Attachments_Aggregate;
  /** fetch data from the table: "attachments" using primary key columns */
  attachments_by_pk?: Maybe<Attachments>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


export type Subscription_RootAttachmentsArgs = {
  distinct_on?: InputMaybe<Array<Attachments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Attachments_Order_By>>;
  where?: InputMaybe<Attachments_Bool_Exp>;
};


export type Subscription_RootAttachments_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Attachments_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Attachments_Order_By>>;
  where?: InputMaybe<Attachments_Bool_Exp>;
};


export type Subscription_RootAttachments_By_PkArgs = {
  _id: Scalars['uuid'];
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  _id: Scalars['uuid'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  _id: Scalars['uuid'];
  /** An object relationship */
  attachment: Attachments;
  /** An object relationship */
  attachmentById?: Maybe<Attachments>;
  createdAt: Scalars['timestamptz'];
  description: Scalars['String'];
  email: Scalars['String'];
  iconImageId: Scalars['uuid'];
  name: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _id?: InputMaybe<Uuid_Comparison_Exp>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  attachment?: InputMaybe<Attachments_Bool_Exp>;
  attachmentById?: InputMaybe<Attachments_Bool_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  description?: InputMaybe<String_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  iconImageId?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersIconImageIdKey = 'users_iconImageId_key',
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  _id?: InputMaybe<Scalars['uuid']>;
  attachment?: InputMaybe<Attachments_Obj_Rel_Insert_Input>;
  attachmentById?: InputMaybe<Attachments_Obj_Rel_Insert_Input>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  iconImageId?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  _id?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  iconImageId?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  _id?: Maybe<Scalars['uuid']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  iconImageId?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** on conflict condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  _id?: InputMaybe<Order_By>;
  attachment?: InputMaybe<Attachments_Order_By>;
  attachmentById?: InputMaybe<Attachments_Order_By>;
  createdAt?: InputMaybe<Order_By>;
  description?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  iconImageId?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  _id: Scalars['uuid'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Id = '_id',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Email = 'email',
  /** column name */
  IconImageId = 'iconImageId',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  _id?: InputMaybe<Scalars['uuid']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  iconImageId?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Id = '_id',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Description = 'description',
  /** column name */
  Email = 'email',
  /** column name */
  IconImageId = 'iconImageId',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

export type GetAttachmentByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetAttachmentByIdQuery = { __typename?: 'query_root', attachments_by_pk?: { __typename?: 'attachments', _id: any, name: string, size: number, filePath: string, createdUserId?: any | null | undefined, createdAt: any, updatedAt: any } | null | undefined };

export type CreateAttachmentMutationVariables = Exact<{
  name: Scalars['String'];
  size: Scalars['Int'];
  filePath: Scalars['String'];
  createdUserId: Scalars['uuid'];
}>;


export type CreateAttachmentMutation = { __typename?: 'mutation_root', insert_attachments_one?: { __typename?: 'attachments', _id: any, name: string, size: number, filePath: string, createdUserId?: any | null | undefined, createdAt: any, updatedAt: any } | null | undefined };

export type DeleteAttachmentMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteAttachmentMutation = { __typename?: 'mutation_root', delete_attachments_by_pk?: { __typename?: 'attachments', _id: any, name: string, size: number, filePath: string, createdUserId?: any | null | undefined, createdAt: any, updatedAt: any } | null | undefined };

export type GetUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUsersQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', _id: string, name: string, description: string, email: string, iconImageId: string, createdAt: Date, updatedAt: Date }> };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetUserByIdQuery = { __typename?: 'query_root', users_by_pk?: { __typename?: 'users', _id: any, name: string, description: string, email: string, iconImageId: any, createdAt: any, updatedAt: any } | null | undefined };

export type CreateUserMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  iconImageId: Scalars['uuid'];
}>;


export type CreateUserMutation = { __typename?: 'mutation_root', insert_users_one?: { __typename?: 'users', _id: any, name: string, description: string, email: string, iconImageId: any, createdAt: any, updatedAt: any } | null | undefined };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type DeleteUserMutation = { __typename?: 'mutation_root', delete_users_by_pk?: { __typename?: 'users', _id: any, name: string, description: string, email: string, iconImageId: any, createdAt: any, updatedAt: any } | null | undefined };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['uuid'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  iconImageId?: InputMaybe<Scalars['uuid']>;
}>;


export type UpdateUserMutation = { __typename?: 'mutation_root', update_users_by_pk?: { __typename?: 'users', _id: any, name: string, description: string, email: string, iconImageId: any, createdAt: any, updatedAt: any } | null | undefined };


export const GetAttachmentByIdDocument = gql`
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
    `;

/**
 * __useGetAttachmentByIdQuery__
 *
 * To run a query within a React component, call `useGetAttachmentByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAttachmentByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAttachmentByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAttachmentByIdQuery(baseOptions: Apollo.QueryHookOptions<GetAttachmentByIdQuery, GetAttachmentByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAttachmentByIdQuery, GetAttachmentByIdQueryVariables>(GetAttachmentByIdDocument, options);
      }
export function useGetAttachmentByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAttachmentByIdQuery, GetAttachmentByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAttachmentByIdQuery, GetAttachmentByIdQueryVariables>(GetAttachmentByIdDocument, options);
        }
export type GetAttachmentByIdQueryHookResult = ReturnType<typeof useGetAttachmentByIdQuery>;
export type GetAttachmentByIdLazyQueryHookResult = ReturnType<typeof useGetAttachmentByIdLazyQuery>;
export type GetAttachmentByIdQueryResult = Apollo.QueryResult<GetAttachmentByIdQuery, GetAttachmentByIdQueryVariables>;
export const CreateAttachmentDocument = gql`
    mutation CreateAttachment($name: String!, $size: Int!, $filePath: String!, $createdUserId: uuid!) {
  insert_attachments_one(
    object: {name: $name, size: $size, filePath: $filePath, createdUserId: $createdUserId}
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
    `;
export type CreateAttachmentMutationFn = Apollo.MutationFunction<CreateAttachmentMutation, CreateAttachmentMutationVariables>;

/**
 * __useCreateAttachmentMutation__
 *
 * To run a mutation, you first call `useCreateAttachmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAttachmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAttachmentMutation, { data, loading, error }] = useCreateAttachmentMutation({
 *   variables: {
 *      name: // value for 'name'
 *      size: // value for 'size'
 *      filePath: // value for 'filePath'
 *      createdUserId: // value for 'createdUserId'
 *   },
 * });
 */
export function useCreateAttachmentMutation(baseOptions?: Apollo.MutationHookOptions<CreateAttachmentMutation, CreateAttachmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAttachmentMutation, CreateAttachmentMutationVariables>(CreateAttachmentDocument, options);
      }
export type CreateAttachmentMutationHookResult = ReturnType<typeof useCreateAttachmentMutation>;
export type CreateAttachmentMutationResult = Apollo.MutationResult<CreateAttachmentMutation>;
export type CreateAttachmentMutationOptions = Apollo.BaseMutationOptions<CreateAttachmentMutation, CreateAttachmentMutationVariables>;
export const DeleteAttachmentDocument = gql`
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
    `;
export type DeleteAttachmentMutationFn = Apollo.MutationFunction<DeleteAttachmentMutation, DeleteAttachmentMutationVariables>;

/**
 * __useDeleteAttachmentMutation__
 *
 * To run a mutation, you first call `useDeleteAttachmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAttachmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAttachmentMutation, { data, loading, error }] = useDeleteAttachmentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAttachmentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAttachmentMutation, DeleteAttachmentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAttachmentMutation, DeleteAttachmentMutationVariables>(DeleteAttachmentDocument, options);
      }
export type DeleteAttachmentMutationHookResult = ReturnType<typeof useDeleteAttachmentMutation>;
export type DeleteAttachmentMutationResult = Apollo.MutationResult<DeleteAttachmentMutation>;
export type DeleteAttachmentMutationOptions = Apollo.BaseMutationOptions<DeleteAttachmentMutation, DeleteAttachmentMutationVariables>;
export const GetUsersDocument = gql`
    query GetUsers {
  users {
    _id
    name
    description
    email
    iconImageId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($id: uuid!) {
  users_by_pk(_id: $id) {
    _id
    name
    description
    email
    iconImageId
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($name: String!, $description: String!, $email: String!, $iconImageId: uuid!) {
  insert_users_one(
    object: {name: $name, description: $description, email: $email, iconImageId: $iconImageId}
  ) {
    _id
    name
    description
    email
    iconImageId
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
 *      description: // value for 'description'
 *      email: // value for 'email'
 *      iconImageId: // value for 'iconImageId'
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
    mutation DeleteUser($id: uuid!) {
  delete_users_by_pk(_id: $id) {
    _id
    name
    description
    email
    iconImageId
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
 *      id: // value for 'id'
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
    mutation UpdateUser($id: uuid!, $name: String, $description: String, $email: String, $iconImageId: uuid) {
  update_users_by_pk(
    pk_columns: {_id: $id}
    _set: {name: $name, description: $description, email: $email, iconImageId: $iconImageId}
  ) {
    _id
    name
    description
    email
    iconImageId
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
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      email: // value for 'email'
 *      iconImageId: // value for 'iconImageId'
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
