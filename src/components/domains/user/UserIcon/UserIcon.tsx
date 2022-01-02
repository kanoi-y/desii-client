import { useQuery } from '@apollo/client'
import { Avatar } from '@chakra-ui/react'
import { VFC } from 'react'
import { User } from '~/domains'
import { GET_ATTACHMENT_BY_ID } from '~/queries'
import { GetAttachmentByIdQuery } from '~/types/generated/graphql'

type sizeType = '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

type Props = {
  userName?: string;
  iconImageId?: string;
  size?: sizeType
  isLink?: boolean
}

export const UserIcon: VFC<Props> = ({ userName, iconImageId, size = 'md', isLink = false }) => {
  const { data, error } = useQuery<GetAttachmentByIdQuery>(
    GET_ATTACHMENT_BY_ID,
    {
      variables: { id: iconImageId },
      // fetchPolicy: 'network-only',
      fetchPolicy: 'cache-and-network',
      //fetchPolicy: 'cache-first',
      //fetchPolicy: 'no-cache',
    }
  )

  if (error) null

  return <Avatar name={userName} size={size} src={data?.attachments_by_pk?.filePath} />
}
