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
      <Box
        borderRadius="lg"
        overflow="hidden"
        bgColor="white"
        w="280px"
        h="230px"
        display="flex"
        flexDirection="column"
        boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
      >
        <Image src={group.image} alt={group.name} flex="1" />
        <Box bgColor="primary.main" p="8px">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            gap="4px"
          >
            <Text fontSize="lg" noOfLines={1} isBold>
              {group.name}
            </Text>
            <Text fontSize="sm" isBold noWrap>
              {data?.GetUserGroupRelations
                ? data.GetUserGroupRelations.length.toString() + '人'
                : ''}
            </Text>
          </Box>
          <Box textAlign="left">
            <Text fontSize="sm" noOfLines={2}>
              {group.description || ''}
            </Text>
          </Box>
        </Box>
      </Box>
    </Link>
  )
}
