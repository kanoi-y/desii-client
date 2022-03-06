import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { useState } from 'react'
import { Button, Text } from '~/components/parts/commons'
import { Modal } from './Modal'

export default {
  title: 'parts/commons/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>

const Template: ComponentStory<typeof Modal> = ({ ...args }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Box p="20px">
      <Button onClick={() => setIsOpen(true)}>Modal Button</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {
  title: 'title',
  body: <Text fontSize="2xl">Modal content</Text>,
  size: 'md',
}
