import { Link as ChakraLink } from '@chakra-ui/react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { ReactNode, VFC } from 'react'

type Props = {
  children?: ReactNode
  href: NextLinkProps['href']
  target?: string
}

export const Link: VFC<Props> = ({ children, href, target }) => {
  return (
    <NextLink href={href} passHref>
      <ChakraLink
        target={target || '_self'}
        rel={target ? 'opener noreferrer' : ''}
        _active={{ boxShadow: 'none' }}
        _focus={{ boxShadow: 'none' }}
        _hover={{ textDecoration: 'none' }}
      >
        {children}
      </ChakraLink>
    </NextLink>
  )
}
