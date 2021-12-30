import { Tag as ChakraTag, TagCloseButton, TagLabel } from '@chakra-ui/react'
import { VFC } from 'react'

type Props = {
  text: string
  canDelete?: boolean
}

export const Tag: VFC<Props> = ({ text, canDelete = false }) => {
  return (
    <ChakraTag colorScheme='primary.main'>
      <TagLabel>{text}</TagLabel>
      {canDelete && <TagCloseButton />}
    </ChakraTag>
  )
}
