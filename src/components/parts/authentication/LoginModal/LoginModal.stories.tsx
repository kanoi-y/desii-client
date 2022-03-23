import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { useState } from 'react'
import { Button } from '~/components/parts/commons'
import { Component } from './LoginModal'

export default {
  title: 'parts/authentication/LoginModal',
  component: Component,
  argTypes: { onClickLoginButton: { action: 'ClickLoginButton' } },
} as ComponentMeta<typeof Component>

const Template: ComponentStory<typeof Component> = ({ ...args }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box p="20px">
      <Button onClick={() => setIsOpen(true)}>Modal Button</Button>
      <Component {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  )
}

export const Default = Template.bind({})
