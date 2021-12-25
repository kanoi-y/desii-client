import { Button as ChakraButton } from '@chakra-ui/react'
import { VFC } from 'react'
import { ColorVariables } from '~/constants/color'

type Props = {
  color?: ColorVariables
}

export const Button: VFC<Props> = ({ color = 'textColor.main', ...rest }) => {
  return (
    <ChakraButton
      boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
      colorScheme="white"
      color={color}
      {...rest}
    />
  )
}
