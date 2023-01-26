import '../styles/app.scss'
import { Barlow } from '@next/font/google'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence } from "framer-motion"

const barlow = Barlow({
  weight: ['200','300','400','500','900'],
  subsets: ['latin'],
  variable: '--barlow-font',
})

export default function App({ Component, pageProps }: AppProps) {
  
  return (
  <AnimatePresence exitBeforeEnter  initial={false} >
  <ChakraProvider>
  <Component {...pageProps} />
  </ChakraProvider>
  </AnimatePresence>
  )
}
