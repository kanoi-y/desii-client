import { ApolloProvider } from '@apollo/client'
import { Box, useRadioGroup } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { initializeApollo } from '~/lib/apolloClient'
import { messageFactory } from '~/mocks/factories'
import { MessageBubble } from './MessageBubble'

export default {
  title: 'domains/message/MessageBubble',
  component: MessageBubble,
} as ComponentMeta<typeof MessageBubble>

const Template: ComponentStory<typeof MessageBubble> = ({ ...args }) => {
  const client = initializeApollo()
  return (
    <ApolloProvider client={client}>
      <Box>
        <MessageBubble {...args} />
      </Box>
    </ApolloProvider>
  )
}

const mockMessage = messageFactory();

export const DefaultMessageBubble = Template.bind({})
DefaultMessageBubble.args = {
  message: mockMessage,
  currentUserId: "userId",
}
