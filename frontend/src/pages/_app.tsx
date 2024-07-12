import "@mantine/core/styles.css"
import Head from "next/head"
import { MantineProvider } from "@mantine/core"
import { theme } from "../../theme"
import type { AppProps } from "next/app"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <MantineProvider theme={theme}>
        <Head>
          <title>Pokedex</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
          <link rel="shortcut icon" href="/favicon.svg" />
        </Head>
        <Component {...pageProps} />
      </MantineProvider>
    </ApolloProvider>
  )
}
