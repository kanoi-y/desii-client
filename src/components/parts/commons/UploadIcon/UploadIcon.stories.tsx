import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { UploadIcon } from './UploadIcon'

export default {
  title: 'parts/commons/UploadIcon',
  component: UploadIcon,
  argTypes: { onSelectImage: { action: 'onSelectImage' } },
} as ComponentMeta<typeof UploadIcon>

const Template: ComponentStory<typeof UploadIcon> = ({ ...args }) => (
  <Box p="20px">
    <UploadIcon {...args} />
  </Box>
)

export const DefaultUploadIcon = Template.bind({})
DefaultUploadIcon.args = {
  disabled: false,
  size: '2xl',
}

export const UploadIconWithImage = Template.bind({})
UploadIconWithImage.args = {
  currentImagePath: 'images/Desii_icon.png',
  size: '2xl',
}
