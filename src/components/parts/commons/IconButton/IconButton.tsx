import { IconButton as ChakraIconButton } from '@chakra-ui/react'
import { MouseEvent, ReactElement, VFC } from 'react'
import { ColorVariables } from '~/types/color'

type Props = {
  label: string
  icon: ReactElement
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  bgColor?: ColorVariables
  isLoading?: boolean
  isDisabled?: boolean
  isRound?: boolean
}

export const IconButton: VFC<Props> = ({
  label,
  icon,
  onClick,
  bgColor = 'white.main',
  isRound = false,
  isLoading = false,
  isDisabled = false,
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
    />
  )
}
