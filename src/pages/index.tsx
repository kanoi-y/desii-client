import { Box } from '@chakra-ui/react'
import React from 'react'
import { Button } from '~/components/parts/commons'

export default function Home() {
  const handleClick = () => {
    alert('Hello!')
  }

  return (
    <Box textAlign="center">
      <Button onClick={handleClick}>Hello World!!</Button>
    </Box>
  )
}
