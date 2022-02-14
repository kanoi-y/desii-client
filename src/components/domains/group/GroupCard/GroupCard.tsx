import { Box, Image } from '@chakra-ui/react'
import { VFC } from 'react'
import { Link, Text } from '~/components/parts/commons'
import { Group, useGetUserGroupRelationsQuery } from '~/types/generated/graphql'

type Props = {
  group: Group
}

export const GroupCard: VFC<Props> = ({ group }) => {
  const { data } = useGetUserGroupRelationsQuery({
    variables: {
      groupId: group.id,
    },
  })

  return (
    <Link href={`/${group.productId}`}>
      <Box>
        <Image src={group.image} alt={group.name} />
        <Box>
          <Box display="flex" alignItems="center">
            <Text fontSize="lg" noOfLines={1}>
              {group.name}
            </Text>
            <Text fontSize="md">
              {data?.GetUserGroupRelations
                ? data.GetUserGroupRelations.length.toString() + '人'
                : ''}
            </Text>
          </Box>
          <Text fontSize="md" noOfLines={2}>
            {group.description || ''}
          </Text>
        </Box>
      </Box>
    </Link>
  )
}
