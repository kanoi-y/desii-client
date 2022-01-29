import { Box } from '@chakra-ui/react'
import Image from 'next/image'
import { useMemo, VFC } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Button, Link } from '~/components/parts/commons'
import { User } from '~/types/generated/graphql'

type Props = {
  isLoading: boolean
  user?: User
}

export const NavigationBar: VFC<Props> = ({ isLoading, user }) => {
  const iconContent = useMemo(() => {
    if (!user && !isLoading) return <Button>ログイン</Button>

    if (!user) return <GuestUserIcon />

    return <UserIcon user={user} />
  }, [user, isLoading])

  return (
    <Box
      width="100%"
      p="12px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
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
