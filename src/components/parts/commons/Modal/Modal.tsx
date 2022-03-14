import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { VFC } from 'react'

type Props = {
  isOpen: boolean
  onClose: () => void
  title: string
  body: JSX.Element
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Modal: VFC<Props> = ({
  isOpen,
  onClose,
  title,
  body,
  size = 'md',
}) => {
  return (
    <ChakraModal
      size={size}
      isOpen={isOpen}
      onClose={onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{body}</ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}
