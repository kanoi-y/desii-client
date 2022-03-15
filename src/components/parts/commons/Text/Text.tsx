import { Heading, Text as ChakraText } from '@chakra-ui/react'
import { VFC } from 'react'
import { ColorVariables } from '~/types/color'

type Props = {
  fontSize:
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
  isHead?: boolean
  color?: ColorVariables
  noOfLines?: number
  noWrap?: boolean
  isBold?: boolean
  children: string
}

export const Text: VFC<Props> = ({
  isHead = false,
  color = 'text.main',
  fontSize,
  noOfLines,
  noWrap = false,
  isBold = false,
  children,
}) => {
  if (isHead)
    return (
      <Heading
        color={color}
        fontSize={fontSize}
        noOfLines={noOfLines}
        whiteSpace={noWrap ? 'nowrap' : 'unset'}
        fontWeight={isBold ? 'bold' : ''}
      >
        {children}
      </Heading>
    )
  return (
    <ChakraText
      color={color}
      fontSize={fontSize}
      noOfLines={noOfLines}
      whiteSpace={noWrap ? 'nowrap' : 'unset'}
      fontWeight={isBold ? 'bold' : ''}
    >
      {children}
    </ChakraText>
  )
}
