import { ApolloServer } from 'apollo-server'
import { createContext } from '../../graphql/context'
import { schema } from '../../graphql/schema'

const server = new ApolloServer({ schema, context: createContext })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
