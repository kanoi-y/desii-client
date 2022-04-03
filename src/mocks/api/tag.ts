import { tagFactory } from '../factories'

const db = [
  tagFactory({ name: 'あああ' }),
  tagFactory({ name: 'いいい' }),
  tagFactory({ name: 'ううう' }),
  tagFactory({ name: 'えええ' }),
  tagFactory({ name: 'おおお' }),
]

export const getAllTags = (req: any, res: any, ctx: any) => {
  const { searchText } = req.variables

  const searchDb = db.filter((tag) => tag.name.includes(searchText as string))
  return res(
    ctx.data({
      getAllTags: searchDb,
    })
  )
}

export const createTag = (req: any, res: any, ctx: any) => {
  const { name } = req.variables
  return res(
    ctx.data({
      createTag: {
        ...tagFactory({ name }),
      },
    })
  )
}
