"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { ArrowDown, Sparkles } from "lucide-react"

export default function AnimatedLanding({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [confettiTriggered, setConfettiTriggered] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null)

  // Track mouse movement for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const winHeight = window.innerHeight
      const triggerHeight = winHeight * 2
      
      const progress = Math.min(scrollTop / triggerHeight, 1)
      setScrollProgress(progress)

      if (progress >= 0.9 && !confettiTriggered) {
        triggerConfetti()
        setConfettiTriggered(true)

        setTimeout(() => {
          setAnimationComplete(true)
          onAnimationComplete()
        }, 1500)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [confettiTriggered, onAnimationComplete])

  // Enhanced confetti animation
  const triggerConfetti = () => {
    if (!confettiCanvasRef.current) return

    const canvas = confettiCanvasRef.current
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    })

    // Multiple confetti bursts for more impact
    const colors = ["#f97316", "#fb923c", "#fdba74", "#ffedd5", "#ffffff", "#fbbf24"]
    
    // Main burst
    myConfetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.5, x: 0.5 },
      colors: colors,
      startVelocity: 45,
      gravity: 0.8,
    })

    // Side bursts
    setTimeout(() => {
      myConfetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6, x: 0.2 },
        colors: colors,
        startVelocity: 35,
      })
      myConfetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6, x: 0.8 },
        colors: colors,
        startVelocity: 35,
      })
    }, 200)

    // Final sparkle effect
    setTimeout(() => {
      myConfetti({
        particleCount: 50,
        spread: 360,
        origin: { y: 0.4, x: 0.5 },
        colors: ["#fbbf24", "#f59e0b"],
        startVelocity: 20,
        gravity: 0.3,
        shapes: ["star"],
      })
    }, 400)
  }

  const scale = 1 + scrollProgress * 5
  const opacity = Math.max(0, 1 - scrollProgress * 1.2)
  const blur = scrollProgress * 2

  // Floating particles animation
  const particles = Array.from({ length: 20 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-orange-300 rounded-full opacity-30"
      animate={{
        x: [0, Math.random() * 100 - 50, 0],
        y: [0, Math.random() * 100 - 50, 0],
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 2,
      }}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  ))

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none overflow-hidden">
        {/* Background gradient that responds to mouse */}
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.3), transparent 50%)`,
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {particles}
        </div>

        {/* Canvas for confetti */}
        <canvas ref={confettiCanvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Main portfolio text with enhanced effects */}
        <div
          className="relative transition-all duration-300 ease-out"
          style={{
            transform: `scale(${scale}) rotate(${scrollProgress * 2}deg)`,
            opacity: opacity,
            filter: `blur(${blur}px)`,
            display: animationComplete ? "none" : "block",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Glowing background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 blur-xl opacity-30 animate-pulse" />
            
            {/* Main text with gradient */}
            <h1 className="relative text-6xl md:text-8xl font-bold tracking-widest text-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              PORTFOLIO
            </h1>
            
            {/* Sparkle effects */}
            <motion.div
              className="absolute -top-4 -right-4 text-orange-400"
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <Sparkles className="h-8 w-8" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-4 -left-4 text-orange-300"
              animate={{ 
                rotate: -360,
                scale: [1, 1.3, 1],
              }}
              transition={{ 
                rotate: { duration: 5, repeat: Infinity, ease: "linear" },
                scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
              }}
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </div>

        {/* Enhanced scroll indicator */}
        {scrollProgress < 0.1 && (
          <motion.div 
            className="absolute bottom-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <div className="flex flex-col items-center text-orange-500">
              <motion.span 
                className="text-sm mb-2 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Scroll to Explore
              </motion.span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="h-6 w-6" />
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Progress indicator */}
        {scrollProgress > 0.1 && scrollProgress < 0.9 && (
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col items-center text-orange-500">
              <div className="w-32 h-1 bg-orange-200 rounded-full overflow-hidden mb-2">
                <motion.div 
                  className="h-full bg-gradient-to-r from-orange-400 to-orange-600"
                  style={{ width: `${scrollProgress * 100}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="text-xs font-medium">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Spacer with dynamic height */}
      <div style={{ height: `${typeof window !== 'undefined' ? window.innerHeight * 3 : 2400}px` }} />
    </>
  )
} 