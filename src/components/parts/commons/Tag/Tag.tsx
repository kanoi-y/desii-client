import { Tag as ChakraTag, TagCloseButton, TagLabel } from '@chakra-ui/react'
import { VFC } from 'react'
import { ColorVariables } from '~/types/color'

type Props = {
  text: string
  size?: 'sm' | 'md' | 'lg'
  bgColor?: ColorVariables
  canDelete?: boolean
  onClose?: () => void
}

export const Tag: VFC<Props> = ({
  text,
  size = 'md',
  bgColor = 'primary.main',
  canDelete = false,
  onClose,
}) => {
  return (
    <ChakraTag
      size={size}
      variant="solid"
      borderRadius="full"
      boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
      bgColor={bgColor}
    >
      <TagLabel>{text}</TagLabel>
      {canDelete && <TagCloseButton color="green" onClick={onClose} />}
    </ChakraTag>
  )
}
