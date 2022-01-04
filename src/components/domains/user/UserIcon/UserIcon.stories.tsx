import { ApolloProvider } from '@apollo/client'
import { initializeApollo } from '~/lib/apolloClient'
import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { UserIcon } from './UserIcon'

export default {
  title: 'domains/user/UserIcon',
  component: UserIcon,
} as ComponentMeta<typeof UserIcon>

const Template: ComponentStory<typeof UserIcon> = ({ ...args }) => {
  const client = initializeApollo()

  return (
    <ApolloProvider client={client}>
      <Box>
        <UserIcon {...args} />
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
