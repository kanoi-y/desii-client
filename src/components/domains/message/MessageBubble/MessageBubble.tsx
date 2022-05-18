import { Box, Image } from '@chakra-ui/react'
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

// TODO: messageのtypeがTEXTとPOSTとMEDIAの場合を実装

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
    readManagementsData?.GetReadManagements.filter(
      (readManagement) => readManagement.isRead
    ).length || 0

  if (message.type === 'TEXT') {
    if (isCreatedUser) {
      return (
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-start"
          gap="4px"
          w="100%"
        >
          <Box>
            {readManagementsCount > 0 && (
              <Text fontSize="xs" color="text.light">
                {`既読 ${message.room.groupId ? readManagementsCount : ''}`}
              </Text>
            )}
            <Text fontSize="xs" color="text.light">
              {`${message.createdAt.getHours()}:${message.createdAt.getMinutes()}`}
            </Text>
          </Box>
          <Box
            p="8px 12px"
            borderRadius="12px"
            bgColor="primary.main"
            maxW="65%"
          >
            <Text fontSize="md" color="white.main">
              {message.body}
            </Text>
          </Box>
        </Box>
      )
    }
    return (
      <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="flex-start"
        gap="4px"
        w="100%"
      >
        {userData?.getUser ? (
          <UserIcon size="sm" user={userData.getUser} />
        ) : (
          <GuestUserIcon size="sm" />
        )}
        <Box maxW="65%">
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
    if (isCreatedUser) {
      return (
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="flex-start"
          gap="4px"
          w="100%"
        >
          <Box>
            {readManagementsCount > 0 && (
              <Text fontSize="xs" color="text.light">
                {`既読 ${message.room.groupId ? readManagementsCount : ''}`}
              </Text>
            )}
            <Text fontSize="xs" color="text.light">
              {`${message.createdAt.getHours()}:${message.createdAt.getMinutes()}`}
            </Text>
          </Box>
          <Box borderRadius="12px" overflow="hidden" maxW="65%">
            <Image src={message.body} alt="画像" maxH="200px" maxW="100%" />
          </Box>
        </Box>
      )
    }
    return (
      <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="flex-start"
        gap="4px"
        w="100%"
      >
        {userData?.getUser ? (
          <UserIcon size="sm" user={userData.getUser} />
        ) : (
          <GuestUserIcon size="sm" />
        )}
        <Box maxW="65%">
          {message.room.groupId && (
            <Box pl="8px">
              <Text fontSize="xs" color="text.light">
                {message.user.name}
              </Text>
            </Box>
          )}
          <Box borderRadius="12px" overflow="hidden">
            <Image src={message.body} alt="画像" maxH="200px" maxW="100%" />
          </Box>
        </Box>
        <Text fontSize="xs" color="text.light">
          {`${message.createdAt.getHours()}:${message.createdAt.getMinutes()}`}
        </Text>
      </Box>
    )
  }
  return <Box></Box>
}
