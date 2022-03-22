import { Box, Image } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import React from 'react'
import { Button, Text } from '~/components/parts/commons'

// TODO: ログインしてる場合はアクセスを弾く
const LoginPage = () => {
  return (
    <Box p={['28px 10px 0', '40px 20px 0']}>
      <Box mx="auto" maxW="400px" textAlign="center">
        <Box mb="28px">
          <Image src="/images/Desii_logo.svg" alt="Desii_logo" />
        </Box>
        <Button onClick={() => signIn('google')}>
          <Box display="flex" gap="8px" alignItems="center">
            <Image
              src="/images/google_logo.svg"
              alt="Desii_logo"
              boxSize="20px"
            />
            Googleでログイン
          </Box>
        </Button>
        <Box mt="16px">
          <Text fontSize="sm">
            利用規約に同意したうえでログインしてください
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default LoginPage
