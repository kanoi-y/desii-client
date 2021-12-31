import { Tag as ChakraTag, TagCloseButton, TagLabel } from '@chakra-ui/react'
import { VFC } from 'react'

type Props = {
  text: string
  size?: "sm" | "md" | "lg"
  canDelete?: boolean
  onClose?: () => void
}

export const Tag: VFC<Props> = ({ text, size = "md", canDelete = false, onClose }) => {
  return (
    <ChakraTag size={size} variant="solid" borderRadius="full" bgColor="primary.main">
      <TagLabel>{text}</TagLabel>
      {canDelete && <TagCloseButton color="green" onClick={onClose} />}
    </ChakraTag>
  )
}
