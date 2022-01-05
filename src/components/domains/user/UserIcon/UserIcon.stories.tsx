import { ApolloProvider } from '@apollo/client'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { initializeApollo } from '~/lib/apolloClient'
import { UserIcon } from './UserIcon'

export default {
  title: 'domains/user/UserIcon',
  component: UserIcon,
} as ComponentMeta<typeof UserIcon>

const Template: ComponentStory<typeof UserIcon> = ({ size, ...args }) => {
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      <Box display="flex" flexWrap="wrap" gap="4px">
        <UserIcon size="sm" {...args} />
        <UserIcon {...args} />
        <UserIcon size="lg" {...args} />
        <UserIcon size="full" {...args} />
      </Box>
    </ApolloProvider>
  )
}

export const DefaultUserIcon = Template.bind({})
DefaultUserIcon.args = {
  userName: 'userName',
  iconImageId: 'iconImageId',
  userId: 'userId',
}
