import {
  EditIcon,
  HamburgerIcon,
  SettingsIcon,
  StarIcon,
} from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import { action } from '@storybook/addon-actions'
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
    {
      text: '投稿の管理',
      icon: <EditIcon />,
      onClick: action('投稿の管理'),
    },
    {
      text: 'いいねした投稿',
      icon: <StarIcon />,
      onClick: action('いいねした投稿'),
    },
    {
      text: 'アカウント設定',
      icon: <SettingsIcon />,
      onClick: action('アカウント設定'),
    },
  ],
}
