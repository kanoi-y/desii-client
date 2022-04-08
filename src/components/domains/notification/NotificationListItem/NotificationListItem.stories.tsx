import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { initializeApollo } from '~/lib/apolloClient'
import { notificationFactory } from '~/mocks/factories'
import { NotificationType } from '~/types/generated/graphql'
import { NotificationListItem } from './NotificationListItem'

export default {
  title: 'domains/notification/NotificationListItem',
  component: NotificationListItem,
} as ComponentMeta<typeof NotificationListItem>

const Template: ComponentStory<typeof NotificationListItem> = ({ ...args }) => {
  const client = initializeApollo()
  return (
    <ApolloProvider client={client}>
      <Box>
        <NotificationListItem {...args} />
        <NotificationListItem {...args} />
        <NotificationListItem {...args} />
      </Box>
    </ApolloProvider>
  )
}

const mockNotification = notificationFactory()
const matchPostMockNotification = notificationFactory({
  type: NotificationType.MatchPost,
  message: '「mock matching post」が「mock post」とマッチしました',
})

export const FetchReactionNotificationListItem = Template.bind({})
FetchReactionNotificationListItem.args = {
  notification: mockNotification,
}

export const MatchPostNotificationListItem = Template.bind({})
MatchPostNotificationListItem.args = {
  notification: matchPostMockNotification,
}
