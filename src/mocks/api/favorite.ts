import { favoriteFactory } from '../factories'

export const getFavorites = (req: any, res: any, ctx: any) => {
  const { postId } = req.variables
  return res(
    ctx.data({
      GetFavorites: [
        {
          ...favoriteFactory({ postId }),
        },
      ],
    })
  )
}
