import { useState, useRef } from "react"
import { motion, AnimatePresence, useTransform, useMotionValue, useSpring } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Github, Calendar, Users, Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

// Figma Icon Component
const FigmaIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.02s-1.354-3.02-3.019-3.02h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.02 3.019 3.02h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 0 0-3.019 3.019c0 1.665 1.365 3.019 3.044 3.019 1.705 0 3.093-1.376 3.093-3.068v-2.97H8.148z"/>
  </svg>
)

interface Project {
  id: string
  title: string
  description: string
  image: string
  badges: string[]
  liveUrl?: string
  githubUrl?: string
  date: string
  team?: string
  featured?: boolean
  category: string
}

interface ProjectGallery3DProps {
  projects: Project[]
}

export function ProjectGallery3D({ projects }: ProjectGallery3DProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const currentProject = projects[currentIndex]

  // Mouse tracking for 3D effects
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]))
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]))

  // Mouse move handler for 3D effects
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const x = event.clientX - centerX
    const y = event.clientY - centerY
    
    mouseX.set(x)
    mouseY.set(y)
    setMousePosition({ x, y })
  }

  const nextProject = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
      setIsTransitioning(false)
    }, 200)
  }

  const prevProject = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))
      setIsTransitioning(false)
    }, 200)
  }

  const goToProject = (index: number) => {
    if (index === currentIndex) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex(index)
      setIsTransitioning(false)
    }, 200)
  }

  return (
    <div 
      ref={containerRef}
      className="relative w-full overflow-hidden bg-gradient-to-br from-gray-50 via-orange-50 to-gray-100 rounded-3xl"
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.2), transparent 50%)",
              "radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.2), transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(249, 115, 22, 0.2), transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.2), transparent 50%)",
              "radial-gradient(circle at 20% 20%, rgba(249, 115, 22, 0.2), transparent 50%)"
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 200 - 100, 0],
              y: [0, Math.random() * 200 - 100, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex md:items-center justify-center md:min-h-[80vh] px-4 py-16 sm:px-6 md:px-8 md:py-0">
        <motion.div 
          className="grid md:grid-cols-2 gap-16 w-full max-w-7xl items-center"
          animate={isTransitioning ? { rotateY: 10, scale: 0.95 } : { rotateY: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          
          {/* 3D Project Image */}
          <motion.div 
            className="relative flex justify-center items-center"
            style={{
              perspective: "1000px",
            }}
            animate={isTransitioning ? { x: -50, opacity: 0.7 } : { x: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                className="relative"
                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  rotateY: 0,
                }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                style={{
                  transformStyle: "preserve-3d",
                  rotateX: rotateX,
                  rotateY: rotateY,
                }}
              >
                {/* 3D Frame Effect */}
                <div className="relative">
                  {/* Shadow/Depth layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl transform translate-x-4 translate-y-4 blur-xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl transform translate-x-2 translate-y-2" />
                  
                  {/* Main image container */}
                  <motion.div 
                    className="relative bg-white p-4 rounded-2xl shadow-2xl transform-gpu border border-gray-200"
                    whileHover={{ 
                      scale: 1.05,
                      rotateX: 5,
                      rotateY: 5,
                      z: 50
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Featured badge */}
                    {currentProject.featured && (
                      <motion.div
                        className="absolute -top-3 -right-3 z-20 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                      >
                        <Star className="h-4 w-4 inline mr-1" />
                        Scrum Master
                      </motion.div>
                    )}
                    
                    {/* Project image */}
                    <div className="relative overflow-hidden rounded-xl">
                      <motion.img
                        src={currentProject.image}
                        alt={currentProject.title}
                        className="w-full h-64 sm:h-80 object-cover"
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                      />
                      
                      {/* Hover overlay */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-orange-500/80 via-transparent to-transparent opacity-0"
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex gap-2">
                            {currentProject.liveUrl && (
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Button
                                  size="sm"
                                  className="bg-white text-orange-600 hover:bg-orange-50"
                                  onClick={() => window.open(currentProject.liveUrl, '_blank')}
                                >
                                  {currentProject.liveUrl.includes('figma.com') ? (
                                    <>
                                      <FigmaIcon className="h-4 w-4 mr-1" />
                                      Prototype
                                    </>
                                  ) : (
                                    <>
                                      <ExternalLink className="h-4 w-4 mr-1" />
                                      Live
                                    </>
                                  )}
                                </Button>
                              </motion.div>
                            )}
                            {currentProject.githubUrl && (
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="bg-white/20 border-white text-white hover:bg-white/30"
                                  onClick={() => window.open(currentProject.githubUrl, '_blank')}
                                >
                                  <Github className="h-4 w-4 mr-1" />
                                  Code
                                </Button>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* 3D frame edges */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-gradient-to-br from-orange-200 to-orange-400 opacity-50" />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Dynamic Information Panel */}
          <motion.div 
            className="relative text-gray-800"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              x: isTransitioning ? 50 : 0,
              opacity: isTransitioning ? 0.7 : 1,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id}
                initial={{ opacity: 0, y: 30, x: 30 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -30, x: -30 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-4 md:space-y-5"
              >
                {/* Category */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-3 py-1">
                    {currentProject.category}
                  </Badge>
                </motion.div>

                {/* Title */}
                <motion.h2 
                  className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-orange-600 to-orange-500 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {currentProject.title}
                </motion.h2>

                {/* Meta info */}
                <motion.div 
                  className="flex items-center gap-4 text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{currentProject.date}</span>
                  </div>
                  {currentProject.team && (
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span className="text-sm">{currentProject.team}</span>
                    </div>
                  )}
                </motion.div>

                {/* Description */}
                <motion.p 
                  className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {currentProject.description}
                </motion.p>

                {/* Technologies */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <h4 className="text-sm font-semibold text-orange-600 uppercase tracking-wider">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.badges.map((badge, index) => (
                      <motion.div
                        key={badge}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <Badge 
                          variant="outline" 
                          className="bg-white border-gray-300 text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all duration-300"
                        >
                          {badge}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  {currentProject.liveUrl && (
                    <motion.div
                      whileHover={{ scale: 1.05, x: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-orange-500/25"
                        onClick={() => window.open(currentProject.liveUrl, '_blank')}
                      >
                        {currentProject.liveUrl.includes('figma.com') ? (
                          <>
                            <FigmaIcon className="h-4 w-4 mr-2" />
                            View Prototype
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        ) : (
                          <>
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Live Site
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                  
                  {currentProject.githubUrl && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        variant="outline"
                        className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                        onClick={() => window.open(currentProject.githubUrl, '_blank')}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Previous Button */}
          <motion.button
            className="bg-white/80 backdrop-blur-sm border border-gray-200 p-2 sm:p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
            onClick={prevProject}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(249, 115, 22, 0.1)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </motion.button>

          {/* Project Indicators */}
          <div className="flex gap-2">
            {projects.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-orange-500 w-8' 
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                onClick={() => goToProject(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          {/* Next Button */}
          <motion.button
            className="bg-white/80 backdrop-blur-sm border border-gray-200 p-2 sm:p-3 rounded-full hover:bg-white transition-all duration-300 shadow-lg"
            onClick={nextProject}
            whileHover={{ scale: 1.1, backgroundColor: "rgba(249, 115, 22, 0.1)" }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </motion.button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 z-20 rounded-t-3xl">
        <motion.div 
          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-t-3xl"
          initial={{ width: "0%" }}
          animate={{ width: `${((currentIndex + 1) / projects.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Side Navigation Hints */}
      <motion.div 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm hidden md:flex"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-gradient-to-b from-transparent via-gray-400 to-transparent" />
          <span className="writing-mode-vertical text-xs tracking-wider">NAVIGATE</span>
          <div className="w-px h-8 bg-gradient-to-b from-gray-400 via-transparent to-transparent" />
        </div>
      </motion.div>
    </div>
  )
} 