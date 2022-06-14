import { Box, Spinner, Textarea } from '@chakra-ui/react'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'
import { MessageBubble } from '~/components/domains/message/MessageBubble'
import { RoomIcon } from '~/components/domains/room/RoomIcon'
import { RoomName } from '~/components/domains/room/RoomName'
import { SolidIcon, Text } from '~/components/parts/commons'
import { RoomSidebar } from '~/components/parts/layout/RoomSidebar'
import { SIZING } from '~/constants'
import { useToast } from '~/hooks'
import { initializeApollo } from '~/lib/apolloClient'
import { GET_CURRENT_USER, GET_ROOM, GET_ROOM_MEMBERS } from '~/queries'
import {
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables,
  GetRoomMembersQuery,
  GetRoomMembersQueryVariables,
  GetRoomQuery,
  GetRoomQueryVariables,
  MessageType,
  ReadManagement,
  Room,
  useCreateMessageMutation,
  useGetMessagesQuery,
  useGetReadManagementsQuery,
  User,
  useUpdateReadManagementMutation,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  currentUser: User
  room: Room
}

const RoomPage: NextPage<Props> = ({ currentUser, room }) => {
  const { toast } = useToast()
  const [messageText, setMessageText] = useState('')
  const [messageDateIndexes, setMessageDateIndexes] = useState<number[]>([])

  const { data: messagesData } = useGetMessagesQuery({
    variables: {
      roomId: room.id,
    },
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    if (!messagesData?.GetMessages) return
    setMessageDateIndexes([])

    messagesData.GetMessages.forEach((message, i) => {
      const messageDate = new Date(message.createdAt).toLocaleDateString()

      const messagesDataIndex = messagesData.GetMessages.findIndex((ms) => {
        return messageDate === new Date(ms.createdAt).toLocaleDateString()
      })

      if (messagesDataIndex === i) {
        setMessageDateIndexes((prev) => [...prev, i])
      }
    })
  }, [messagesData, setMessageDateIndexes])

  const { data: readManagementsData } = useGetReadManagementsQuery({
    variables: {
      targetUserId: currentUser.id,
    },
    fetchPolicy: 'cache-and-network',
  })

  const [createMessageMutation] = useCreateMessageMutation({
    refetchQueries: ['GetMessages'],
  })

  const [updateReadManagementMutation] = useUpdateReadManagementMutation({
    refetchQueries: ['GetMessages'],
  })

  const updateReadManagement = useCallback(
    async (readManagements: ReadManagement[], index: number) => {
      const readManagement = readManagements[index]
      if (readManagement.isRead) return

      try {
        await updateReadManagementMutation({
          variables: {
            targetUserId: readManagement.targetUserId,
            messageId: readManagement.messageId,
          },
        })
        if (readManagements.length - 1 <= index) return
        await updateReadManagement(readManagements, index + 1)
      } catch (error) {
        if (error instanceof Error) {
          toast({
            title: error.message,
            status: 'error',
          })
        }
      }
    },
    [toast, updateReadManagementMutation]
  )

  useEffect(() => {
    if (
      !readManagementsData?.GetReadManagements ||
      readManagementsData.GetReadManagements.length === 0
    )
      return

    updateReadManagement(readManagementsData.GetReadManagements, 0)
  }, [readManagementsData, updateReadManagement])

  const sendMessageText = async () => {
    try {
      await createMessageMutation({
        variables: {
          messageType: MessageType.Text,
          roomId: room.id,
          body: messageText,
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: error.message,
          status: 'error',
        })
      }
    } finally {
      setMessageText('')
    }
  }
  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <Box display={{ base: 'none', md: 'block' }}>
        <RoomSidebar currentUser={currentUser} />
      </Box>
      <Box
        position="relative"
        flex="1"
        display="flex"
        flexDirection="column"
        w="100%"
        h={`calc(100vh - ${SIZING.headerHeight})`}
      >
        <Box
          p="12px"
          display="flex"
          alignItems="center"
          gap="8px"
          position="absolute"
          zIndex="1"
          top="0"
          left="0"
          bgColor="rgba(237, 242, 247, 0.85)"
          backdropFilter="auto"
          backdropBlur="12px"
          w="100%"
        >
          <RoomIcon room={room} currentUserId={currentUser.id} size="sm" />
          <RoomName room={room} currentUserId={currentUser.id} size="lg" />
        </Box>
        <Box flex="1" overflowY="auto" p="76px 16px 24px">
          {messagesData?.GetMessages ? (
            messagesData.GetMessages.map((message, i) => {
              return (
                <Box mb="8px" key={message.id}>
                  {messageDateIndexes.includes(i) && (
                    <Box textAlign="center" py="12px">
                      <Text fontSize="sm" color="text.light" isBold>
                        {new Date(message.createdAt).toLocaleDateString()}
                      </Text>
                    </Box>
                  )}
                  <MessageBubble
                    currentUserId={currentUser.id}
                    message={message}
                  />
                </Box>
              )
            })
          ) : (
            <Box
              w="100%"
              h="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner size="md" />
            </Box>
          )}
        </Box>
        <Box
          p="12px 24px"
          display="flex"
          alignItems="center"
          gap="12px"
          borderTop="2px solid"
          borderColor="secondary.light"
        >
          <Textarea
            bgColor="white.main"
            boxShadow="0 3px 6px rgba(0, 0, 0, 0.16)"
            rows={1}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          />
          <Box
            transform="rotate(90deg)"
            w="fit-content"
            cursor="pointer"
            position="relative"
            _hover={{ opacity: 0.7 }}
            onClick={sendMessageText}
          >
            <SolidIcon icon="SOLID_PAPER_AIRPLANE" size={24} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const session = await getSession(ctx)
    const roomId = ctx.params?.roomId as string | undefined

    const {
      data: { getCurrentUser },
    } = await client.query<GetCurrentUserQuery, GetCurrentUserQueryVariables>({
      query: GET_CURRENT_USER,
      variables: {
        accessToken: session?.accessToken || '',
      },
    })

    const {
      data: { GetRoom },
    } = await client.query<GetRoomQuery, GetRoomQueryVariables>({
      query: GET_ROOM,
      variables: {
        getRoomId: roomId || '',
      },
      fetchPolicy: 'network-only',
    })

    if (!getCurrentUser || !GetRoom) {
      return {
        redirect: {
          permanent: false,
          destination: '/',
        },
      }
    }

    const {
      data: { getRoomMembers },
    } = await client.query<GetRoomMembersQuery, GetRoomMembersQueryVariables>({
      query: GET_ROOM_MEMBERS,
      variables: {
        roomId: roomId || '',
      },
      fetchPolicy: 'network-only',
    })

    if (
      getRoomMembers.every(
        (roomMember) => roomMember.userId !== getCurrentUser.id
      )
    ) {
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
        room: GetRoom,
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

export default RoomPage
