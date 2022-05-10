import { Box, Image } from '@chakra-ui/react'
import { NextPage } from 'next'
import { Button, Link, Text } from '~/components/parts/commons'
import { FooterLayout } from '~/components/parts/layout/FooterLayout'

const Custom404: NextPage = () => {
  return (
    <FooterLayout>
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
        <Box mt="36px" mb="20px">
          <Text fontSize="lg" isBold>
            ページが見つかりませんでした。
          </Text>
        </Box>
        <Link href="/">
          <Button>TOPへ戻る</Button>
        </Link>
      </Box>
    </FooterLayout>
  )
}

export default Custom404
