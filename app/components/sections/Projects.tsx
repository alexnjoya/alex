'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt, FaEthereum, FaLaptopCode, FaArrowRight } from 'react-icons/fa';

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  githubLink?: string;
  liveLink?: string;
  featured?: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Tally - Blockchain Voting DApp',
    description: 'A transparent and decentralized voting system built using Ethereum smart contracts. This was my final year project at the University of Ghana, focusing on secure, tamper-proof electronic voting.',
    image: '/images/projects/tally.jpg',
    tags: ['Solidity', 'React', 'Ethereum', 'Web3.js', 'Smart Contracts'],
    category: 'Blockchain',
    githubLink: 'https://github.com/alexnjoya/tally',
    featured: true,
  },
  {
    id: 2,
    title: 'AdwumaPa - Web3 Freelance Platform',
    description: 'A Web3 platform helping remote workers get paid securely through cryptocurrency. It tackles cross-border payment issues with smart contracts and provides escrow services.',
    image: '/images/projects/adwumapa.jpg',
    tags: ['Solidity', 'Next.js', 'Hardhat', 'Tailwind CSS', 'Blockchain'],
    category: 'Blockchain',
    githubLink: 'https://github.com/alexnjoya/adwumapa',
    featured: true,
  },
  {
    id: 3,
    title: 'FineTun-ai Platform',
    description: 'A no-code platform enabling businesses to fine-tune Large Language Models (LLMs) using their proprietary datasets. Built with a modern React frontend and Node.js backend.',
    image: '/images/projects/finetun.jpg',
    tags: ['TypeScript', 'Next.js', 'Node.js', 'AI/ML', 'MongoDB'],
    category: 'Web',
    githubLink: 'https://github.com/alexnjoya/finetun-ai',
    liveLink: 'https://finetun.ai',
    featured: true,
  },
  {
    id: 4,
    title: 'Personal Portfolio Website',
    description: 'My personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a responsive design, dark mode, and animations powered by Framer Motion.',
    image: '/images/projects/portfolio.jpg',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    category: 'Web',
    githubLink: 'https://github.com/alexnjoya/portfolio',
    liveLink: 'https://alexnjoya.dev',
  },
   {
    id: 6,
    title: 'Personal Portfolio Website',
    description: 'My personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a responsive design, dark mode, and animations powered by Framer Motion.',
    image: '/images/projects/portfolio.jpg',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    category: 'Web',
    githubLink: 'https://github.com/alexnjoya/portfolio',
    liveLink: 'https://alexnjoya.dev',
  },
  {
    id: 5,
    title: 'Personal Portfolio Website',
    description: 'My personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a responsive design, dark mode, and animations powered by Framer Motion.',
    image: '/images/projects/portfolio.jpg',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    category: 'Web',
    githubLink: 'https://github.com/alexnjoya/portfolio',
    liveLink: 'https://alexnjoya.dev',
  }
  
  
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filters = ['All', 'Web', 'Blockchain'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  return (
    <section  id="projects" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 dark:bg-blue-400/10 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Portfolio Showcase
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-6">
              Featured Projects
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Explore my recent work spanning blockchain development, web applications, and AI-powered platforms.
            </p>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center mb-16"
          >
            <div className="flex bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-2  border border-slate-200/50 dark:border-slate-700/50">
              {filters.map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? 'text-white '
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {activeFilter === filter && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{filter}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div ref={ref}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    onHoverStart={() => setHoveredProject(project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                    className="group relative"
                  >
                    <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8  border border-slate-200/50 dark:border-slate-700/50 hover:l transition-all duration-500 overflow-hidden">
                      {/* Project Image/Icon */}
                      <div className="relative h-48 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                          {project.category === 'Blockchain' ? (
                            <FaEthereum className="text-6xl text-blue-500/40" />
                          ) : (
                            <FaLaptopCode className="text-6xl text-purple-500/40" />
                          )}
                        </div>
                        
                        {/* Hover overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-600/10 transition-opacity duration-300 ${
                          hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                        }`}></div>
                      </div>

                      {/* Project Content */}
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {project.title}
                            </h3>
                            {project.featured && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-medium rounded-full">
                                <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                                Featured
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {project.githubLink && (
                              <a 
                                href={project.githubLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-3 bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300"
                              >
                                <FaGithub size={20} />
                              </a>
                            )}
                            {project.liveLink && (
                              <a 
                                href={project.liveLink} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 hover:scale-105"
                              >
                                <FaExternalLinkAlt size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.tags.map((tag, i) => (
                            <span 
                              key={i} 
                              className="px-3 py-1.5 text-sm font-medium rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Hover effect */}
                      <motion.div
                        className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ x: 10 }}
                        animate={{ x: hoveredProject === project.id ? 0 : 10 }}
                      >
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                          <span className="text-sm">View Project</span>
                          <FaArrowRight size={14} />
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl font-medium hover: transition-all duration-300 hover:scale-105">
              <span>View All Projects</span>
              <FaArrowRight size={16} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}