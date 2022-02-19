import { EditIcon, HamburgerIcon, StarIcon, SettingsIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { Menu } from './Menu'

export default {
  title: 'parts/commons/Menu',
  component: Menu,
} as ComponentMeta<typeof Menu>

const Template: ComponentStory<typeof Menu> = ({ ...args }) => (
  <Box p="20px">
    <Menu {...args} />
  </Box>
)

export const DefaultMenu = Template.bind({})
DefaultMenu.args = {
  toggleItem: <HamburgerIcon />,
  menuList: [
    { text: '投稿の管理', icon: <EditIcon /> },
    { text: 'いいねした投稿', icon: <StarIcon /> },
    { text: 'アカウント設定', icon: <SettingsIcon /> },
  ],
}
