import { Box, Input, Textarea, useDisclosure } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { FormEvent, useState } from 'react'
import { Button, Modal, OutlineIcon, Tag, Text } from '~/components/parts/commons'
import { useToast } from '~/hooks'
import { initializeApollo } from '~/lib/apolloClient'
import { GET_CURRENT_USER } from '~/queries'
import { theme } from '~/theme'
import {
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  Post,
  PostCategory,
  useCreateTagMutation,
  User,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  currentUser: User
}

const NewPostPage: NextPage<Props> = ({ currentUser }) => {
  const router = useRouter()
  const { toast } = useToast()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [value, setValue] = useState('')
  const [postTags, setPostTags] = useState<{ name: string }[]>([])
  const [newPost, setNewPost] = useState<
    Pick<Post, 'title' | 'content' | 'category' | 'isPrivate'>
  >({
    title: '',
    content: '',
    category: PostCategory.GiveYou,
    isPrivate: false,
  })

  const updatePost = (newObject: Partial<Post>) => {
    setNewPost((prevState) => {
      return {
        ...prevState,
        ...newObject,
      }
    })
  }

  // TODO: refetchQueriesを追加する
  const [createTagMutation] = useCreateTagMutation()

  const handleAddTag = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (value === '') return
    setPostTags([...postTags, { name: value }])
    setValue('')
  }

  const handleDeleteTag = (index: number) => {
    setPostTags(postTags.filter((tag, i) => i !== index))
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
            rows={10}
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
            <CategoryWrap
              isSelected={newPost.category === PostCategory.GiveYou}
              onClick={() => updatePost({ category: PostCategory.GiveYou })}
            >
              <Text fontSize="lg" isBold>
                出来ること
              </Text>
            </CategoryWrap>
            <CategoryWrap
              isSelected={newPost.category === PostCategory.GiveMe}
              onClick={() => updatePost({ category: PostCategory.GiveMe })}
            >
              <Text fontSize="lg" isBold>
                してほしいこと
              </Text>
            </CategoryWrap>
          </Box>
        </Box>
        <Box mb="48px">
          <Box mb="12px">
            <Text fontSize="md" isBold>
              マッチングタグ
            </Text>
          </Box>
          <Input
            bgColor="white.main"
            boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
            onClick={onOpen}
          />
          <Modal
            title="タグを追加する"
            isOpen={isOpen}
            onClose={onClose}
            body={
              <Box
                borderTop={`1px solid ${theme.colors.secondary.main}`}
                pt="12px"
                mt="-8px"
              >
                <form onSubmit={(e) => handleAddTag(e)}>
                  <Input
                    bgColor="secondary.light"
                    boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </form>
                <Box overflow="auto" mt="12px">
                  <Box
                    borderTop={`1px solid ${theme.colors.secondary.main}`}
                    borderRadius="4px"
                    p="8px 0 8px 24px"
                    cursor="pointer"
                    _hover={{
                      bgColor: 'secondary.main',
                    }}
                  >
                    <OutlineIcon icon="OUTLINE_CHECK" />
                    リンゴ
                  </Box>
                  <Box
                    borderTop={`1px solid ${theme.colors.secondary.main}`}
                    borderRadius="4px"
                    p="8px 0 8px 24px"
                    cursor="pointer"
                    _hover={{
                      bgColor: 'secondary.main',
                    }}
                  >
                    バナナ
                  </Box>
                  <Box
                    borderTop={`1px solid ${theme.colors.secondary.main}`}
                    borderRadius="4px"
                    p="8px 0 8px 24px"
                    cursor="pointer"
                    _hover={{
                      bgColor: 'secondary.main',
                    }}
                  >
                    メロン
                  </Box>
                </Box>
              </Box>
            }
          />
          <Box mt="12px" display="flex" flexWrap="wrap" gap="8px">
            {postTags.map((tag, i) => (
              <Tag
                text={tag.name}
                key={i}
                canDelete
                onClose={() => handleDeleteTag(i)}
              />
            ))}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-evenly">
          <Button onClick={() => router.push('/dashboard')}>キャンセル</Button>
          <Button>作成する</Button>
        </Box>
      </Box>
    </Box>
  )
}

const CategoryWrap = styled(Box)<{ isSelected: boolean }>`
  width: 100%;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  ${({ isSelected }) =>
    isSelected &&
    `
  background-color: ${theme.colors.orange.main};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
  cursor: auto;
  > p {
    color: ${theme.colors.white.main}
  }

  `}
`

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const session = await getSession(ctx)

    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    const {
      data: { getCurrentUser },
    } = await client.query<GetCurrentUserQuery, GetCurrentUserQueryVariables>({
      query: GET_CURRENT_USER,
      variables: {
        accessToken: session.accessToken || '',
      },
    })

    if (!getCurrentUser) {
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

export default NewPostPage
