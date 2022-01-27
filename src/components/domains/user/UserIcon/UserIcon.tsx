import { Avatar } from '@chakra-ui/react'
import { VFC } from 'react'
import { Link } from '~/components/parts/commons'
import { theme } from '~/theme'

type sizeType = 'sm' | 'md' | 'lg' | 'full'

type Props = {
  userName: string
  imageSrc: string
  userId?: string
  size?: sizeType
  isLink?: boolean
}

export const GuestUserIcon: VFC<Pick<Props, 'size'>> = ({ size }) => (
  <Avatar size={size} />
)

export const UserIcon: VFC<Props> = ({
  userName,
  imageSrc,
  userId = '',
  size = 'md',
  isLink = false,
}) => {
  if (isLink) {
    return (
      <Link href={`/user/${userId}`}>
        <Avatar
          name={userName}
          size={size}
          src={imageSrc}
          bg="transparent"
          boxShadow={`0 0 0 1px ${theme.colors.secondary.main}`}
        />
      </Link>
    )
  }

  return (
    <Avatar
      name={userName}
      size={size}
      src={imageSrc}
      bg="transparent"
      boxShadow={`0 0 0 1px ${theme.colors.secondary.main}`}
    />
  )
}
