import { Box } from '@chakra-ui/react'
import { VFC } from 'react'
import { Text } from '~/components/parts/commons'

export const Footer: VFC = () => {
  return (
    <Box as="footer" p="28px 0 4px" textAlign="center">
      <Text fontSize="sm" isBold>©2022 Desii</Text>
    </Box>
  )
}
