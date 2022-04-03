import { userFactory } from "../factories";


export const getUser = (req: any, res: any, ctx: any) => {
  const { getUserId } = req.variables
    return res(
      ctx.data({
        getUser: {
          ...userFactory({ id: getUserId, image: 'images/Desii_icon.png' }),
        },
      })
    )
};
