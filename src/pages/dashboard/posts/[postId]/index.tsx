import {
  Box,
  Image,
  Input,
  Spinner,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import axios from 'axios'
import cuid from 'cuid'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { TagModal } from '~/components/domains/tag/TagModal'
import {
  Button,
  IconButton,
  SolidIcon,
  Tag,
  Text,
} from '~/components/parts/commons'
import { useToast } from '~/hooks'
import { initializeApollo } from '~/lib/apolloClient'
import { GET_CURRENT_USER, GET_POST_BY_ID } from '~/queries'
import {
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  GetPostQuery,
  GetPostQueryVariables,
  Post,
  PostCategory,
  Tag as TagType,
  useCreateTagPostRelationsMutation,
  useDeleteTagPostRelationsMutation,
  useGetPostQuery,
  useGetTagPostRelationsQuery,
  User,
  useUpdatePostMutation,
} from '~/types/generated/graphql'

const client = initializeApollo()

const ONE_MB = 10000000

type Props = {
  currentUser: User
}

const UpdatePostPage: NextPage<Props> = () => {
  const router = useRouter()
  const postId = router.query.postId as string

  const { toast } = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [isUploading, setIsUploading] = useState(false)
  const [postTags, setPostTags] = useState<TagType[]>([])

  const handlePostTags = (tags: TagType[]) => {
    setPostTags(tags)
  }

  const [newPost, setNewPost] = useState<
    Pick<Post, 'title' | 'content' | 'category' | 'isPrivate' | 'bgImage'>
  >({
    title: '',
    content: '',
    category: PostCategory.GiveYou,
    isPrivate: false,
    bgImage: undefined,
  })

  const postCategoryList: { name: string; value: keyof typeof PostCategory }[] =
    [
      { name: '出来ること', value: 'GiveYou' },
      { name: 'してほしいこと', value: 'GiveMe' },
    ]

  const updatePost = (newObject: Partial<Post>) => {
    setNewPost((prevState) => {
      return {
        ...prevState,
        ...newObject,
      }
    })
  }

  const { data: tagPostData } = useGetTagPostRelationsQuery({
    variables: {
      postId: postId,
    },
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    setPostTags(
      tagPostData
        ? tagPostData.GetTagPostRelations.map(
            (tagPostRelation) => tagPostRelation.tag
          )
        : []
    )
  }, [tagPostData])

  const { data: postData } = useGetPostQuery({
    variables: {
      getPostId: postId,
    },
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (!postData?.getPost) return
    setNewPost({
      title: postData.getPost.title,
      content: postData.getPost.content,
      category: postData.getPost.category,
      isPrivate: postData.getPost.isPrivate,
      bgImage: postData.getPost.bgImage,
    })
  }, [postData])

  const [updatePostMutation] = useUpdatePostMutation({
    variables: {
      updatePostId: postId,
      ...newPost,
    },
    refetchQueries: ['GetPost'],
  })

  const [deleteTagPostRelationsMutation] = useDeleteTagPostRelationsMutation({
    refetchQueries: ['GetTagPostRelations'],
  })

  const [createTagPostRelationsMutation] = useCreateTagPostRelationsMutation({
    refetchQueries: ['GetTagPostRelations'],
  })

  const handleDeleteTag = async (tagId: string) => {
    setPostTags(postTags.filter((tag) => tag.id !== tagId))
  }

  const handleUpdatePost = useCallback(async () => {
    try {
      const { data: postData } = await updatePostMutation()

      if (!postData) return

      // 紐づいているTagPostRelationを一旦全て削除してから、新しいTagPostRelationを作成する
      await deleteTagPostRelationsMutation({
        variables: {
          tagPostTypes: tagPostData
            ? tagPostData.GetTagPostRelations.map((tagPostRelation) => {
                return {
                  tagId: tagPostRelation.tag.id,
                  postId: tagPostRelation.post.id,
                }
              })
            : [],
        },
      })
      await createTagPostRelationsMutation({
        variables: {
          postId,
          tagIds: postTags.map((postTag) => postTag.id),
        },
      })

      toast({ title: '投稿が更新されました！', status: 'success' })
      router.push(`/post/${postId}`)
    } catch (err) {
      toast({ title: '投稿の更新に失敗しました', status: 'error' })
    }
  }, [
    toast,
    router,
    updatePostMutation,
    createTagPostRelationsMutation,
    deleteTagPostRelationsMutation,
    tagPostData,
    postId,
    postTags,
  ])

  const uploadFIle = useCallback(
    async (file: File) => {
      setIsUploading(true)

      if (file.size > ONE_MB) {
        setIsUploading(false)
        toast({
          title: '10MBを超えるファイルをアップロードすることは出来ません',
          status: 'error',
        })
        return
      }

      try {
        const uniqueFileName = `${cuid()}/${file.name}`
        const res = await axios.post(
          `${
            process.env.NEXT_PUBLIC_ROOT_URL || 'http://localhost:3000'
          }/api/signedUrl?fileName=${uniqueFileName}`
        )
        const signed_url = res.data[0]

        await axios.put(signed_url, file, {
          headers: {
            'Content-Type': 'application/octet-stream',
          },
        })
        updatePost({
          bgImage: `https://storage.googleapis.com/${
            process.env.GCP_BUCKET_ID || 'desii-dev'
          }/${uniqueFileName}`,
        })
      } catch (error) {
        toast({ title: '画像のアップロードに失敗しました！', status: 'error' })
      } finally {
        setIsUploading(false)
      }
    },
    [toast]
  )

  const handleUploadFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0]
    await uploadFIle(file)
    e.target.value = ''
  }

  return (
    <Box p={['28px 10px 0', '40px 20px 0']}>
      <Box mx="auto" maxW="700px">
        <Box mb="32px">
          <Box mb="12px">
            <Text fontSize="md" isBold>
              タイトル
            </Text>
          </Box>
          <Input
            bgColor="white.main"
            boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
            value={newPost.title}
            onChange={(e) => updatePost({ title: e.target.value })}
          />
        </Box>
        <Box mb="32px">
          <Box mb="12px">
            <Text fontSize="md" isBold>
              本文
            </Text>
          </Box>
          <Textarea
            bgColor="white.main"
            boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
            rows={12}
            value={newPost.content}
            onChange={(e) => updatePost({ content: e.target.value })}
          />
        </Box>
        <Box mb="32px">
          <Box mb="12px">
            <Text fontSize="md" isBold>
              カテゴリー
            </Text>
          </Box>
          <Box
            p="8px 12px"
            bgColor="white.main"
            display="flex"
            alignItems="center"
            boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
            borderRadius="8px"
            cursor="pointer"
            gap="4px"
          >
            {postCategoryList.map((category, i) => {
              const isSelected =
                newPost.category === PostCategory[category.value]
              return (
                <Box
                  key={i}
                  w="100%"
                  p="16px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius="16px"
                  bgColor={isSelected ? 'orange.main' : 'white.main'}
                  boxShadow={
                    isSelected ? '0 3px 6px rgba(0, 0, 0, 0.16)' : 'none'
                  }
                  cursor={isSelected ? 'auto' : 'pointer'}
                  onClick={() =>
                    updatePost({ category: PostCategory[category.value] })
                  }
                >
                  <Text
                    fontSize="lg"
                    isBold
                    color={isSelected ? 'white.main' : 'text.main'}
                  >
                    {category.name}
                  </Text>
                </Box>
              )
            })}
          </Box>
        </Box>
        <Box mb="32px">
          <Box mb="12px">
            <Text fontSize="md" isBold>
              マッチングタグ
            </Text>
          </Box>
          <Button isFullWidth onClick={onOpen}>
            <Text fontSize="md" color="text.light">
              タグを検索、または作成する
            </Text>
          </Button>
          <TagModal
            isOpen={isOpen}
            onClose={onClose}
            postTags={postTags}
            setPostTags={handlePostTags}
          />
          <Box mt="12px" display="flex" flexWrap="wrap" gap="8px">
            {postTags.map((tag, i) => (
              <Tag
                text={tag.name}
                key={i}
                canDelete
                onClose={() => handleDeleteTag(tag.id)}
              />
            ))}
          </Box>
        </Box>
        <Box mb="56px">
          <Box mb="12px">
            <Text fontSize="md" isBold>
              背景画像
            </Text>
          </Box>
          {newPost.bgImage ? (
            <Box position="relative">
              <Box position="absolute" top="4px" left="4px">
                <IconButton
                  icon={<SolidIcon icon="SOLID_X" size={16} />}
                  size="xs"
                  label="x"
                  isRound
                  onClick={() => updatePost({ bgImage: undefined })}
                />
              </Box>
              <Image
                src={newPost.bgImage}
                alt="投稿の背景画像"
                objectFit="cover"
                w="300px"
                h="158px"
              />
            </Box>
          ) : (
            <IconButton
              icon={
                <StyledLabel htmlFor="image">
                  <SolidIcon icon="SOLID_PHOTOGRAPH" />
                  <Box display="none">
                    <input
                      type="file"
                      name="image"
                      id="image"
                      onChange={handleUploadFile}
                      accept="image/*"
                    />
                  </Box>
                  {isUploading && <Spinner />}
                </StyledLabel>
              }
              label="PHOTOGRAPH"
              isRound
            />
          )}
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-evenly">
          <Button onClick={() => router.push('/dashboard/posts')}>
            キャンセル
          </Button>
          <Button
            onClick={handleUpdatePost}
            disabled={
              newPost.title.trim().length === 0 ||
              newPost.content.trim().length === 0
            }
          >
            更新する
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

const StyledLabel = styled('label')`
  cursor: pointer;
`

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const session = await getSession(ctx)
    const postId = ctx.params?.postId as string | undefined

    const {
      data: { getCurrentUser },
    } = await client.query<GetCurrentUserQuery, GetCurrentUserQueryVariables>({
      query: GET_CURRENT_USER,
      variables: {
        accessToken: session?.accessToken || '',
      },
    })

    const {
      data: { getPost },
    } = await client.query<GetPostQuery, GetPostQueryVariables>({
      query: GET_POST_BY_ID,
      variables: {
        getPostId: postId || '',
      },
      fetchPolicy: 'network-only',
    })

    if (!getCurrentUser || !getPost) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    if (getCurrentUser.id !== getPost.createdUserId) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    return {
      props: {
        currentUser: getCurrentUser,
      },
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }
}

export default UpdatePostPage
