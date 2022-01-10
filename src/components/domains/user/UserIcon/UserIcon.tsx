import { VFC } from 'react'
import { useQuery } from '@apollo/client'
import { Avatar } from '@chakra-ui/react'

import { Link } from '~/components/parts/commons'
import { GET_ATTACHMENT_BY_ID } from '~/queries'
import { theme } from '~/theme'
import { GetAttachmentByIdQuery } from '~/types/generated/graphql'

type sizeType = 'sm' | 'md' | 'lg' | 'full'

type Props = {
  userName: string
  iconImageId: string
  userId?: string
  size?: sizeType
  isLink?: boolean
}

export const GuestUserIcon: VFC<Pick<Props, 'size'>> = ({ size }) => (
  <Avatar size={size} />
)

export const UserIcon: VFC<Props> = ({
  userName,
  iconImageId,
  userId = '',
  size = 'md',
  isLink = false,
}) => {
  const { data } = useQuery<GetAttachmentByIdQuery>(GET_ATTACHMENT_BY_ID, {
    variables: { id: iconImageId },
    fetchPolicy: 'cache-and-network',
  })

  if (isLink) {
    return (
      <Link href={`/user/${userId}`}>
        <Avatar
          name={userName}
          size={size}
          src={data?.attachments_by_pk?.filePath}
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
      src={data?.attachments_by_pk?.filePath}
      bg="transparent"
      boxShadow={`0 0 0 1px ${theme.colors.secondary.main}`}
    />
  )
}
