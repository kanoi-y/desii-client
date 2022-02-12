import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { initializeApollo } from '~/lib/apolloClient'
import { groupFactory } from '~/mocks/factories'
import { GroupCard } from './GroupCard'

export default {
  title: 'domains/group/GroupCard',
  component: GroupCard,
} as ComponentMeta<typeof GroupCard>

const Template: ComponentStory<typeof GroupCard> = ({ ...args }) => {
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      <Box p="20px">
        <GroupCard {...args} />
      </Box>
    </ApolloProvider>
  )
}

export const Default = Template.bind({})
Default.args = {
  group: groupFactory({ image: 'images/Desii_logo.svg' }),
}
