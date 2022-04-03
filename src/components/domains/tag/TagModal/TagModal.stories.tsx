import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React, { useState } from 'react'
import { Button } from '~/components/parts/commons'
import { initializeApollo } from '~/lib/apolloClient'
import { Tag } from '~/types/generated/graphql'
import { TagModal } from './TagModal'

export default {
  title: 'domains/tag/TagModal',
  component: TagModal,
} as ComponentMeta<typeof TagModal>

const Template: ComponentStory<typeof TagModal> = ({ ...args }) => {
  const client = initializeApollo()
  const [isOpen, setIsOpen] = useState(false)
  const [postTags, setPostTags] = useState<Tag[]>([])
  const handlePostTags = (tags: Tag[]) => {
    setPostTags(tags)
  }
  return (
    <ApolloProvider client={client}>
      <Box p="20px">
        <Button onClick={() => setIsOpen(true)}>Modal Button</Button>
        <TagModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          postTags={postTags}
          setPostTags={handlePostTags}
        />
      </Box>
    </ApolloProvider>
  )
}

export const DefaultTagModal = Template.bind({})
