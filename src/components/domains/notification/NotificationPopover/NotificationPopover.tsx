import {
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import { VFC } from 'react'
import { SolidIcon } from '~/components/parts/commons'
import { useGetNotificationsQuery } from '~/types/generated/graphql'

type Props = {
  currentUserId: string
}

export const NotificationPopover: VFC<Props> = ({ currentUserId }) => {
  const { data } = useGetNotificationsQuery({
    variables: {
      targetUserId: currentUserId,
    },
  })

  return (
    <Popover>
      <PopoverTrigger>
        <SolidIcon icon="SOLID_BELL" size={24} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverCloseButton />
        <PopoverHeader>通知</PopoverHeader>
        <PopoverBody></PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
