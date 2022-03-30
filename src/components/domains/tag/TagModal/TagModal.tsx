import { Box, Input } from '@chakra-ui/react'
import { FormEvent, useCallback, useState, VFC } from 'react'
import { Modal, SolidIcon, Text } from '~/components/parts/commons'
import { useToast } from '~/hooks'
import { theme } from '~/theme'
import {
  OrderByType,
  TagPostRelation,
  useCreateTagMutation,
  useCreateTagPostRelationMutation,
  useDeleteTagPostRelationMutation,
  useGetAllTagsQuery,
} from '~/types/generated/graphql'

const MAX_TAGS = 5

type Props = {
  isOpen: boolean
  onClose: () => void
  postTags: TagPostRelation[]
  postId: string
}

export const TagModal: VFC<Props> = ({ isOpen, onClose, postTags, postId }) => {
  const [value, setValue] = useState('')
  const { toast } = useToast()

  const [createTagPostRelationMutation] = useCreateTagPostRelationMutation({
    refetchQueries: ['GetTagPostRelations'],
  })

  const [deleteTagPostRelationMutation] = useDeleteTagPostRelationMutation({
    refetchQueries: ['GetTagPostRelations'],
  })

  const [createTagMutation] = useCreateTagMutation({
    refetchQueries: ['GetAllTags'],
  })

  const { data } = useGetAllTagsQuery({
    variables: {
      sort: OrderByType.Desc,
      searchText: value,
    },
    fetchPolicy: 'cache-and-network',
  })

  const handleAddTag = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (value === '') return
      if (postTags.some((postTag) => postTag.tag.name === value)) return
      if (postTags.length >= MAX_TAGS) {
        toast({ title: 'タグは5つまでしか設定できません', status: 'warning' })
        return
      }
      if (!data) return

      const tag = data.getAllTags.find((tag) => tag.name === value)

      if (tag) {
        await createTagPostRelationMutation({
          variables: {
            tagId: tag.id,
            postId,
          },
        })
        setValue('')
        return
      }

      try {
        const { data: TagData } = await createTagMutation({
          variables: {
            name: value,
          },
        })
        if (!TagData) return
        await createTagPostRelationMutation({
          variables: {
            tagId: TagData.createTag.id,
            postId,
          },
        })
        setValue('')
      } catch (err) {
        toast({ title: 'タグの作成に失敗しました', status: 'error' })
      }
    },
    [
      data,
      postTags,
      toast,
      value,
      createTagMutation,
      createTagPostRelationMutation,
      postId,
    ]
  )

  const handleClickTagField = async (tagId: string) => {
    const res = postTags.find((postTag) => postTag.tag.id === tagId)

    if (res) {
      await deleteTagPostRelationMutation({
        variables: {
          tagId,
          postId,
        },
      })
      return
    }
    if (postTags.length >= MAX_TAGS) {
      toast({ title: 'タグは5つまでしか設定できません', status: 'warning' })
      return
    }
    await createTagPostRelationMutation({
      variables: {
        tagId,
        postId,
      },
    })
  }

  return (
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
          <Box mb="4px" pl="8px">
            <Text fontSize="sm" isBold>
              タグは、５つまで選択可能
            </Text>
          </Box>
          <form onSubmit={(e) => handleAddTag(e)}>
            <Input
              bgColor="secondary.light"
              boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="タグを検索、または作成する"
            />
          </form>
          <Box mt="16px">
            {data?.getAllTags &&
              data.getAllTags.map((tag) => (
                <Box
                  key={tag.id}
                  borderTop={`1px solid ${theme.colors.secondary.main}`}
                  borderRadius="4px"
                  p="8px 0"
                  cursor="pointer"
                  display="flex"
                  alignItems="center"
                  gap="4px"
                  _hover={{
                    bgColor: 'secondary.main',
                  }}
                  onClick={() => handleClickTagField(tag.id)}
                >
                  <Box
                    pl="4px"
                    visibility={
                      postTags.some((pTag) => pTag.tag.id === tag.id)
                      ? 'visible'
                      : 'hidden'
                    }
                  >
                    <SolidIcon icon="SOLID_CHECK" />
                  </Box>
                  {tag.name}
                </Box>
              ))}
          </Box>
        </Box>
      }
    />
  )
}
