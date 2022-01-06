import { Box, Link } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { useMemo, VFC } from 'react'
import { GuestUserIcon, UserIcon } from '~/components/domains/user/UserIcon'
import { Button } from '~/components/parts/commons'

type Props = {
  isLogin: boolean
  userName?: string
  iconImageId?: string
}

export const NavigationBar: VFC<Props> = ({
  isLogin,
  userName,
  iconImageId,
}) => {
  const iconContent = useMemo(() => {
    if (!isLogin) return <Button>ログイン</Button>

    if (!userName || !iconImageId) return <GuestUserIcon />

    return <UserIcon userName={userName} iconImageId={iconImageId} />
  }, [isLogin, userName, iconImageId])

  return (
    <Box width="100%" p="12px" display="flex" alignItems="center" justifyContent="space-between">
      <NextLink href="/" passHref>
        <Link>
          <Box width="100px">
            <Image src="/images/Desii_logo.svg" alt="Desii_logo" width="300" height="100" />
          </Box>
        </Link>
      </NextLink>
      <Box>{iconContent}</Box>
    </Box>
  )
}
