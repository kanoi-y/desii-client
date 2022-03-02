import { IconButton as ChakraIconButton } from '@chakra-ui/react'
import { MouseEvent, ReactElement, VFC } from 'react'
import { ColorVariables } from '~/types/color'

type sizeType = 'lg' | 'md' | 'sm' | 'xs'

type Props = {
  label: string
  icon: ReactElement
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  bgColor?: ColorVariables
  isLoading?: boolean
  isDisabled?: boolean
  isRound?: boolean
  size?: sizeType
}

export const IconButton: VFC<Props> = ({
  label,
  icon,
  onClick,
  bgColor = 'white.main',
  isRound = false,
  isLoading = false,
  isDisabled = false,
  size = 'md',
}) => {
  return (
    <ChakraIconButton
      aria-label={label}
      icon={icon}
      boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
      bgColor={bgColor}
      isLoading={isLoading}
      onClick={onClick}
      isDisabled={isDisabled}
      isRound={isRound}
      size={size}
    />
  )
}
