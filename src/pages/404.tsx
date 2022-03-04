import { Box, Image } from '@chakra-ui/react'
import { NextPage } from 'next'
import { Button, Link, Text } from '~/components/parts/commons'

const Custom404: NextPage = () => {
  return (
    <Box
      w="100%"
      p="40px 8px 0"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {/* TODO: もっといい画像があれば変更する */}
      <Image
        src="/images/Desii_logo.svg"
        alt="Desii_logo"
        width="300"
        height="100"
      />
      <Box mt="20px" mb="12px">
        <Text fontSize="lg" isBold>
          ページが見つかりませんでした。
        </Text>
      </Box>
      <Link href="/">
        <Button>TOPへ戻る</Button>
      </Link>
    </Box>
  )
}

export default Custom404
