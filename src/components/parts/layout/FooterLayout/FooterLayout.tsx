import { Box } from '@chakra-ui/react'
import { FC } from 'react'
import { Footer } from '../Footer/Footer'

export const FooterLayout: FC = ({ children }) => {
  return (
    <Box display="flex" flexDirection="column" minH="100vh" w="100%">
      {children}
      <Box mt="auto">
        <Footer />
      </Box>
    </Box>
  )
}
