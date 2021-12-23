import { Button as ChakraButton } from '@chakra-ui/react'
import { ComponentProps, VFC } from 'react'

type Props = ComponentProps<typeof ChakraButton>;

export const Button: VFC<Props> = ({ ...rest }) => {
  return <ChakraButton {...rest} />
}
