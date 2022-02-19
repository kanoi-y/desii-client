import {
  Menu as ChakraMenu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { ReactElement, ReactNode, VFC } from 'react'

type Props = {
  toggleItem: ReactNode
  menuList: {
    text: string
    onClick: () => void
    icon?: ReactElement
    underline?: boolean
  }[]
}

export const Menu: VFC<Props> = ({ toggleItem, menuList }) => {
  return (
    <ChakraMenu>
      <MenuButton>{toggleItem}</MenuButton>
      <MenuList>
        {menuList.map((menuItem, i) => (
          <>
            <MenuItem key={i} icon={menuItem.icon} onClick={menuItem.onClick}>
              {menuItem.text}
            </MenuItem>
            {menuItem.underline && <MenuDivider />}
          </>
        ))}
      </MenuList>
    </ChakraMenu>
  )
}
