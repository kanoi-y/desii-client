import { Box } from '@chakra-ui/react'
import { VFC } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Text } from '~/components/parts/commons'
import {
  Message,
  useGetReadManagementsQuery,
  useGetUserQuery,
} from '~/types/generated/graphql'

type Props = {
  message: Message
  currentUserId: string
}

// TODO: メッセージの作成者である場合とない場合を実装
// TODO: messageのtypeがTEXTとPOSTとMEDIAの場合を実装
// TODO: 既読を動的に表示
// TODO: readManagementのmockを作成する

export const MessageBubble: VFC<Props> = ({ message, currentUserId }) => {
  const isCreatedUser = message.userId === currentUserId

  const { data: userData } = useGetUserQuery({
    variables: {
      getUserId: message.userId,
    },
  })

  const { data: readManagementsData } = useGetReadManagementsQuery({
    variables: {
      messageId: message.id,
    },
  })

  const readManagementsCount =
    readManagementsData?.GetReadManagements.length || 0

  if (message.type === 'TEXT') {
    if (isCreatedUser) {
      return (
        <Box display="flex" alignItems="flex-end" gap="4px">
          <Box>
            {readManagementsCount > 0 && (
              <Text fontSize="xs" color="text.light">
                {`既読 ${readManagementsCount}`}
              </Text>
            )}
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
          {message.room.groupId && (
            <Box pl="8px">
              <Text fontSize="xs" color="text.light">
                {message.user.name}
              </Text>
            </Box>
          )}
          <Box p="8px 12px" borderRadius="12px" bgColor="white.main">
            <Text fontSize="md">{message.body}</Text>
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
