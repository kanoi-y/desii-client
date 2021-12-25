import { Button as ChakraButton } from '@chakra-ui/react'
import { VFC } from 'react'

import { ColorVariables } from '~/types/color'

type Props = {
  color?: ColorVariables
}

export const Button: VFC<Props> = ({ color = 'text', ...rest }) => {
  return (
    <ChakraButton
      boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
      colorScheme="white"
      color={`${color}.main`}
      {...rest}
    />
  )
}
