import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { Link } from './Link'

export default {
  title: 'parts/commons/Link',
  component: Link,
} as ComponentMeta<typeof Link>

const Template: ComponentStory<typeof Link> = ({ ...args }) => (
  <Box p="20px">
    <Link {...args}>Linkのテキスト</Link>
  </Box>
)

export const Default = Template.bind({})
Default.args = {
  href: '/',
}
