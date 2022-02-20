import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { OutlineIcon, OutlineIconMap, SolidIcon, SolidIconMap } from './Icon'

export default {
  title: 'parts/commons/Icon',
  component: OutlineIcon,
} as ComponentMeta<typeof OutlineIcon>

const OutlineTemplate: ComponentStory<typeof OutlineIcon> = ({ ...args }) => (
  <Box p="20px" display="flex" flexWrap="wrap" gap="8px">
    {Object.keys(OutlineIconMap).map((v, index) => {
      return (
        <OutlineIcon
          key={index}
          {...args}
          icon={v as keyof typeof OutlineIconMap}
        />
      )
    })}
  </Box>
)

export const Outline = OutlineTemplate.bind({})
Outline.args = {
  size: 24,
  color: 'text.main',
}

const SolidTemplate: ComponentStory<typeof SolidIcon> = ({ ...args }) => (
  <Box p="20px" display="flex" flexWrap="wrap" gap="8px">
    {Object.keys(SolidIconMap).map((v, index) => {
      return (
        <SolidIcon
          key={index}
          {...args}
          icon={v as keyof typeof SolidIconMap}
        />
      )
    })}
  </Box>
)

export const Solid = SolidTemplate.bind({})
Solid.args = {
  size: 24,
  color: 'text.main',
}
