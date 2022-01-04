import { Box } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { UserIcon } from './UserIcon'

export default {
  title: 'domains/user/UserIcon',
  component: UserIcon,
} as ComponentMeta<typeof UserIcon>

const Template: ComponentStory<typeof UserIcon> = ({ size, ...args }) => {
  return (
    <Box display="flex" flexWrap="wrap">
      <UserIcon size="sm" {...args} />
      <UserIcon {...args} />
      <UserIcon size="lg" {...args} />
      <UserIcon size="full" {...args} />
    </Box>
  )
}

export const DefaultUserIcon = Template.bind({})
DefaultUserIcon.args = {
  userName: 'userName',
  iconImageId: 'iconImageId',
  userId: 'userId',
}
