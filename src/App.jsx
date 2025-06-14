import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from '@/components/theme-provider'
import AnimatedLanding from '@/components/AnimatedLanding'
import Home from '@/app/page'

function App() {
  const [showPortfolio, setShowPortfolio] = useState(false)

  const handleAnimationComplete = () => {
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setShowPortfolio(true)
      // Scroll to top when portfolio appears
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 200)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <AnimatePresence mode="wait">
        {!showPortfolio ? (
          <AnimatedLanding 
            key="landing"
            onAnimationComplete={handleAnimationComplete} 
          />
        ) : (
          <Home key="portfolio" />
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App
