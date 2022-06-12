import { ApolloProvider } from '@apollo/client'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { initializeApollo } from '~/lib/apolloClient'
import { userFactory } from '~/mocks/factories'
import { RoomSidebar } from './RoomSidebar'

export default {
  title: 'parts/layout/RoomSidebar',
  component: RoomSidebar,
} as ComponentMeta<typeof RoomSidebar>

const Template: ComponentStory<typeof RoomSidebar> = ({ ...args }) => {
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      <RoomSidebar {...args} />
    </ApolloProvider>
  )
}

const mockUser = userFactory({ image: 'images/Desii_icon.png' })
export const DefaultRoomSidebar = Template.bind({})
DefaultRoomSidebar.args = {
  currentUser: mockUser,
}
