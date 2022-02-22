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
      bgColor={bgColor}
    >
      <TagLabel>{text}</TagLabel>
      {canDelete && <TagCloseButton color="green" onClick={onClose} />}
    </ChakraTag>
  )
}
