import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { initializeApollo } from '~/lib/apolloClient'
import { RoomListItem } from './RoomListItem'

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

// TODO: mockのroomを作成

export const DefaultRoomListItem = Template.bind({})
