import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { initializeApollo } from '~/lib/apolloClient'
import { userFactory } from '~/mocks/factories'
import { GuestUserIcon, UserIcon } from './UserIcon'

export default {
  title: 'domains/user/UserIcon',
  component: UserIcon,
} as ComponentMeta<typeof UserIcon>

const Template: ComponentStory<typeof UserIcon> = ({ size, ...args }) => {
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      <Box p="20px" display="flex" flexWrap="wrap" gap="4px">
        <UserIcon size="sm" {...args} />
        <UserIcon {...args} />
        <UserIcon size="lg" {...args} />
        <UserIcon size="full" {...args} />
      </Box>
    </ApolloProvider>
  )
}

const mockUser = userFactory({ image: 'images/Desii_icon.png' })

export const DefaultUserIcon = Template.bind({})
DefaultUserIcon.args = {
  user: mockUser,
  isLink: true,
}

const GuestTemplate: ComponentStory<typeof GuestUserIcon> = ({ ...args }) => {
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      <Box p="20px">
        <GuestUserIcon {...args} />
      </Box>
    </ApolloProvider>
  )
}

export const Guest = GuestTemplate.bind({})
