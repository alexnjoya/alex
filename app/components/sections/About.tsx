'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaServer, FaEthereum, FaArrowRight, FaGraduationCap, FaBrain, FaRocket, FaUser, FaLightbulb, FaBullseye } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

const expertiseAreas = [
  {
    icon: <FaCode className="text-2xl" />,
    title: 'Frontend Development',
    description: 'Building responsive and interactive user interfaces using modern JavaScript frameworks like React.js and Next.js, enhanced with Tailwind CSS.',
    skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    gradient: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500/30',
    bgColor: 'bg-blue-50/50 dark:bg-blue-900/10'
  },
  {
    icon: <FaEthereum className="text-2xl" />,
    title: 'Blockchain Development',
    description: 'Creating smart contracts and decentralized applications (DApps) on Ethereum using Solidity, with tools like Remix and Hardhat.',
    skills: ['Solidity', 'Ethereum', 'Web3.js', 'Hardhat'],
    gradient: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-50/50 dark:bg-purple-900/10'
  },
  {
    icon: <FaServer className="text-2xl" />,
    title: 'Full-Stack Integration',
    description: 'Connecting frontend interfaces with backend systems and blockchain networks to create cohesive, end-to-end solutions.',
    skills: ['Node.js', 'Express', 'MongoDB', 'APIs'],
    gradient: 'from-green-500 to-emerald-500',
    borderColor: 'border-green-500/30',
    bgColor: 'bg-green-50/50 dark:bg-green-900/10'
  }
];

const personalInfo = [
  {
    icon: <FaGraduationCap className="text-xl" />,
    title: 'Background & Education',
    content: 'I am a final-year Computer Science student at the University of Ghana with a passion for creating elegant, user-friendly software solutions. My journey in tech has been driven by curiosity and a desire to build applications that solve real-world problems.',
    link: '#education',
    linkText: 'View education details'
  },
  {
    icon: <FaBrain className="text-xl" />,
    title: 'Technical Interests',
    content: 'As a developer, I specialize in frontend engineering and blockchain application development. I enjoy the creative aspects of frontend work—crafting intuitive user interfaces—while also diving into the innovative world of blockchain technology.',
    link: '#skills',
    linkText: 'View skills & technologies'
  },
  {
    icon: <FaRocket className="text-xl" />,
    title: 'Current Focus',
    content: 'Currently, I\'m focused on expanding my knowledge in Web3 technologies and exploring how decentralized systems can create more transparent processes. I\'m also co-founding FineTun-ai, a platform to help businesses customize AI models.',
    link: '#projects',
    linkText: 'View my projects'
  }
];

export default function About() {
  const [hoveredExpertise, setHoveredExpertise] = useState<number | null>(null);
  const [activePersonalInfo, setActivePersonalInfo] = useState(0);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Subtle parallax effects
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -75]);
  const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section 
      id="about"
      ref={containerRef}
      className="min-h-screen  bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <motion.div 
          style={{ y: smoothY1 }}
          animate={floatingAnimation}
          className="absolute top-20 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: smoothY2 }}
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 z-10 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 dark:bg-blue-400/10 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <FaUser className="text-blue-500" />
              About Me
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-6">
              My Journey & Expertise
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              A passionate developer on a mission to create elegant digital solutions that solve real-world problems.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20 max-w-4xl mx-auto"
          >
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
              <FaGraduationCap className="text-3xl text-blue-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">2025</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Graduate</div>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
              <FaCode className="text-3xl text-purple-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">3+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Years Coding</div>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
              <FaRocket className="text-3xl text-green-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">15+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Projects</div>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
              <FaBullseye className="text-3xl text-orange-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">1</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Startup</div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Personal Info Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8">
                Get to Know Me
              </h3>
              
              {personalInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  onClick={() => setActivePersonalInfo(index)}
                  className={`cursor-pointer transition-all duration-300 ${
                    activePersonalInfo === index 
                      ? 'transform scale-105' 
                      : 'hover:transform hover:scale-102'
                  }`}
                >
                  <div className={`p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border-l-4 ${
                    activePersonalInfo === index 
                      ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20' 
                      : 'border-slate-200 dark:border-slate-700'
                  } transition-all duration-300`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        activePersonalInfo === index 
                          ? 'bg-blue-500 text-white' 
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}>
                        {info.icon}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">
                          {info.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                          {info.content}
                        </p>
                        
                        <a 
                          href={info.link}
                          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                          {info.linkText}
                          <FiExternalLink className="text-sm" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Expertise Cards */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-6"
            >
              <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8">
                Areas of Expertise
              </h3>
              
              {expertiseAreas.map((area, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredExpertise(index)}
                  onHoverEnd={() => setHoveredExpertise(null)}
                  className="group relative"
                >
                  <div className={`p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl border ${area.borderColor} transition-all duration-500 hover:border-opacity-60`}>
                    {/* Subtle background effect */}
                    <div className={`absolute inset-0 ${area.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${area.gradient} flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110`}>
                          {area.icon}
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {area.title}
                          </h4>
                        </div>
                        
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: hoveredExpertise === index ? 1 : 0,
                            x: hoveredExpertise === index ? 0 : -10
                          }}
                          className="text-blue-600 dark:text-blue-400"
                        >
                          <FaLightbulb className="text-xl" />
                        </motion.div>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                        {area.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {area.skills.map((skill, skillIndex) => (
                          <span 
                            key={skillIndex} 
                            className={`px-3 py-1.5 text-sm font-medium rounded-xl bg-gradient-to-r ${area.gradient} text-white`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-20"
          >
            <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl border border-blue-200/50 dark:border-blue-700/50">
              <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                Ready to Collaborate?
              </h3>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 hover:scale-105"
                >
                  <span>Let's Connect</span>
                  <FaArrowRight className="text-sm" />
                </a>
                
                <a 
                  href="#projects"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:scale-105"
                >
                  <span>View My Work</span>
                  <FiExternalLink className="text-sm" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}