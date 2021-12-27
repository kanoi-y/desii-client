import { Button as ChakraButton } from '@chakra-ui/react'
import { ReactNode, VFC } from 'react'
import { ColorVariables } from '~/types/color'

type Props = {
  children: ReactNode
  disabled?: boolean
  color?: ColorVariables
  onClick?: () => void
  size?: "sm" | "md" | "lg" | "xs"
  isLoading?: boolean
}

export const Button: VFC<Props> = ({
  color = 'text.main',
  disabled = false,
  size = 'md',
  isLoading = false,
  onClick,
  children,
}) => {
  return (
    <ChakraButton
      boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
      colorScheme="white"
      color={color}
      disabled={disabled}
      size={size}
      onClick={onClick}
      isLoading={isLoading}
    >
      {children}
    </ChakraButton>
  )
}
