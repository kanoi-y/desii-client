import { arg, extendType, nonNull, objectType, stringArg } from 'nexus'

export const Attachment = objectType({
  name: 'Attachment',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('name')
    t.nonNull.string('filePath')
    t.nonNull.string('createdUserId')
    t.nonNull.field('createdAt', {
      type: 'DateTime',
    })
    t.nonNull.field('updatedAt', {
      type: 'DateTime',
    })
  },
})

export const GetAttachmentByIdQuery = extendType({
  type: 'Query',
  definition(t) {
    t.field('GetAttachmentById', {
      type: 'Attachment',
      args: {
        id: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.attachment.findUnique({
          where: {
            id: args.id,
          },
        })
      },
    })
  },
})

// export const CreateAttachmentMutation = extendType({
//   type: 'Mutation',
//   definition(t) {
//     t.nonNull.field('createAttachment', {
//       type: 'Attachment',
//       args: {
//         file: nonNull(arg({ type: 'Upload' })),
//       },
//       async resolve(_parent, args, ctx) {
//         if (!ctx.user) {
//           throw new Error('ログインユーザーが存在しません')
//         }

//         const { filename, createReadStream } = await args.file
//         if (!filename) {
//           throw new Error('filenameが存在しません')
//         }

//         const file = await createReadStream();

//         return ctx.prisma.attachment.create({
//           data: {
//             createdUserId: ctx.user.id,
//           },
//         })
//       },
//     })
//   },
// })
