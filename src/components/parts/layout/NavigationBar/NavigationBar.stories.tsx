import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { NavigationBar } from './NavigationBar'

export default {
  title: 'parts/layout/NavigationBar',
  component: NavigationBar,
} as ComponentMeta<typeof NavigationBar>

const Template: ComponentStory<typeof NavigationBar> = ({ ...args }) => (
  <Box p="20px">
    <NavigationBar {...args} />
  </Box>
)

export const Default = Template.bind({})
Default.args = {
  isLogin: false,
}
