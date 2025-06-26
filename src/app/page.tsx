import { motion, Variants, useScroll, useTransform, useInView } from "framer-motion"
import { useRef } from "react"
import {
  ChevronRight,
  Code,
  Database,
  ExternalLink,
  FileText,
  Layers,
  Mail,
  MapPin,
  Monitor,
  Search,
  Server,
  User,
  Award,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TimelineItem } from "@/components/ui/timeline-item"
import { ProjectGallery3D } from "@/components/ui/project-gallery-3d"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,  
      staggerChildren: 0.15
    }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const
    }
  }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const
    }
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut" as const
    }
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

// Enhanced project data with categories and 3D gallery structure
const projects = [
  {
    id: "learning-management",
    title: "Paxel Learning Management System",
    description: "A learning management system that allows employees to learn and track their progress. Built with Vue.js and Django, it features real-time data streaming, customizable charts, collaborative sharing, and export capabilities.",
    image: "/images/paxel.jpg",
    badges: ["Vue.js", "Django", "Supabase", "Bucket"],
    liveUrl: "https://paxel-lms.vercel.app/",
    date: "2025",
    team: "Team of 5",
    featured: true,
    category: "Information Systems Development Project"
  },
  {
    id: "song-album-management",
    title: "Marmut - Song and Album Management System",
    description: "A song and album management system that allows users to manage their song and album resources. Built with Vue.js and Django, it features real-time data streaming, customizable charts, collaborative sharing, and export capabilities.",
    image: "/images/marmut.jpg",
    badges: ["Python", "Django", "Supabase", "SQL"],
    liveUrl: "https://marmut-basdat-e-5.vercel.app/login/",
    githubUrl: "https://github.com/Akmal76/BasisData-Proyek-Marmut",
    date: "2024",
    team: "Team of 4",
    featured: false,
    category: "Database"
  },
  {
    id: "employee-data",
    title: "Employee Data Analytics",
    description: "A data analytics system that allows users to manage their employee data. Built with Python and Django, it features real-time data streaming, customizable charts, collaborative sharing, and export capabilities.",
    image: "/images/ewd.jpg",
    badges: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    githubUrl: "https://drive.google.com/drive/folders/1Oo1g46mpL189dnLFtbaHlEjyCyO9hS9o?usp=sharing",
    date: "2025",
    team: "Team of 4",
    featured: false,
    category: "Data Analytics"
  },
  {
    id: "easelder",
    title: "EasElder",
    description: "Prototype of a mobile application aimed at supporting caregivers and family members in managing the daily healthcare and emergency needs of elderly individuals",
    image: "/images/easelder.jpg",
    badges: ["Figma"],
    liveUrl: "https://www.figma.com/proto/YvnBj2XFS2PkTLGrWC8SCx/EasElder?node-id=1502-21039&p=f&t=0wdnSCESW1M4toBB-1&scaling=min-zoom&content-scaling=fixed&page-id=1502%3A460&starting-point-node-id=1502%3A21039&show-proto-sidebar=1",
    date: "2024",
    team: "Team of 5",
    featured: false,
    category: "UI/UX Design"
  },
  {
    id: "btn-mobile-redesign",
    title: "Bale (BTN Mobile) Redesign",
    description: "A redesign of the Bale (BTN Mobile) app to improve user experience and functionality. Built with React Native and TypeScript, it features a modern design, improved navigation, and new features.",
    image: "/images/btn2.png",
    badges: ["Figma"],
    liveUrl: "https://www.figma.com/proto/9wdc4hvgqimaZHBCNvQhL8/Bale-BTN---new-code?node-id=30-4265&p=f&t=FyxCiozEfSHaXknO-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=30%3A4265&show-proto-sidebar=1",
    date: "2025",
    team: "Solo Project",
    featured: false,
    category: "Internship"
  },
  {
    id: "Dekoruma-Customer-Service",
    title: "Dekoruma Customer Service Management System",
    description: "A customer service management system that allows users to manage their customer service resources.",
    image: "/images/dekoruma.png",
    badges: ["Figma"],
    liveUrl: "https://www.figma.com/proto/vBiroW5bNKCYTEeKyscPhd/FIGMA-MHP?node-id=29-549&p=f&t=DEK00OvMMekyCHlA-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=29%3A549",
    date: "2024",
    team: "Team of 3",
    featured: false,
    category: "Customer Relationship Management"
  },
  {
    id: "library-management-system",
    title: "Library Management System",
    description: "A library management system that allows users to manage their library's resources.",
    image: "/images/library.jpg",
    badges: ["Python", "Django"],
    githubUrl: "https://github.com/example/ai-search",
    date: "2023",
    team: "Solo Project",
    featured: false,
    category: "Internship"
  },
]

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  return (
    <motion.div 
      className="relative min-h-screen bg-white"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Enhanced Header with scroll effects */}
      <motion.header 
        className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur-sm"
        variants={itemVariants}
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
        transition={{ duration: 0.3 }}
      >
        <div className="container flex h-16 items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Layers className="h-6 w-6 text-orange-500" />
            </motion.div>
            <span className="text-xl font-bold">Nabiel's Portfolio</span>
          </motion.div>
          <nav className="hidden md:flex items-center gap-6">
            {["About", "Skills", "Projects", "Experiences", "Contact"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm font-medium hover:text-orange-500 transition-colors relative"
                whileHover={{ scale: 1.1 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
              >
                {item}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-orange-500"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Mail className="mr-2 h-4 w-4" /> Get in Touch
            </Button>
          </motion.div>
        </div>
      </motion.header>

      <main>
        {/* Enhanced Hero Section with parallax */}
        <motion.section 
          ref={heroRef}
          className="relative overflow-hidden py-12 md:py-20"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <div className="absolute inset-0 -z-10">
            <motion.div 
              className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,237,213,0.8),rgba(255,255,255,0)_60%)]"
              animate={{ 
                background: [
                  "radial-gradient(circle at 30% 30%, rgba(255,237,213,0.8), rgba(255,255,255,0) 60%)",
                  "radial-gradient(circle at 70% 70%, rgba(255,237,213,0.8), rgba(255,255,255,0) 60%)",
                  "radial-gradient(circle at 30% 30%, rgba(255,237,213,0.8), rgba(255,255,255,0) 60%)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,149,0,0.15),rgba(255,255,255,0)_60%)]"
              animate={{ 
                background: [
                  "radial-gradient(circle at 80% 80%, rgba(255,149,0,0.15), rgba(255,255,255,0) 60%)",
                  "radial-gradient(circle at 20% 20%, rgba(255,149,0,0.15), rgba(255,255,255,0) 60%)",
                  "radial-gradient(circle at 80% 80%, rgba(255,149,0,0.15), rgba(255,255,255,0) 60%)"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <div className="container relative">
            <motion.div 
              className="grid gap-8 md:grid-cols-2 md:gap-12 items-center"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="space-y-6" variants={itemVariants}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-1 text-sm">
                    Information Science Student
                  </Badge>
                </motion.div>
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                >
                  Hello I'm <motion.span 
                    className="text-orange-500"
                    animate={{ 
                      textShadow: [
                        "0 0 0px rgba(249, 115, 22, 0)",
                        "0 0 20px rgba(249, 115, 22, 0.5)",
                        "0 0 0px rgba(249, 115, 22, 0)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    Nabiel
                  </motion.span>{" "}
                  <motion.span 
                    className="text-orange-500"
                    animate={{ 
                      textShadow: [
                        "0 0 0px rgba(249, 115, 22, 0)",
                        "0 0 20px rgba(249, 115, 22, 0.5)",
                        "0 0 0px rgba(249, 115, 22, 0)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  >
                    Ahmad
                  </motion.span>
                </motion.h1>
                <motion.p 
                  className="text-lg text-gray-600 max-w-md"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                I'm an Information Systems student with a strong interest in Project Management, Data Analytics, and Web Development. I enjoy leading teams, building functional systems, and uncovering insights that drive better digital products.</motion.p>
                <motion.div 
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(249, 115, 22, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className="bg-orange-500 hover:bg-orange-600"
                      onClick={() => {
                        const projectsSection = document.getElementById('projects');
                        projectsSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      View Projects <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05, borderColor: "rgb(249 115 22)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      className="border-orange-200 hover:bg-orange-100 hover:text-orange-700"
                      onClick={() => {
                        window.open('https://drive.google.com/file/d/1-b-rNt1PnvqU4mcQZULn1ODzlv0qCDwz/view?usp=drive_link', '_blank');
                      }}
                    >
                      Download Resume <FileText className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div 
                className="relative"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="relative z-10 rounded-2xl bg-white p-6 shadow-xl border border-orange-100"
                  whileHover={{ 
                    boxShadow: "0 25px 50px rgba(249, 115, 22, 0.15)",
                    borderColor: "rgb(249 115 22 / 0.3)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[4/5] overflow-hidden rounded-xl bg-gradient-to-br from-orange-400 to-orange-600">
                    <img
                      src="/images/profile.jpg"
                      alt="Nabiel - Information Science Student"
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-orange-100 -z-10"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                  }}
                />
                <motion.div 
                  className="absolute -top-6 -left-6 h-16 w-16 rounded-full bg-orange-200 -z-10"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, -180, -360]
                  }}
                  transition={{ 
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
                    rotate: { duration: 15, repeat: Infinity, ease: "linear" }
                  }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced About Section */}
        <motion.section 
          id="about" 
          className="py-12 md:py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="container">
            <motion.div 
              className="flex flex-col items-center text-center mb-12"
              variants={itemVariants}
            >
              <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200">About Me</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Who I Am</h2>
              <motion.div 
                className="w-20 h-1 bg-orange-500 mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
              {/* <p className="max-w-2xl text-gray-600">
                I'm an information science student passionate about solving complex problems through data analysis and
                information systems.
              </p> */}
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 gap-12 items-center"
              variants={staggerContainer}
            >
              <motion.div className="space-y-6" variants={itemVariants}>
                {[
                  { icon: User, title: "Personal Background", desc: "Hi! You can call me Nabiel. I'm from West Jakarta. I spend a lot of my time playing tennis or just hanging out with friends. I enjoy exploring creative digital stuff and I'm always excited to learn something new." },
                  { icon: Search, title: "Education", desc: "Final-year Information Systems student at the University of Indonesia, passionate about technology and digital innovation." },
                  { icon: Award, title: "Certificates", desc: "COMPFEST 16, Udemy UIUX from beginner to advance with projects, Foundations of Digital Marketing and E-commerce" }
                ].map((item, index) => (
                  <motion.div 
                    key={item.title}
                    className="flex items-start gap-4"
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="mt-1 bg-orange-100 p-3 rounded-lg"
                      whileHover={{ 
                        backgroundColor: "rgb(249 115 22)",
                        scale: 1.1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <item.icon className="h-5 w-5 text-orange-600" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div 
                className="relative"
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="relative z-10 rounded-2xl overflow-hidden"
                  whileHover={{ 
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)"
                  }}
                >
                  <img
                    src="/images/profile_btn.jpg"
                    alt="Working on data analysis"
                    className="w-full h-auto"
                  />
                </motion.div>
                <motion.div 
                  className="absolute -bottom-4 -right-4 w-64 h-64 bg-orange-100 rounded-full -z-10"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute -top-4 -left-4 w-32 h-32 bg-orange-200 rounded-full -z-10"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Skills Section */}
        <motion.section 
          id="skills" 
          className="py-12 md:py-16 bg-gradient-to-br from-orange-50 via-white to-orange-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="container">
            <motion.div 
              className="flex flex-col items-center text-center mb-12"
              variants={itemVariants}
            >
              <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200">My Expertise</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
              <motion.div 
                className="w-20 h-1 bg-orange-500 mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <p className="max-w-2xl text-gray-600">
                I've developed a diverse set of skills throughout my academic journey in information science.
              </p>
            </motion.div>

            <motion.div 
              className="space-y-8"
              variants={staggerContainer}
            >
              {/* First row - 3 cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Database,
                    title: "Data Management",
                    desc: "Experience with SQL, NoSQL databases, data modeling, and information architecture.",
                    badges: ["SQL", "Data Modeling", "Supabase", "PostgreSQL"]
                  },
                  {
                    icon: Search,
                    title: "Data Analysis",
                    desc: "Proficient in analyzing large datasets and extracting meaningful insights using various tools.",
                    badges: ["Python", "Statistical Analysis", "Data Visualization", "Data Cleaning"]
                  },
                  {
                    icon: Monitor,
                    title: "UI/UX Design",
                    desc: "Creating user-centered designs with focus on accessibility and usability.",
                    badges: ["Figma", "User Research", "Wireframing", "Prototyping"]
                  }
                ].map((skill, index) => (
                  <motion.div key={skill.title} variants={cardVariants}>
                    <Card className="overflow-hidden border-orange-100 transition-all duration-300 hover:shadow-lg hover:shadow-orange-100 h-full group">
                      <motion.div
                        variants={cardVariants}
                      >
                        <CardContent className="p-6">
                          <div className="mb-4">
                            <skill.icon className="h-8 w-8 text-orange-500" />
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">
                            {skill.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{skill.desc}</p>
                          <motion.div 
                            className="flex flex-wrap gap-2"
                            initial="hidden"
                            whileInView="visible"
                            variants={{
                              hidden: { opacity: 0 },
                              visible: {
                                opacity: 1,
                                transition: {
                                  staggerChildren: 0.1,
                                  delayChildren: index * 0.1
                                }
                              }
                            }}
                          >
                            {skill.badges.map((badge, badgeIndex) => (
                              <motion.div
                                key={badge}
                                variants={{
                                  hidden: { opacity: 0, scale: 0.8 },
                                  visible: { opacity: 1, scale: 1 }
                                }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 cursor-pointer">
                                  {badge}
                                </Badge>
                              </motion.div>
                            ))}
                          </motion.div>
                        </CardContent>
                      </motion.div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Second row - 2 cards centered */}
              <div className="flex justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                  {[
                    {
                      icon: Code,
                      title: "Web Development",
                      desc: "Building responsive and accessible web applications",
                      badges: ["HTML/CSS", "JavaScript", "React", "Vue.js", "Tailwind CSS", "Next.js", "TypeScript", "Golang"]
                    },
                    {
                      icon: Server,
                      title: "Information Systems",
                      desc: "Designing and implementing information systems that solve real-world problems.",
                      badges: ["System Analysis", "Process Modeling", "SDLC", "ERD", "UML"]
                    }
                  ].map((skill, index) => (
                    <motion.div key={skill.title} variants={cardVariants}>
                      <Card className="overflow-hidden border-orange-100 transition-all duration-300 hover:shadow-lg hover:shadow-orange-100 h-full group">
                        <motion.div
                          variants={cardVariants}
                        >
                          <CardContent className="p-6">
                            <div className="mb-4">
                              <skill.icon className="h-8 w-8 text-orange-500" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 transition-colors">
                              {skill.title}
                            </h3>
                            <p className="text-gray-600 mb-4">{skill.desc}</p>
                            <motion.div 
                              className="flex flex-wrap gap-2"
                              initial="hidden"
                              whileInView="visible"
                              variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                  opacity: 1,
                                  transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: (index + 3) * 0.1
                                  }
                                }
                              }}
                            >
                              {skill.badges.map((badge, badgeIndex) => (
                                <motion.div
                                  key={badge}
                                  variants={{
                                    hidden: { opacity: 0, scale: 0.8 },
                                    visible: { opacity: 1, scale: 1 }
                                  }}
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 cursor-pointer">
                                    {badge}
                                  </Badge>
                                </motion.div>
                              ))}
                            </motion.div>
                          </CardContent>
                        </motion.div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Projects Section with 3D Gallery */}
        <motion.section 
          id="projects" 
          className="py-12 md:py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="container mb-8">
            <motion.div 
              className="flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200">My Work</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
              <motion.div 
                className="w-20 h-1 bg-orange-500 mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <p className="max-w-2xl text-gray-600">
                Experience my projects in an immersive 3D gallery. Navigate through each project and discover the technologies and impact behind each creation.
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
          >
            <ProjectGallery3D projects={projects} />
          </motion.div>
        </motion.section>

        {/* Enhanced Education Section */}
        <motion.section 
          id="education" 
          className="py-12 md:py-16 bg-gradient-to-br from-orange-50 via-white to-orange-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="container">
            <motion.div 
              className="flex flex-col items-center text-center mb-12"
              variants={itemVariants}
            >
              <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200">My Background</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Experiences</h2>
              <motion.div 
                className="w-20 h-1 bg-orange-500 mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <p className="max-w-2xl text-gray-600">
                My organization and working experiences in the field of information science and campus.
              </p>
            </motion.div>

            <div className="relative">
              {/* Animated Timeline line */}
              <motion.div 
                className="absolute left-4 md:left-1/2 w-0.5 bg-orange-200 transform -translate-x-1/2"
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                viewport={{ once: true }}
              />

              <motion.div 
                className="space-y-12"
                variants={staggerContainer}
              >
                {[
                  {
                    year: "2025",
                    title: "Retail Funding - IT Support Internship",
                    institution: "PT. Bank Tabungan Negara Tbk",
                    description: "During my internship, I redesigned the Bale Poin feature for the Bale mobile app and analyzed millions of loyalty transaction records using Python to identify user behavior patterns. I used Figma to implement a new UI/UX based on PRD and past iterations, and collaborated with internal teams and external vendors through weekly design reviews. I also created data visualizations to segment users by point activity, supporting more data-driven loyalty strategies.",
                    isLeft: true
                  },
                  {
                    year: "2024",
                    title: "Person in Charge of Seminar",
                    institution: "COMPFEST 16",
                    description: "As the Person in Charge of Seminar at COMPFEST 16, I led a team of staff to organize and execute a series of seminars and workshops focused on IT-related fields such as UI/UX Design, Software Engineering, and Data Science. I was responsible for overseeing the entire process from curating relevant topics and selecting impactful speakers, to managing schedules, venue logistics, and on-the-day execution.",
                    isLeft: false
                  },
                  {
                    year: "2024",
                    title: "Head of Bureau at Human Resource",
                    institution: "BEM Fasilkom UI",
                    description: "Responsible for managing the Human Resource Bureau at BEM Fasilkom UI 2025, focusing on the recruitment, training, and development of organizational members. Led initiatives to foster growth, engagement, and collaboration across the entire BEM, supporting member development throughout the year.",
                    isLeft: true
                  },
                  {
                    year: "2022 - 2026 (Expected)",
                    title: "Information Systems Student",
                    institution: "University of Indonesia",
                    description: "Learning about information systems, database, web development, and user experience design.",
                    isLeft: false
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TimelineItem {...item} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Enhanced Contact Section */}
        <motion.section 
          id="contact" 
          className="py-12 md:py-16 bg-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="container">
            <motion.div 
              className="flex flex-col items-center text-center mb-12"
              variants={itemVariants}
            >
              <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-200">Get In Touch</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Me</h2>
              <motion.div 
                className="w-20 h-1 bg-orange-500 mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <p className="max-w-2xl text-gray-600">
                Interested in collaborating or have questions? Feel free to reach out!
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 gap-12"
              variants={staggerContainer}
            >
              <motion.div 
                className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl text-white"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(249, 115, 22, 0.3)"
                }}
              >
                <motion.h3 
                  className="text-2xl font-bold mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Let's Connect
                </motion.h3>
                <motion.p 
                  className="mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your
                  vision.
                </motion.p>

                <motion.div 
                  className="space-y-6"
                  variants={staggerContainer}
                >
                  {[
                    { icon: Mail, label: "Email", value: "nabielflx@gmail.com" },
                    { icon: MapPin, label: "Location", value: "Jakarta, Indonesia" }
                  ].map((contact, index) => (
                    <motion.div 
                      key={contact.label}
                      className="flex items-center gap-4"
                      variants={itemVariants}
                      whileHover={{ x: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className="bg-white/20 p-3 rounded-full"
                        whileHover={{ 
                          backgroundColor: "rgba(255, 255, 255, 0.3)",
                          scale: 1.1
                        }}
                      >
                        <contact.icon className="h-5 w-5" />
                      </motion.div>
                      <div>
                        <p className="text-sm text-orange-100">{contact.label}</p>
                        <p className="font-medium">{contact.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div 
                  className="mt-8 pt-8 border-t border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="mb-4 text-orange-100">Follow me on social media</p>
                  <motion.div 
                    className="flex gap-4"
                    variants={staggerContainer}
                  >
                    {[
                      { 
                        name: "X", 
                        url: "https://x.com/sanabieel",
                        path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                      },
                      { 
                        name: "Instagram", 
                        url: "https://www.instagram.com/nabielardhityo_",
                        path: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" 
                      },
                      { 
                        name: "GitHub", 
                        url: "https://github.com/sanabiel",
                        path: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" 
                      },
                      { 
                        name: "LinkedIn", 
                        url: "https://www.linkedin.com/in/nabiel-ahmad-b30987247",
                        path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" 
                      }
                    ].map((social, index) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
                        variants={itemVariants}
                        whileHover={{ 
                          scale: 1.2,
                          backgroundColor: "rgba(255, 255, 255, 0.4)",
                          rotate: 360
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d={social.path} clipRule="evenodd" />
                        </svg>
                      </motion.a>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div 
                className="bg-orange-50 p-8 rounded-2xl"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)"
                }}
              >
                <motion.h3 
                  className="text-2xl font-bold mb-6"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Send Me a Message
                </motion.h3>
                <motion.form 
                  className="space-y-4"
                  variants={staggerContainer}
                >
                  <motion.div 
                    className="grid grid-cols-2 gap-4"
                    variants={itemVariants}
                  >
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <motion.input
                        id="name"
                        type="text"
                        className="w-full rounded-md border border-orange-200 bg-white px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        placeholder="Your name"
                        whileFocus={{ scale: 1.02, borderColor: "rgb(249 115 22)" }}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <motion.input
                        id="email"
                        type="email"
                        className="w-full rounded-md border border-orange-200 bg-white px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                        placeholder="Your email"
                        whileFocus={{ scale: 1.02, borderColor: "rgb(249 115 22)" }}
                      />
                    </div>
                  </motion.div>
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <motion.input
                      id="subject"
                      type="text"
                      className="w-full rounded-md border border-orange-200 bg-white px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all"
                      placeholder="Subject"
                      whileFocus={{ scale: 1.02, borderColor: "rgb(249 115 22)" }}
                    />
                  </motion.div>
                  <motion.div className="space-y-2" variants={itemVariants}>
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <motion.textarea
                      id="message"
                      className="h-32 w-full rounded-md border border-orange-200 bg-white px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all resize-none"
                      placeholder="Your message"
                      whileFocus={{ scale: 1.02, borderColor: "rgb(249 115 22)" }}
                    />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button className="w-full bg-orange-500 hover:bg-orange-600">
                        Send Message <Mail className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </motion.div>
                </motion.form>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Enhanced Footer */}
      <motion.footer 
        className="bg-gray-900 text-white py-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="container">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="flex items-center gap-2 mb-6 md:mb-0"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Layers className="h-6 w-6 text-orange-500" />
              </motion.div>
              <span className="text-xl font-bold">Sanabiel</span>
            </motion.div>
            <motion.p 
              className="text-sm text-gray-400"
              variants={itemVariants}
            >
              &copy; {new Date().getFullYear()} Made with ❤️ by Nabiel
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  )
} 