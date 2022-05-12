import { Box } from '@chakra-ui/react'
import { VFC } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Message, useGetUserQuery } from '~/types/generated/graphql'

type Props = {
  message: Message
  currentUserId: string
}

// TODO: roomがグループに紐づいている場合、メッセージ作成者の名前を上に表示する
// TODO: メッセージの作成者である場合とない場合を実装
// TODO: messageのtypeがTEXTとPOSTとMEDIAの場合を実装

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
        <Box display="flex" alignItems="center" justifyContent="flex-start">
          <Box></Box>
        </Box>
      )
    }
    return (
      <Box display="flex" alignItems="center" justifyContent="flex-start">
        {userData?.getUser ? (
          <UserIcon user={userData.getUser} />
        ) : (
          <GuestUserIcon />
        )}
        <Box></Box>
      </Box>
    )
  }
  if (message.type === 'MEDIA') {
    return <Box></Box>
  }
  return <Box></Box>
}
