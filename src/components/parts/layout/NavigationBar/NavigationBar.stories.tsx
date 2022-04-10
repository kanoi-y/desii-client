import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { userFactory } from '~/mocks/factories'
import { Component } from './NavigationBar'

export default {
  title: 'parts/layout/NavigationBar',
  component: Component,
  argTypes: { onClickButton: { action: 'onClickButton' } },
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = ({ ...args }) => {
  return (
    <Box>
      <Component {...args} />
    </Box>
  )
}

const mockUser = userFactory({ image: 'images/Desii_icon.png' })

export const DefaultNavigationBar = Template.bind({})
DefaultNavigationBar.args = {
  isLoading: false,
  uncheckCount: 0,
}

export const GuestNavigationBar = Template.bind({})
GuestNavigationBar.args = {
  isLoading: true,
  uncheckCount: 0,
}

export const UserIconNavigationBar = Template.bind({})
UserIconNavigationBar.args = {
  isLoading: false,
  currentUser: mockUser,
  uncheckCount: 10,
}
