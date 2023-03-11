import '../styles/app.scss'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence } from "framer-motion"

export default function App({ Component, pageProps }: AppProps) {
  
  return (
  <AnimatePresence exitBeforeEnter  initial={false} >
  <ChakraProvider>
  <Component {...pageProps} />
  </ChakraProvider>
  </AnimatePresence>
  )
}
