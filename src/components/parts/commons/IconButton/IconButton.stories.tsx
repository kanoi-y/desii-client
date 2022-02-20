import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { OutlineIcon } from '~/components/parts/commons'
import { IconButton } from './IconButton'

export default {
  title: 'parts/commons/IconButton',
  component: IconButton,
  argTypes: { onClick: { action: 'clickIconButton' } },
} as ComponentMeta<typeof IconButton>

const Template: ComponentStory<typeof IconButton> = ({ ...args }) => (
  <Box p="20px">
    <IconButton
      {...args}
      icon={<OutlineIcon icon="OUTLINE_HEART" size={16} />}
    />
    <IconButton
      {...args}
      icon={<OutlineIcon icon="OUTLINE_HEART" size={24} />}
    />
    <IconButton
      {...args}
      icon={<OutlineIcon icon="OUTLINE_HEART" size={32} />}
    />
    <IconButton
      {...args}
      icon={<OutlineIcon icon="OUTLINE_HEART" size={40} />}
    />
  </Box>
)

export const DefaultIconButton = Template.bind({})
DefaultIconButton.args = {
  label: 'DefaultIconButton',
  isLoading: false,
  isDisabled: false,
  bgColor: 'white.main'
}

export const LoadingIconButton = Template.bind({})
LoadingIconButton.args = {
  label: 'LoadingIconButton',
  isLoading: true,
  isDisabled: false,
  bgColor: 'white.main'
}

export const DisabledIconButton = Template.bind({})
DisabledIconButton.args = {
  label: 'DisabledIconButton',
  isLoading: false,
  isDisabled: true,
  bgColor: 'white.main'
}
