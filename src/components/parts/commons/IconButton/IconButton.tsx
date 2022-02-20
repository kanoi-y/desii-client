import { IconButton as ChakraIconButton } from '@chakra-ui/react'
import { ReactElement, VFC } from 'react'
import { ColorVariables } from '~/types/color'

type Props = {
  label: string
  icon: ReactElement
  onClick?: () => void
  color?: ColorVariables
  size?: number
  isLoading?: boolean
  disabled?: boolean
}

export const IconButton: VFC<Props> = ({
  label,
  icon,
  onClick,
  color = 'white.main',
  size = 24,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <ChakraIconButton
      aria-label={label}
      icon={icon}
      color={color}
      size={`${size}px`}
      isLoading={isLoading}
      onClick={onClick}
      isDisabled={disabled}
    />
  )
}
