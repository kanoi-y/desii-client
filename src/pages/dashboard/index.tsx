import { Box, Input, Textarea } from '@chakra-ui/react'
import axios from 'axios'
import cuid from 'cuid'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import React, { ChangeEvent, useState } from 'react'
import { Button, SolidIcon, Text, UploadIcon } from '~/components/parts/commons'
import { useToast } from '~/hooks'
import { initializeApollo } from '~/lib/apolloClient'
import { GET_CURRENT_USER } from '~/queries'
import {
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  User,
  useUpdateUserMutation,
} from '~/types/generated/graphql'

const client = initializeApollo()

const ONE_MB = 10000000

type Props = {
  currentUser: User
}

const ProfilePage: NextPage<Props> = ({ currentUser }) => {
  const { toast } = useToast()
  const [newUser, setNewUser] = useState<
    Pick<User, 'name' | 'description' | 'image'>
  >({
    name: currentUser.name,
    description: currentUser.description,
    image: currentUser.image,
  })

  const [updateUserMutation] = useUpdateUserMutation({
    variables: {
      updateUserId: currentUser.id,
      ...newUser,
    },
    refetchQueries: ['UpdateUser'],
  })

  const updateUserForm = (newObject: Partial<User>) => {
    setNewUser((prevState) => {
      return {
        ...prevState,
        ...newObject,
      }
    })
  }

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return
    }
    const file = e.target.files[0]
    if (file.size > ONE_MB) {
      toast({
        title: '10MBを超えるファイルをアップロードすることは出来ません',
        status: 'error',
      })
      return
    }
    try {
      const uniqueFileName = `${cuid()}/${file.name}`
      const res = await axios.post(
        `${
          process.env.NEXT_PUBLIC_ROOT_URL || 'http://localhost:3000'
        }/api/signedUrl?fileName=${uniqueFileName}`
      )
      const signed_url = res.data[0]

      await axios.put(signed_url, file, {
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      })
      updateUserForm({
        image: `https://storage.googleapis.com/${
          process.env.GCP_BUCKET_ID || 'desii-dev'
        }/${uniqueFileName}`,
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          status: 'error',
        })
      }
    }
  }

  const handleUpdateProfile = async () => {
    try {
      await updateUserMutation()
      toast({ title: 'プロフィールを更新しました！', status: 'success' })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          status: 'error',
        })
      }
    }
  }

  return (
    <Box p={['28px 10px 0', '40px 20px 0']}>
      <Box mx="auto" maxW="700px">
        <Box
          display="flex"
          alignItems="center"
          gap="4px"
          pb="16px"
          mb="40px"
          borderBottom="2px solid"
          borderColor="secondary.light"
        >
          <SolidIcon icon="SOLID_USER" color="primary.main" size={36} />
          <Text fontSize="lg" isBold>
            プロフィール編集
          </Text>
        </Box>
        <Box
          mb="40px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <UploadIcon
            onSelectImage={handleChangeFile}
            currentImagePath={newUser.image || ''}
            size="2xl"
          />
        </Box>
        <Box mb="32px">
          <Box mb="4px">
            <Text fontSize="md" isBold>
              ユーザー名
            </Text>
          </Box>
          <Input
            bgColor="white.main"
            boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
            value={newUser.name}
            onChange={(e) => updateUserForm({ name: e.target.value })}
          />
        </Box>
        <Box mb="40px">
          <Box mb="4px">
            <Text fontSize="md" isBold>
              自己紹介
            </Text>
          </Box>
          <Textarea
            bgColor="white.main"
            boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
            rows={8}
            value={newUser.description || ''}
            onChange={(e) => updateUserForm({ description: e.target.value })}
          />
        </Box>
        <Box
          w="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button onClick={handleUpdateProfile}>更新する</Button>
        </Box>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const session = await getSession(ctx)

    if (!session) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    const {
      data: { getCurrentUser },
    } = await client.query<GetCurrentUserQuery, GetCurrentUserQueryVariables>({
      query: GET_CURRENT_USER,
      variables: {
        accessToken: session.accessToken || '',
      },
    })

    if (!getCurrentUser) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    return {
      props: {
        currentUser: getCurrentUser,
      },
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    }
  }
}

export default ProfilePage
