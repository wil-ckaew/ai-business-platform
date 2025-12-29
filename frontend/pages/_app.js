import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps, router }) {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait" initial={false}>
        <div className="h-screen">
          <Component key={router.route} {...pageProps} />
        </div>
      </AnimatePresence>
    </AuthProvider>
  )
}

export default MyApp
