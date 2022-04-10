import { Box, SkeletonText } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { MouseEvent, useCallback, useMemo, VFC } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { SolidIcon, Text } from '~/components/parts/commons'
import {
  Notification,
  NotificationType,
  useGetUserQuery,
  useUpdateNotificationMutation,
} from '~/types/generated/graphql'
import { formatDistanceToNow } from '~/utils/formatDistanceToNow'

type Props = {
  notification: Notification
}

export const SkeletonNotificationListItem: VFC = () => {
  return (
    <Box
      position="relative"
      padding="8px 16px"
      _hover={{ bgColor: 'secondary.light' }}
    >
      <Box display="flex" alignItems="flex-start" gap="8px">
        <GuestUserIcon />
        <Box pt="4px">
          <SkeletonText w="100px" noOfLines={2} />
        </Box>
      </Box>
    </Box>
  )
}

export const NotificationListItem: VFC<Props> = ({ notification }) => {
  const router = useRouter()

  const displayDate = formatDistanceToNow(new Date(notification.createdAt))

  const { data } = useGetUserQuery({
    variables: {
      getUserId: notification.createdUserId || '',
    },
  })

  const [updateNotificationMutation] = useUpdateNotificationMutation({
    variables: {
      updateNotificationId: notification.id,
      isChecked: true,
    },
  })

  const handleClickUserIcon = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.preventDefault()
      e.stopPropagation()

      router.push(`/user/${data?.getUser?.id}`)
    },
    [router, data]
  )

  const IconContent = useMemo(() => {
    if (notification.type === NotificationType.MatchPost) {
      return (
        <Box
          bgColor="primary.light"
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p="4px"
        >
          <SolidIcon icon="SOLID_HEART" color="red.main" size={40} />
        </Box>
      )
    }

    if (data?.getUser) {
      return (
        <Box onClick={handleClickUserIcon}>
          <UserIcon user={data.getUser} />
        </Box>
      )
    }

    return <GuestUserIcon />
  }, [notification.type, data, handleClickUserIcon])

  const handleClickItem = useCallback(() => {
    if (!notification.isChecked) {
      updateNotificationMutation()
    }
    router.push(
      `${
        (process.env.NEXT_PUBLIC_ROOT_URL || 'http://localhost:3000') +
        notification.url
      }`
    )
  }, [notification, router, updateNotificationMutation])

  return (
    <Box
      position="relative"
      padding="8px 16px"
      bgColor={notification.isChecked ? 'secondary.light' : 'unset'}
      _hover={{ bgColor: 'secondary.light' }}
      onClick={handleClickItem}
      cursor="pointer"
    >
      <Box display="flex" alignItems="flex-start" gap="8px">
        {IconContent}
        <Box>
          <Text fontSize="sm" isBold>
            {notification.message}
          </Text>
          <Text fontSize="xs">{displayDate}</Text>
        </Box>
      </Box>
    </Box>
  )
}
