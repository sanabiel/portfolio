import { motion } from "framer-motion"

interface TimelineItemProps {
  year: string
  title: string
  institution: string
  description: string
  isLeft: boolean
}

export function TimelineItem({ year, title, institution, description, isLeft }: TimelineItemProps) {
  return (
    <motion.div
      className={`relative flex items-center ${
        isLeft ? "md:flex-row-reverse md:text-right" : "md:flex-row md:text-left"
      }`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 z-10"></div>

      {/* Content */}
      <div className={`w-full md:w-5/12 ${isLeft ? "md:pr-8" : "md:pl-8"} ml-12 md:ml-0`}>
        <div className="bg-white p-6 rounded-lg shadow-lg border border-orange-100">
          <div className="text-sm text-orange-600 font-semibold mb-2">{year}</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <div className="text-orange-500 font-medium mb-3">{institution}</div>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Empty space for the other side */}
      <div className="hidden md:block w-5/12"></div>
    </motion.div>
  )
} 