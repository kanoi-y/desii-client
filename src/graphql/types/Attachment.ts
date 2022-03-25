import { Storage } from '@google-cloud/storage'
import { FileUpload } from 'graphql-upload'
import { extendType, nonNull, objectType, stringArg } from 'nexus'

const storage = new Storage({
  projectId: process.env.GCP_PROJECT_ID,
  credentials: {
    client_email: process.env.GCP_CLIENT_EMAIL,
    private_key: process.env.GCP_PRIVATE_KEY
      ? process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n')
      : '',
  },
})

const bucket = storage.bucket(process.env.GCP_BUCKET_ID || '')

const checkFileSize = (
  createReadStream: FileUpload['createReadStream'],
  maxSize: number
) =>
  new Promise((resolves, rejects) => {
    let fileSize = 0
    let stream = createReadStream()
    stream.on('data', (chunk: Buffer) => {
      fileSize += chunk.length
      if (fileSize > maxSize) {
        rejects(fileSize)
      }
    })
    stream.on('end', () => resolves(fileSize))
    stream.on('error', rejects)
  })

const uploadToGoogleCloud = (
  createReadStream: FileUpload['createReadStream'],
  filename: string
): Promise<void> => {
  // step 1 - upload the file to Google Cloud Storage
  return new Promise((resolves, rejects) =>
    createReadStream()
      .pipe(
        bucket.file(filename).createWriteStream({
          resumable: false,
          gzip: true,
        })
      )
      .on('error', (err: any) => rejects(err)) // reject on error
      .on('finish', resolves)
  ) // resolve on finish
}

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

export const CreateAttachmentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createAttachment', {
      type: 'Attachment',
      args: {
        fileName: nonNull(stringArg()),
      },
      async resolve(_parent, args, ctx) {
        if (!ctx.user) {
          throw new Error('ログインユーザーが存在しません')
        }

        const filePath = `https://storage.googleapis.com/${process.env.GCP_BUCKET_ID}/${uniqueFilename}`
        return ctx.prisma.attachment.create({
          data: {
            name: args.fileName,
            filePath,
            createdUserId: ctx.user.id,
          },
        })
      },
    })
  },
})
