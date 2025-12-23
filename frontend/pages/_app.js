import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <div className="h-screen">
        <Component key={router.route} {...pageProps} />
      </div>
    </AnimatePresence>
  )
}

export default MyApp
