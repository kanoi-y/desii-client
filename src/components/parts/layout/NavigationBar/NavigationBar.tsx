import { Box } from '@chakra-ui/react'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useContext, useMemo, VFC } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Button, Link, Menu, SolidIcon } from '~/components/parts/commons'
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
  const router = useRouter()

  const iconContent = useMemo(() => {
    if (!currentUser && !isLoading)
      return <Button onClick={onClickButton}>ログイン</Button>

    if (!currentUser) return <GuestUserIcon size="sm" />

    return (
      <Menu
        toggleItem={<UserIcon user={currentUser} size="sm" />}
        menuList={[
          {
            text: '投稿を作成',
            icon: <SolidIcon icon="SOLID_PENCIL_ALT" size={20} />,
            onClick: () => router.push('/dashboard/posts/new'),
          },
          {
            text: 'いいねした投稿',
            icon: <SolidIcon icon="SOLID_STAR" size={20} />,
            onClick: () => router.push('/dashboard/favorites'),
          },
          {
            text: 'ログアウト',
            icon: <SolidIcon icon="SOLID_LOGOUT" size={20} />,
            onClick: () => signOut(),
          },
        ]}
      />
    )
  }, [router, currentUser, isLoading, onClickButton])

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
  const router = useRouter()

  return (
    <Component
      currentUser={currentUser}
      isLoading={isLoading}
      onClickButton={() => router.push('/login')}
    />
  )
}
