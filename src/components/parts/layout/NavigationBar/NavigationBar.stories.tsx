import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { initializeApollo } from '~/lib/apolloClient'
import { NavigationBar } from './NavigationBar'

export default {
  title: 'parts/layout/NavigationBar',
  component: NavigationBar,
} as ComponentMeta<typeof NavigationBar>

const Template: ComponentStory<typeof NavigationBar> = ({ ...args }) => {
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      <Box>
        <NavigationBar {...args} />
      </Box>
    </ApolloProvider>
  )
}

export const DefaultNavigationBar = Template.bind({})
DefaultNavigationBar.args = {
  isLogin: false,
}

export const GuestNavigationBar = Template.bind({})
GuestNavigationBar.args = {
  isLogin: true,
}

export const UserIconNavigationBar = Template.bind({})
UserIconNavigationBar.args = {
  isLogin: true,
  userName: 'desii',
  iconImageId: 'iconImageId',
}
