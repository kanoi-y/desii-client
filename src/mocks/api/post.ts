import { postFactory } from '../factories'

export const getPost = (req: any, res: any, ctx: any) => {
  const { getPostId } = req.variables
  return res(
    ctx.data({
      getPost: {
        ...postFactory({ id: getPostId }),
      },
    })
  )
}
