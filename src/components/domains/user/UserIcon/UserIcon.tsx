import { Avatar } from '@chakra-ui/react'
import { VFC } from 'react'
import { Link } from '~/components/parts/commons'
import { User } from '~/types/generated/graphql'

type sizeType = 'sm' | 'md' | 'lg' | 'full'

type Props = {
  user: User
  size?: sizeType
  isLink?: boolean
}

export const GuestUserIcon: VFC<Pick<Props, 'size'>> = ({ size = 'md' }) => (
  <Avatar size={size} />
)

export const UserIcon: VFC<Props> = ({ user, size = 'md', isLink = false }) => {
  if (isLink) {
    return (
      <Link href={`/user/${user.id}`}>
        <Avatar
          name={user.name}
          size={size}
          src={user.image || ''}
          bg={user.image ? 'transparent' : 'primary.main'}
          _hover={{
            background: `${user.image && 'secondary.light'}`,
          }}
        />
      </Link>
    )
  }

  return (
    <Avatar
      name={user.name}
      size={size}
      src={user.image || ''}
      bg={user.image ? 'transparent' : 'primary.main'}
      _hover={{
        background: `${user.image && 'secondary.light'}`,
      }}
    />
  )
}
