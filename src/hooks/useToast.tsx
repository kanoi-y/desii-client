import {
  ToastPositionWithLogical,
  useToast as useToastOriginal,
} from '@chakra-ui/react'
import { useCallback } from 'react'

const option = {
  isClosable: true,
  duration: 9000,
  position: 'bottom-left' as ToastPositionWithLogical,
}

export const useToast = () => {
  const toastOriginal = useToastOriginal()

  const toast = useCallback(
    ({ title, status }: { title: string; status: 'success' | 'error' }) => {
      toastOriginal({
        title,
        status,
        ...option,
      })
    },
    [toastOriginal]
  )

  return {
    toast,
  }
}
