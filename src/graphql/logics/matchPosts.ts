import { Post, Tag, TagPostRelation, User } from '@prisma/client'
import { prisma } from '../../lib/prisma'

export const matchPosts = async (
  tagPostRelations: (TagPostRelation & {
    post: Post
    tag: Tag
  })[],
  post: Post,
  user: User
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
          return prisma.tagPostRelation.findMany({
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
      user.id !== tagPostRelation.post.createdUserId &&
      post.category !== tagPostRelation.post.category
    ) {
      matchingPostsInfo.push({ count: 1, post: tagPostRelation.post })
    }
  })

  return matchingPostsInfo
}
