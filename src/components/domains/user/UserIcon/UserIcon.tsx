import { useQuery } from '@apollo/client'
import { Avatar, Link } from '@chakra-ui/react'
import NextLink from 'next/link'
import { VFC } from 'react'
import { GET_ATTACHMENT_BY_ID } from '~/queries'
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
      <NextLink href={`/user/${userId}`} passHref>
        <Link>
          <Avatar
            name={userName}
            size={size}
            src={data?.attachments_by_pk?.filePath}
          />
        </Link>
      </NextLink>
    )
  }

  return (
    <Avatar
      name={userName}
      size={size}
      src={data?.attachments_by_pk?.filePath}
    />
  )
}
