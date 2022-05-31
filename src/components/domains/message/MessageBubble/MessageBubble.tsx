import { Box, Image } from '@chakra-ui/react'
import { VFC } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Text } from '~/components/parts/commons'
import {
  Message,
  useGetPostQuery,
  useGetReadManagementsQuery,
  useGetUserQuery,
} from '~/types/generated/graphql'
import { PostCard, SkeletonPostCard } from '../../post/PostCard'

type Props = {
  message: Message
  currentUserId: string
}

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

  const { data: postData } = useGetPostQuery({
    variables: {
      getPostId: message.body,
    },
  })

  const readManagementsCount =
    readManagementsData?.GetReadManagements.filter(
      (readManagement) => readManagement.isRead
    ).length || 0

  if (message.type === 'POST') {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box maxW="360px" w="100%" p="16px 16px 8px">
          {postData?.getPost ? (
            <PostCard post={postData.getPost} />
          ) : (
            <SkeletonPostCard />
          )}
        </Box>
        <Text fontSize="sm">{`${message.user.name}さんが投稿に応募しました`}</Text>
      </Box>
    )
  }

  if (isCreatedUser) {
    return (
      <Box
        display="flex"
        alignItems="flex-end"
        justifyContent="flex-end"
        gap="4px"
        w="100%"
      >
        <Box>
          {readManagementsCount > 0 && (
            <Text fontSize="xs" color="text.light">
              {`既読 ${message.room.groupId ? readManagementsCount : ''}`}
            </Text>
          )}
          {/* FIXME: new Dateする */}
          <Text fontSize="xs" color="text.light">
            {`${message.createdAt.getHours()}:${message.createdAt.getMinutes()}`}
          </Text>
        </Box>
        <Box
          p={message.type === 'TEXT' ? '8px 12px' : '0px'}
          borderRadius="12px"
          bgColor="primary.main"
          overflow="hidden"
          maxW="65%"
        >
          {message.type === 'TEXT' ? (
            <Text fontSize="md" color="white.main">
              {message.body}
            </Text>
          ) : (
            <Image src={message.body} alt="画像" maxH="200px" maxW="100%" />
          )}
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
        <Box
          p={message.type === 'TEXT' ? '8px 12px' : '0px'}
          borderRadius="12px"
          bgColor="white.main"
          overflow="hidden"
        >
          {message.type === 'TEXT' ? (
            <Text fontSize="md">{message.body}</Text>
          ) : (
            <Image src={message.body} alt="画像" maxH="200px" maxW="100%" />
          )}
        </Box>
      </Box>
      <Text fontSize="xs" color="text.light">
        {`${message.createdAt.getHours()}:${message.createdAt.getMinutes()}`}
      </Text>
    </Box>
  )
}
