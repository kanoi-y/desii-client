import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from './Button';

export default {
  title: 'UI/Button',
  component: Button,
} as ComponentMeta<typeof Button>

type Template = ComponentStory<typeof Button>

const Template: Template = (args) => <Button {...args}>Default</Button>

export const Default: Template = Template.bind({})
