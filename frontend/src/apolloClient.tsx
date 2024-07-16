import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client"
import { createFragmentRegistry } from "@apollo/client/cache"
import { onError } from "@apollo/client/link/error"
import { RetryLink } from "@apollo/client/link/retry"
import { notifications } from "@mantine/notifications"
import { IconCloudDataConnection } from "@tabler/icons-react"

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    for (const { message, locations, path } of graphQLErrors) {
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    }
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`)
    // You can add your notification logic here
    notifications.show({
      icon: <IconCloudDataConnection />,
      color: "red",
      title: "Network error",
      message: networkError.message,
    })
  }
})

// Retry link with exponential backoff
const retryLink = new RetryLink({
  attempts: {
    max: 5, // Maximum number of attempts
    retryIf: (error, _operation) => !!error,
  },
  delay: {
    initial: 300, // Initial delay in ms
    max: 10000, // Maximum delay in ms
    jitter: true, // Add some randomization to avoid thundering herd problem
  },
})

const httpLink = new HttpLink({ uri: "http://localhost:4000/graphql" })

export const client = new ApolloClient({
  link: ApolloLink.from([errorLink, retryLink, httpLink]),
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(gql`
      fragment PokemonBase on Pokemon {
        id
        name
        isFavorite
        types
      }
    `),
  }),
})
