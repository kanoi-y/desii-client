import { Button as ChakraButton } from '@chakra-ui/react'
import { ComponentProps, VFC } from 'react'

type Props = ComponentProps<typeof ChakraButton>

export const Button: VFC<Props> = ({
  colorScheme = 'white',
  boxShadow = '0 3px 6px rgba(0, 0, 0, 0.16)',
  color = 'textColor.main',
  ...rest
}) => {
  return (
    <ChakraButton boxShadow={boxShadow} colorScheme={colorScheme} color={color} {...rest} />
  )
}
