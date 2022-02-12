import { UserGroupRelation as UserGroupRelationType } from '@prisma/client'
import { extendType, nonNull, objectType, stringArg } from 'nexus'

export const UserGroupRelation = objectType({
  name: 'UserGroupRelation',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('userId')
    t.nonNull.string('groupId')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const GetUserGroupRelationsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('GetUserGroupRelations', {
      type: 'UserGroupRelation',
      args: {
        userId: stringArg(),
        groupId: stringArg(),
      },
      resolve(_parent, args, ctx) {
        const query: Partial<UserGroupRelationType> = {}
        if (args.userId) query.userId = args.userId
        if (args.groupId) query.groupId = args.groupId

        return ctx.prisma.userGroupRelation.findMany({
          where: query,
        })
      },
    })
  },
})

export const CreateUserGroupRelationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUserGroupRelation', {
      type: 'UserGroupRelation',
      args: {
        userId: nonNull(stringArg()),
        groupId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const user = await ctx.prisma.user.findUnique({
          where: {
            id: args.userId,
          },
        })

        const group = await ctx.prisma.group.findUnique({
          where: {
            id: args.groupId,
          },
        })

        if (!user || !group) {
          throw new Error('ユーザー、またはグループが存在しません')
        }

        if (ctx.user.id !== group.adminUserId) {
          throw new Error('管理者ユーザーしかユーザーを追加できません')
        }

        return ctx.prisma.userGroupRelation.create({
          data: {
            userId: args.userId,
            groupId: args.groupId,
          },
        })
      },
    })
  },
})

export const DeleteUserGroupRelationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('DeleteUserGroupRelation', {
      type: 'UserGroupRelation',
      args: {
        userId: nonNull(stringArg()),
        groupId: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const userGroupRelation = await ctx.prisma.userGroupRelation.findUnique(
          {
            where: {
              relationId: {
                userId: args.userId,
                groupId: args.groupId,
              },
            },
          }
        )

        if (!userGroupRelation) {
          throw new Error('userGroupRelationが存在しません')
        }

        const group = await ctx.prisma.group.findUnique({
          where: {
            id: userGroupRelation.groupId,
          },
        })

        if (!group) {
          throw new Error('グループが存在しません')
        }

        if (
          ctx.user.id !== userGroupRelation.userId &&
          ctx.user.id !== group.adminUserId
        ) {
          throw new Error(
            '管理者ユーザー以外は、自分以外のユーザーを削除することは出来ません'
          )
        }

        if (userGroupRelation.userId === group.adminUserId) {
          throw new Error(
            'グループからグループの管理者を削除することは出来ません'
          )
        }
        return ctx.prisma.userGroupRelation.delete({
          where: {
            relationId: {
              userId: args.userId,
              groupId: args.groupId,
            },
          },
        })
      },
    })
  },
})
