import { Box, Spinner } from '@chakra-ui/react'
import { GetStaticPropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { addApolloState, initializeApollo } from '~/lib/apolloClient'
import { GET_GROUP_BY_PRODUCT_ID } from '~/queries'
import {
  GetGroupByProductIdQuery,
  GetGroupByProductIdQueryVariables,
  Group,
} from '~/types/generated/graphql'

const client = initializeApollo()

type Props = {
  group?: Group
}

const GroupPage: NextPage<Props> = ({ group }) => {
  const router = useRouter()

  if (router.isFallback || !group) {
    return (
      <Box
        w="100%"
        h="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="lg" />
      </Box>
    )
  }

  return (
    <Box textAlign="center">
      <p>group page</p>
    </Box>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export const getStaticProps = async (
  context: GetStaticPropsContext<{ productId: string }>
) => {
  const productId = context.params?.productId

  if (!productId) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }

  try {
    const {
      data: { getGroupByProductId },
    } = await client.query<
      GetGroupByProductIdQuery,
      GetGroupByProductIdQueryVariables
    >({
      query: GET_GROUP_BY_PRODUCT_ID,
      variables: {
        productId: productId,
      },
    })

    if (!getGroupByProductId) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      }
    }

    return addApolloState(client, {
      props: {
        group: getGroupByProductId,
      },
      revalidate: 30,
    })
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/404',
      },
    }
  }
}

export default GroupPage
