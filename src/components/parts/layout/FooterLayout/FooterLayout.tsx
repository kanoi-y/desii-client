import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { Footer } from '../Footer/Footer'

export const FooterLayout: FC = ({ children }) => {
  return (
    <Box>
      {children}
      <Footer />
    </Box>
  )
}
