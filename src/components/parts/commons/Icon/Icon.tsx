import { Icon as ChakraIcon } from '@chakra-ui/react'
import { VFC } from 'react'
import { ColorVariables } from '~/types/color'

type OutlineIconProps = {
  size?: number
  icon: keyof typeof OutlineIconMap
  color?: ColorVariables
}

type SolidIconProps = {
  size?: number
  icon: keyof typeof SolidIconMap
  color?: ColorVariables
}

const OutlineHeart: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    fill="none"
    stroke="currentColor"
    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
  />
)

const OutlineBell: VFC = () => (
  <path
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
  />
)

const SolidHeart: VFC = () => (
  <path
    fill="currentColor"
    fillRule="evenodd"
    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
    clipRule="evenodd"
  />
)

const SolidBell: VFC = () => (
  <path
    fill="currentColor"
    d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
  />
)

export const OutlineIconMap = {
  OUTLINE_HEART: <OutlineHeart />,
  OUTLINE_BELL: <OutlineBell />,
}

export const SolidIconMap = {
  SOLID_HEART: <SolidHeart />,
  SOLID_BELL: <SolidBell />,
}

export const OutlineIcon: VFC<OutlineIconProps> = ({
  icon,
  size = 24,
  color = 'text.main',
}) => {
  return (
    <ChakraIcon
      xmlns="http://www.w3.org/2000/svg"
      color={color}
      boxSize={`${size}px`}
      viewBox="0 0 24 24"
    >
      {OutlineIconMap[icon]}
    </ChakraIcon>
  )
}

export const SolidIcon: VFC<SolidIconProps> = ({
  icon,
  size = 24,
  color = 'text.main',
}) => {
  return (
    <ChakraIcon
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      color={color}
      boxSize={`${size}px`}
    >
      {SolidIconMap[icon]}
    </ChakraIcon>
  )
}
