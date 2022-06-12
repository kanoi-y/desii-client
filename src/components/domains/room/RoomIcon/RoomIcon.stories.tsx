import { ApolloProvider } from '@apollo/client'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { initializeApollo } from '~/lib/apolloClient'
import { roomFactory } from '~/mocks/factories'
import { RoomIcon } from './RoomIcon'

export default {
  title: 'domains/room/RoomIcon',
  component: RoomIcon,
} as ComponentMeta<typeof RoomIcon>

const Template: ComponentStory<typeof RoomIcon> = ({ ...args }) => {
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      <RoomIcon {...args} />
    </ApolloProvider>
  )
}

const mockRoom = roomFactory()

export const DefaultRoomIcon = Template.bind({})
DefaultRoomIcon.args = {
  room: mockRoom,
  currentUserId: 'currentUserId',
  size: 'md',
}
