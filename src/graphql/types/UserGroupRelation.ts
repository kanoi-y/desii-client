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
      resolve(_parent, args, ctx) {
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

// export const DeleteGroupMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('deleteGroup', {
//       type: 'Group',
//       args: {
//         id: nonNull(stringArg()),
//       },
//       async resolve(_parent, args, ctx) {
//         if (!ctx.user) {
//           throw new Error('ログインユーザーが存在しません')
//         }

//         const group = await ctx.prisma.group.findUnique({
//           where: {
//             id: args.id,
//           },
//         })

//         if (!group) {
//           throw new Error('グループが存在しません')
//         }

//         if (ctx.user.id !== group.adminUserId) {
//           throw new Error('ユーザーがチームの管理者ではありません')
//         }
//         return ctx.prisma.group.delete({
//           where: {
//             id: args.id,
//           },
//         })
//       },
//     })
//   },
// })

// export const UpdateGroupMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('updateGroup', {
//       type: 'Group',
//       args: {
//         id: nonNull(stringArg()),
//         name: stringArg(),
//         description: stringArg(),
//         image: stringArg(),
//         adminUserId: stringArg(),
//       },
//       async resolve(_parent, args, ctx) {
//         if (!ctx.user) {
//           throw new Error('ログインユーザーが存在しません')
//         }

//         const group = await ctx.prisma.group.findUnique({
//           where: {
//             id: args.id,
//           },
//         })

//         if (!group) {
//           throw new Error('グループが存在しません')
//         }

//         if (ctx.user.id !== group.adminUserId) {
//           throw new Error('ユーザーがチームの管理者ではありません')
//         }

//         const updateGroup = {
//           name: args.name || group.name,
//           description: args.description || group.description,
//           image: args.image || group.image,
//           adminUserId: args.adminUserId || group.adminUserId,
//         }

//         return ctx.prisma.group.update({
//           where: {
//             id: args.id,
//           },
//           data: updateGroup,
//         })
//       },
//     })
//   },
// })
