import { Box, Image } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import { VFC } from 'react'
import { Button, Link, Modal, Text } from '~/components/parts/commons'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const LoginModal: VFC<Props> = ({ isOpen, onClose }) => {
  const ModalBody = (
    <Box textAlign="center">
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
        <Link href="/term">利用規約</Link>
        <Text fontSize="sm">に同意したうえでログインしてください</Text>
      </Box>
    </Box>
  )

  return (
    <Modal
      title="Desiiにログインする"
      isOpen={isOpen}
      onClose={onClose}
      body={ModalBody}
    />
  )
}
