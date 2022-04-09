import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { initializeApollo } from '~/lib/apolloClient'
import { notificationFactory } from '~/mocks/factories'
import { NotificationType } from '~/types/generated/graphql'
import {
  NotificationListItem,
  SkeletonNotificationListItem,
} from './NotificationListItem'

export default {
  title: 'domains/notification/NotificationListItem',
  component: NotificationListItem,
} as ComponentMeta<typeof NotificationListItem>

const Template: ComponentStory<typeof NotificationListItem> = ({ ...args }) => {
  const client = initializeApollo()
  return (
    <ApolloProvider client={client}>
      <Box bgColor="white">
        <NotificationListItem {...args} />
        <NotificationListItem {...args} />
        <NotificationListItem {...args} />
      </Box>
    </ApolloProvider>
  )
}

const mockNotification = notificationFactory()
const CheckedMockNotification = notificationFactory({
  isChecked: true,
})
const matchPostMockNotification = notificationFactory({
  type: NotificationType.MatchPost,
  message: '「mock matching post」が「mock post」とマッチしました',
})

export const FetchReactionNotificationListItem = Template.bind({})
FetchReactionNotificationListItem.args = {
  notification: mockNotification,
}

export const CheckedNotificationListItem = Template.bind({})
CheckedNotificationListItem.args = {
  notification: CheckedMockNotification,
}

export const MatchPostNotificationListItem = Template.bind({})
MatchPostNotificationListItem.args = {
  notification: matchPostMockNotification,
}

const SkeletonTemplate: ComponentStory<typeof SkeletonNotificationListItem> = ({
  ...args
}) => {
  const client = initializeApollo()
  return (
    <ApolloProvider client={client}>
      <Box bgColor="white">
        <SkeletonNotificationListItem {...args} />
        <SkeletonNotificationListItem {...args} />
        <SkeletonNotificationListItem {...args} />
      </Box>
    </ApolloProvider>
  )
}

export const Skeleton = SkeletonTemplate.bind({})
