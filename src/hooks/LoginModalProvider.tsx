import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useState,
} from 'react'
import { LoginModal } from '~/components/parts/authentication/LoginModal'

export const LoginModalIsOpenContext = createContext<boolean>(false)
export const LoginModalSetIsOpenContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(() => undefined)

export const LoginModalProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <LoginModalSetIsOpenContext.Provider value={setIsOpen}>
      <LoginModalIsOpenContext.Provider value={isOpen}>
        {children}
        <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </LoginModalIsOpenContext.Provider>
    </LoginModalSetIsOpenContext.Provider>
  )
}
