import { Box } from '@chakra-ui/react'
import { VFC } from 'react'
import { Text } from '~/components/parts/commons'
import { Message } from '~/types/generated/graphql'

type Props = {
  message: Message
  currentUserId: string
}

// TODO: roomがグループに紐づいている場合、メッセージ作成者の名前を上に表示する
// TODO: メッセージの作成者である場合とない場合を実装
// TODO: messageのtypeがTEXTとPOSTとMEDIAの場合を実装

export const MessageBubble: VFC<Props> = ({ message, currentUserId }) => {
  const isCreatedUser = message.userId === currentUserId

  if (isCreatedUser) {
    return (
      <Box display="flex" alignItems="center">
        <Box>
          <Text fontSize="md">既読１</Text>
          <Text fontSize="md">12:34</Text>
        </Box>
        <Box>
          <Text fontSize="lg">{message.body}</Text>
        </Box>
      </Box>
    )
  }

  return <Box></Box>
}
