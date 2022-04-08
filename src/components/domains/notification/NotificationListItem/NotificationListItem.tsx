import { Box } from '@chakra-ui/react'
import { VFC } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Link, SolidIcon, Text } from '~/components/parts/commons'
import {
  Notification,
  NotificationType,
  useGetUserQuery,
} from '~/types/generated/graphql'
import { formatDistanceToNow } from '~/utils/formatDistanceToNow'

type Props = {
  notification: Notification
}

export const NotificationListItem: VFC<Props> = ({ notification }) => {
  const displayDate = formatDistanceToNow(new Date(notification.createdAt))

  const { data } = useGetUserQuery({
    variables: {
      getUserId: notification.createdUserId || '',
    },
  })

  if (notification.type === NotificationType.MatchPost) {
    return (
      <Link
        href={
          process.env.NEXT_PUBLIC_ROOT_URL ||
          'http://localhost:3000' + notification.url
        }
      >
        <Box padding="8px 16px">
          <Box display="flex" alignItems="center">
            <SolidIcon icon="SOLID_HEART" color="red.main" size={36} />
            <Text fontSize="sm">{notification.message}</Text>
          </Box>
          <Text fontSize="xs">{displayDate}</Text>
        </Box>
      </Link>
    )
  }
  return (
    <Box position="relative" padding="8px 16px">
      <Box
        position="absolute"
        display="block"
        top="0px"
        left="0px"
        width="100%"
        height="100%"
      >
        <Link
          href={
            process.env.NEXT_PUBLIC_ROOT_URL ||
            'http://localhost:3000' + notification.url
          }
        ></Link>
      </Box>
      <Box display="flex" alignItems="center">
        {data?.getUser ? (
          <UserIcon user={data.getUser} isLink />
        ) : (
          <GuestUserIcon size="sm" />
        )}
        <Text fontSize="sm">{notification.message}</Text>
      </Box>
      <Text fontSize="xs">{displayDate}</Text>
    </Box>
  )
}
