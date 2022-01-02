import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { UserIcon } from './UserIcon'

export default {
  title: 'domains/user/UserIcon',
  component: UserIcon,
} as ComponentMeta<typeof UserIcon>

const Template: ComponentStory<typeof UserIcon> = ({ ...args }) => (
  <Box>
    <UserIcon {...args} />
  </Box>
)

export const DefaultUserIcon = Template.bind({})
DefaultUserIcon.args = {
  userName: 'userName',
  iconImageId: 'iconImageId',
  userId: 'userId',
}
