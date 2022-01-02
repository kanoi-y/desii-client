import { Avatar } from '@chakra-ui/react'
import { VFC } from 'react'
import { User } from '~/domains'

type sizeType = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

type Props = {
  user: User
  size?: sizeType
  isLink?: boolean
}

export const UserIcon: VFC<Props> = ({ user, size = 'md', isLink = false }) => {

  return <Avatar name={user.name} size={size} src={user.iconImageId} />
}
