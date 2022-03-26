import { Storage } from '@google-cloud/storage'
import type { NextApiRequest, NextApiResponse } from 'next'

const signedUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const storage = new Storage({
    projectId: process.env.GCP_PROJECT_ID,
    credentials: {
      client_email: process.env.GCP_CLIENT_EMAIL,
      private_key: process.env.GCP_PRIVATE_KEY
        ? process.env.GCP_PRIVATE_KEY.replace(/\\n/g, '\n')
        : '',
    },
  })
  const options: {
    version?: 'v4' | 'v2'
    action: 'write' | 'read' | 'delete' | 'resumable'
    expires: number
    contentType: string
  } = {
    version: 'v4',
    action: 'write',
    expires: Date.now() + 15 * 60 * 1000,
    contentType: 'application/octet-stream',
  }
  const url = await storage
    .bucket(process.env.GCP_BUCKET_ID || '')
    .file(req.query.fileName as string)
    .getSignedUrl(options)
  res.send(url)
}

export default signedUrl
