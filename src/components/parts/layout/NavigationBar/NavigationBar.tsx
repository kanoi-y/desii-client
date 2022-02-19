import { EditIcon, SettingsIcon, StarIcon } from '@chakra-ui/icons'
import { Box } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useContext, useMemo, VFC } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Button, Link, Menu } from '~/components/parts/commons'
import { CurrentUserContext } from '~/hooks/CurrentUserProvider'
import { User } from '~/types/generated/graphql'

type Props = {
  currentUser?: User | null
  isLoading: boolean
  onClickButton: () => void
}

export const Component: VFC<Props> = ({
  currentUser,
  isLoading,
  onClickButton,
}) => {
  const iconContent = useMemo(() => {
    if (!currentUser && !isLoading)
      return <Button onClick={onClickButton}>ログイン</Button>

    if (!currentUser) return <GuestUserIcon size="sm" />

    return (
      <Menu
        toggleItem={<UserIcon user={currentUser} size="sm" />}
        menuList={[
          {
            text: '投稿の管理',
            icon: <EditIcon />,
            onClick: () => console.log('投稿の管理'),
          },
          {
            text: 'いいねした投稿',
            icon: <StarIcon />,
            onClick: () => console.log('いいねした投稿'),
          },
          {
            text: 'アカウント設定',
            icon: <SettingsIcon />,
            onClick: () => console.log('アカウント設定'),
          },
        ]}
      />
    )
  }, [currentUser, isLoading, onClickButton])

  return (
    <Box
      width="100%"
      p="12px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bgColor="#fff"
    >
      <Link href="/">
        <Box width="100px">
          <Image
            src="/images/Desii_logo.svg"
            alt="Desii_logo"
            width="300"
            height="100"
          />
        </Box>
      </Link>
      <Box>{iconContent}</Box>
    </Box>
  )
}

export const NavigationBar: VFC = () => {
  const { currentUser, isLoading } = useContext(CurrentUserContext)

  return (
    <Component
      currentUser={currentUser}
      isLoading={isLoading}
      onClickButton={() => signIn('google')}
    />
  )
}
