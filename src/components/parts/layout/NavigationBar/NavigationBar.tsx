import { Box, Image } from '@chakra-ui/react'
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
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Image src="images/Desii_logo.svg" alt="Desii_logo" />
      <Box>{iconContent}</Box>
    </Box>
  )
}
