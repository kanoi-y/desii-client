import { Box, Input } from '@chakra-ui/react'
import { NextPage } from 'next'
import { FormEvent, useState } from 'react'
import styled from 'styled-components'
import { SolidIcon } from '~/components/parts/commons'
import { FooterLayout } from '~/components/parts/layout/FooterLayout'

const SearchPage: NextPage = () => {
  const [value, setValue] = useState('')

  const searchByKeyword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(e)
  }

  return (
    <FooterLayout>
      <Box p={['28px 10px 0', '40px 20px 0']} position="relative">
        <Box maxW="780px" mx="auto">
          <StyledForm onSubmit={(e) => searchByKeyword(e)}>
            <Input
              size="lg"
              bgColor="secondary.light"
              boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="キーワード検索"
            />
            <button>
              <SolidIcon icon="SOLID_SEARCH" />
            </button>
          </StyledForm>
        </Box>
      </Box>
    </FooterLayout>
  )
}

const StyledForm = styled.form`
  position: relative;
`

export default SearchPage
