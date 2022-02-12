import { Box, Image } from '@chakra-ui/react'
import { VFC } from 'react'
import { Text } from '~/components/parts/commons'
import { Group } from '~/types/generated/graphql'

type Props = {
  group: Group
}

export const GroupCard: VFC<Props> = ({ group }) => {
  return (
    <Box>
      <Image src={group.image} alt={group.name} />
      <Box>
        <Box display="flex" alignItems="center">
          <Text fontSize="lg" noOfLines={1}>
            {group.name}
          </Text>
          <Text fontSize="md">123人</Text>
        </Box>
        <Text fontSize="md" noOfLines={2}>
          {group.description || ''}
        </Text>
      </Box>
    </Box>
  )
}
