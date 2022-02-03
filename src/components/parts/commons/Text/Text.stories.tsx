import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { Text } from './Text'

export default {
  title: 'parts/commons/Text',
  component: Text,
} as ComponentMeta<typeof Text>

const Template: ComponentStory<typeof Text> = ({ ...args }) => (
  <Box>
    <Text {...args} fontSize="xs">
      sample text
    </Text>
    <Text {...args} fontSize="sm">
      sample text
    </Text>
    <Text {...args} fontSize="lg">
      sample text
    </Text>
    <Text {...args} fontSize="2xl">
      sample text
    </Text>
    <Text {...args} fontSize="3xl">
      sample text
    </Text>
    <Text {...args} fontSize="4xl">
      sample text
    </Text>
    <Text {...args} fontSize="5xl">
      sample text
    </Text>
    <Text {...args} fontSize="6xl">
      sample text
    </Text>
  </Box>
)

export const Default = Template.bind({})
Default.args = {
  color: 'text.main',
}

export const HeadText = Template.bind({})
HeadText.args = {
  isHead: true,
}
