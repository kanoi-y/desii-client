import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { initializeApollo } from '~/lib/apolloClient'
import { messageFactory, roomFactory } from '~/mocks/factories'
import { MessageType } from '~/types/generated/graphql'
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

const mockMessage = messageFactory()

export const DefaultMessageBubble = Template.bind({})
DefaultMessageBubble.args = {
  message: mockMessage,
  currentUserId: 'userId',
}

const mockReadMessage = messageFactory({
  id: 'messageId',
  room: roomFactory({ groupId: 'groupId' }),
})
export const ReadMessageBubble = Template.bind({})
ReadMessageBubble.args = {
  message: mockReadMessage,
  currentUserId: 'userId',
}

export const TargetUserMessageBubble = Template.bind({})
TargetUserMessageBubble.args = {
  message: mockMessage,
  currentUserId: 'currentUserId',
}

const mockMessageByRoomRelatedGroup = messageFactory({
  room: roomFactory({ groupId: 'groupId' }),
})

export const TargetUserByRoomRelatedGroupMessageBubble = Template.bind({})
TargetUserByRoomRelatedGroupMessageBubble.args = {
  message: mockMessageByRoomRelatedGroup,
  currentUserId: 'currentUserId',
}

const mockMediaMessage = messageFactory({
  type: MessageType.Media,
  body: 'images/Desii_bgImage.png',
})
export const DefaultMediaMessageBubble = Template.bind({})
DefaultMediaMessageBubble.args = {
  message: mockMediaMessage,
  currentUserId: 'userId',
}

export const TargetUserMediaMessageBubble = Template.bind({})
TargetUserMediaMessageBubble.args = {
  message: mockMediaMessage,
  currentUserId: 'currentUserId',
}

const mockPostMessage = messageFactory({
  type: MessageType.Post,
  body: 'postId',
})

export const DefaultPostMessageBubble = Template.bind({})
DefaultPostMessageBubble.args = {
  message: mockPostMessage,
  currentUserId: 'userId',
}
