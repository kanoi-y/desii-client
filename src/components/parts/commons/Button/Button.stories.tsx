import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { Button } from './Button'

export default {
  title: 'parts/commons/Button',
  component: Button,
  argTypes: { onClick: { action: 'clickButton' } },
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = ({ color, size, ...args }) => (
  <>
    <Box display="flex" gap="8px" mb="20px" flexWrap="wrap">
      <Button size="xs" {...args}>
        Button
      </Button>
      <Button size="xs" color="primary.main" {...args}>
        Button
      </Button>
      <Button size="xs" color="secondary.main" {...args}>
        Button
      </Button>
      <Button size="xs" color="error.main" {...args}>
        Button
      </Button>
    </Box>
    <Box display="flex" gap="8px" flexWrap="wrap" mb="20px">
      <Button size="sm" {...args}>
        Button
      </Button>
      <Button size="sm" color="primary.main" {...args}>
        Button
      </Button>
      <Button size="sm" color="secondary.main" {...args}>
        Button
      </Button>
      <Button size="sm" color="error.main" {...args}>
        Button
      </Button>
    </Box>
    <Box display="flex" gap="8px" flexWrap="wrap" mb="20px">
      <Button {...args}>Button</Button>
      <Button color="primary.main" {...args}>
        Button
      </Button>
      <Button color="secondary.main" {...args}>
        Button
      </Button>
      <Button color="error.main" {...args}>
        Button
      </Button>
    </Box>
    <Box display="flex" gap="8px" flexWrap="wrap">
      <Button size="lg" {...args}>
        Button
      </Button>
      <Button size="lg" color="primary.main" {...args}>
        Button
      </Button>
      <Button size="lg" color="secondary.main" {...args}>
        Button
      </Button>
      <Button size="lg" color="error.main" {...args}>
        Button
      </Button>
    </Box>
  </>
)

export const DefaultButton = Template.bind({})
DefaultButton.args = {
  disabled: false,
  isLoading: false,
}

export const DisabledButton = Template.bind({})
DisabledButton.args = {
  disabled: true,
  isLoading: false,
}

export const LoadingButton = Template.bind({})
LoadingButton.args = {
  disabled: false,
  isLoading: true,
}

