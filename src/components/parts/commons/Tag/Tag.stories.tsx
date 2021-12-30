import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { Tag } from './Tag'

export default {
  title: 'parts/commons/Tag',
  component: Tag,
  argTypes: { onClose: { action: 'closeTag' } },
} as ComponentMeta<typeof Tag>

const Template: ComponentStory<typeof Tag> = ({ text, size, ...args }) => (
  <Box>
    <Tag text="Default Text" size="sm" {...args} />
    <Tag text="Default Text" size="md" {...args} />
    <Tag text="Default Text" size="lg" {...args} />
  </Box>
)

export const DefaultTag = Template.bind({})

export const CanCloseTag = Template.bind({})
CanCloseTag.args = {
  canDelete: true,
}
