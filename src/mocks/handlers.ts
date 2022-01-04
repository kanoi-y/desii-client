import { graphql } from 'msw'
import { attachmentsFactory } from './factories/attachmentFactory'

export const handlers = [
  graphql.query('GetAttachmentById', (req, res, ctx) => {
    const { id } = req.variables

    return res(
      ctx.data({
        attachments_by_pk: {
          ...attachmentsFactory({ _id: id }),
        },
      })
    )
  }),
]
