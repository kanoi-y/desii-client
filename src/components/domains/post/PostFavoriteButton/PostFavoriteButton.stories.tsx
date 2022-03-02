import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { initializeApollo } from '~/lib/apolloClient'
import { postFactory } from '~/mocks/factories'
import { PostFavoriteButton } from './PostFavoriteButton'

export default {
  title: 'domains/post/PostFavoriteButton',
  component: PostFavoriteButton,
} as ComponentMeta<typeof PostFavoriteButton>

const Template: ComponentStory<typeof PostFavoriteButton> = ({ ...args }) => {
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      <Box p="20px">
        <PostFavoriteButton {...args} />
      </Box>
    </ApolloProvider>
  )
}

export const DefaultPostFavoriteButton = Template.bind({})
DefaultPostFavoriteButton.args = {
  postId: postFactory().id,
}

export const ExistCountPostFavoriteButton = Template.bind({})
ExistCountPostFavoriteButton.args = {
  postId: postFactory().id,
  currentUserId: 'userId',
  existCount: true,
}

export const BigPostFavoriteButton = Template.bind({})
BigPostFavoriteButton.args = {
  postId: postFactory().id,
  isBig: true,
}
