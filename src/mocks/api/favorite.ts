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

export const createFavorite = (req: any, res: any, ctx: any) => {
  const { postId } = req.variables
  return res(
    ctx.data({
      createFavorite: {
        ...favoriteFactory({ postId }),
      },
    })
  )
}

export const deleteFavorite = (req: any, res: any, ctx: any) => {
  const { postId } = req.variables
  return res(
    ctx.data({
      DeleteFavorite: {
        ...favoriteFactory({ postId }),
      },
    })
  )
}
