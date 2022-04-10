import { Post, Tag, TagPostRelation } from '@prisma/client'
import { Context } from '~/graphql/context'

export const matchPosts = async (
  ctx: Context,
  tagPostRelations: (TagPostRelation & {
    post: Post
    tag: Tag
  })[],
  post: Post
) => {
  const matchingPostsInfo: { count: number; post: Post }[] = []

  const res = (
    await Promise.all(
      tagPostRelations.map(
        (
          tagPostRelation: TagPostRelation & {
            tag: Tag
          }
        ) => {
          return ctx.prisma.tagPostRelation.findMany({
            where: {
              tagId: tagPostRelation.tag.id,
              NOT: {
                postId: post.id,
              },
            },
            include: {
              post: true,
            },
          })
        }
      )
    )
  ).flat()

  //FIXME: 処理が重くなってきたら修正する
  res.forEach((tagPostRelation) => {
    const index = matchingPostsInfo.findIndex(
      (matchingPostInfo: { count: number; post: Post }) =>
        matchingPostInfo.post.id === tagPostRelation.postId
    )

    if (index > -1) {
      matchingPostsInfo[index].count++
      return
    }

    if (
      ctx.user?.id !== tagPostRelation.post.createdUserId &&
      post.category !== tagPostRelation.post.category
    ) {
      matchingPostsInfo.push({ count: 1, post: tagPostRelation.post })
    }
  })

  return matchingPostsInfo
}
