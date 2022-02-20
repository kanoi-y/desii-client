import { Icon as ChakraIcon } from '@chakra-ui/react'
import { VFC } from 'react'
import { ColorVariables } from '~/types/color'

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  icon: keyof typeof IconMap
  color?: ColorVariables
}

const OutlineHeart: VFC = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
  />
)

const SolidHeart: VFC = () => (
  <path
    fillRule="evenodd"
    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
    clipRule="evenodd"
  />
)

export const IconMap = {
  OUTLINE_HEART: <OutlineHeart />,
  SOLID_HEART: <SolidHeart />,
}

export const Icon: VFC<Props> = ({
  icon,
  size = 'md',
  color = 'primary.main',
}) => {
  return (
    <ChakraIcon xmlns="http://www.w3.org/2000/svg" color={color} boxSize={size}>
      {IconMap[icon]}
    </ChakraIcon>
  )
}
