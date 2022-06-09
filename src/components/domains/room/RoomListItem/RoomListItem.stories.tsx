import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { initializeApollo } from '~/lib/apolloClient'
import { roomFactory } from '~/mocks/factories'
import { RoomListItem, SkeletonRoomListItem } from './RoomListItem'

export default {
  title: 'domains/room/RoomListItem',
  component: RoomListItem,
} as ComponentMeta<typeof RoomListItem>

const Template: ComponentStory<typeof RoomListItem> = ({ ...args }) => {
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      <Box>
        <RoomListItem {...args} />
        <RoomListItem {...args} />
        <RoomListItem {...args} />
      </Box>
    </ApolloProvider>
  )
}

const mockRoom = roomFactory()

export const RoomListItemRelatedByGroup = Template.bind({})
RoomListItemRelatedByGroup.args = {
  room: mockRoom,
  currentUserId: 'currentUserId',
}

const mockOneOnOneRoom = roomFactory({
  group: undefined,
})

export const OneOnOneRoomListItem = Template.bind({})
OneOnOneRoomListItem.args = {
  room: mockOneOnOneRoom,
  currentUserId: 'currentUserId',
}

const SkeletonTemplate: ComponentStory<typeof SkeletonRoomListItem> = () => {
  return (
    <Box>
      <SkeletonRoomListItem />
      <SkeletonRoomListItem />
      <SkeletonRoomListItem />
    </Box>
  )
}

export const Skeleton = SkeletonTemplate.bind({})
