import { ApolloProvider } from '@apollo/client'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { initializeApollo } from '~/lib/apolloClient'
import { roomFactory } from '~/mocks/factories'
import { RoomName } from './RoomName'

export default {
  title: 'domains/room/RoomName',
  component: RoomName,
} as ComponentMeta<typeof RoomName>

const Template: ComponentStory<typeof RoomName> = ({ ...args }) => {
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      <RoomName {...args} />
    </ApolloProvider>
  )
}

const mockRoom = roomFactory()

export const DefaultRoomName = Template.bind({})
DefaultRoomName.args = {
  room: mockRoom,
  currentUserId: 'currentUserId',
  size: 'md',
}
