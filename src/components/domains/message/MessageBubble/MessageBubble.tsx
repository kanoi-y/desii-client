import { Box } from '@chakra-ui/react'
import { VFC } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Text } from '~/components/parts/commons'
import { Message, useGetUserQuery } from '~/types/generated/graphql'

type Props = {
  message: Message
  currentUserId: string
}

// TODO: roomがグループに紐づいている場合、メッセージ作成者の名前を上に表示する
// TODO: メッセージの作成者である場合とない場合を実装
// TODO: messageのtypeがTEXTとPOSTとMEDIAの場合を実装
// TODO: 既読を動的に表示

export const MessageBubble: VFC<Props> = ({ message, currentUserId }) => {
  const isCreatedUser = message.userId === currentUserId

  const { data: userData } = useGetUserQuery({
    variables: {
      getUserId: message.userId,
    },
  })

  if (message.type === 'TEXT') {
    if (isCreatedUser) {
      return (
        <Box display="flex" alignItems="flex-end" gap="4px">
          <Box>
            <Text fontSize="xs" color="text.light">
              既読
            </Text>
            <Text fontSize="xs" color="text.light">
              {`${message.createdAt.getHours()}:${message.createdAt.getMinutes()}`}
            </Text>
          </Box>
          <Box p="8px 12px" borderRadius="12px" bgColor="primary.main">
            <Text fontSize="md" color="white.main">
              {message.body}
            </Text>
          </Box>
        </Box>
      )
    }
    return (
      <Box display="flex" alignItems="flex-end" gap="4px">
        {userData?.getUser ? (
          <UserIcon size="sm" user={userData.getUser} />
        ) : (
          <GuestUserIcon size="sm" />
        )}
        <Box>
          <Box pl="8px">
            <Text fontSize="xs" color="text.light">
              {message.user.name}
            </Text>
          </Box>
          <Box p="8px 12px" borderRadius="12px" bgColor="white.main">
            <Text fontSize="md">
              {message.body}
            </Text>
          </Box>
        </Box>
        <Text fontSize="xs" color="text.light">
          {`${message.createdAt.getHours()}:${message.createdAt.getMinutes()}`}
        </Text>
      </Box>
    )
  }
  if (message.type === 'MEDIA') {
    return <Box></Box>
  }
  return <Box></Box>
}
