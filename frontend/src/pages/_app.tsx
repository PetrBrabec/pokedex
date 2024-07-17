import "@mantine/core/styles.css"
import "@mantine/notifications/styles.css"
import { ApolloProvider } from "@apollo/client"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import type { AppProps } from "next/app"
import Head from "next/head"
import { DOMAIN } from "../../config"
import { theme } from "../../theme"
import { client } from "../apolloClient"

const title = "Pokedex by Petr Brabec"
const description = "Browse pokemons like never before!"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <MantineProvider theme={theme}>
        <Notifications position="bottom-right" />
        <Head>
          <title>{title}</title>
          <meta name="description" content={description} key="desc" />

          {/* Open Graph meta tags */}
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta
            property="og:image"
            content={`http://${DOMAIN}:3000/og-image.png`}
          />

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
