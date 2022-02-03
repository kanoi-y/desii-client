import { Heading, Text as ChakraText } from '@chakra-ui/react'
import { VFC } from 'react'
import { ColorVariables } from '~/types/color'

type Props = {
  isHead: boolean
  isTruncated?: boolean
  color?: ColorVariables
  fontSize: 'xs' | 'sm' | 'md' | 'lg' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  noOfLines?: number
  children: string
}

export const Text: VFC<Props> = ({
  isHead,
  isTruncated = true,
  color = 'text.main',
  fontSize,
  noOfLines,
  children,
}) => {
  if (isHead)
    return (
      <Heading
        isTruncated={isTruncated}
        color={color}
        fontSize={fontSize}
        noOfLines={noOfLines}
      >
        {children}
      </Heading>
    )
  return (
    <ChakraText
      isTruncated={isTruncated}
      color={color}
      fontSize={fontSize}
      noOfLines={noOfLines}
    >
      {children}
    </ChakraText>
  )
}
