'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaJs, FaReact, FaPython, FaEthereum, FaGithub, FaNodeJs, FaHardHat, FaCode, FaDatabase, FaTools, FaCog, FaRocket, FaChartBar
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, SiExpress, SiRemix
} from 'react-icons/si';

type Skill = {
  name: string;
  icon: React.ReactNode;
  color: string;
  category: string;
  level: number;
  description?: string;
  yearsOfExperience?: number;
  projects?: number;
};

const skills: Skill[] = [
  // Languages
  {
    name: 'JavaScript',
    icon: <FaJs className="text-3xl" />,
    color: 'from-yellow-400 to-yellow-600',
    category: 'Languages',
    level: 5,
    description: 'Modern ES6+ with advanced concepts',
    yearsOfExperience: 3,
    projects: 15
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript className="text-3xl" />,
    color: 'from-blue-500 to-blue-700',
    category: 'Languages',
    level: 4,
    description: 'Strong typing and enterprise patterns',
    yearsOfExperience: 2,
    projects: 8
  },
  {
    name: 'Python',
    icon: <FaPython className="text-3xl" />,
    color: 'from-green-400 to-blue-500',
    category: 'Languages',
    level: 3,
    description: 'Backend development and automation',
    yearsOfExperience: 2,
    projects: 5
  },
  {
    name: 'Solidity',
    icon: <FaEthereum className="text-3xl" />,
    color: 'from-gray-400 to-gray-600',
    category: 'Languages',
    level: 4,
    description: 'Smart contracts and DApp development',
    yearsOfExperience: 1,
    projects: 4
  },
  
  // Frontend
  {
    name: 'React.js',
    icon: <FaReact className="text-3xl" />,
    color: 'from-cyan-400 to-blue-500',
    category: 'Frontend',
    level: 5,
    description: 'Advanced hooks, context, and patterns',
    yearsOfExperience: 3,
    projects: 12
  },
  {
    name: 'Next.js',
    icon: <SiNextdotjs className="text-3xl" />,
    color: 'from-gray-800 to-gray-600',
    category: 'Frontend',
    level: 4,
    description: 'SSR, SSG, and full-stack development',
    yearsOfExperience: 2,
    projects: 8
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss className="text-3xl" />,
    color: 'from-sky-400 to-cyan-500',
    category: 'Frontend',
    level: 5,
    description: 'Utility-first responsive design',
    yearsOfExperience: 2,
    projects: 10
  },
  
  // Backend
  {
    name: 'Node.js',
    icon: <FaNodeJs className="text-3xl" />,
    color: 'from-green-500 to-green-700',
    category: 'Backend',
    level: 4,
    description: 'Scalable server-side applications',
    yearsOfExperience: 2,
    projects: 7
  },
  {
    name: 'Express',
    icon: <SiExpress className="text-3xl" />,
    color: 'from-gray-600 to-gray-800',
    category: 'Backend',
    level: 3,
    description: 'RESTful APIs and middleware',
    yearsOfExperience: 2,
    projects: 6
  },
  {
    name: 'MongoDB',
    icon: <SiMongodb className="text-3xl" />,
    color: 'from-green-500 to-green-700',
    category: 'Backend',
    level: 3,
    description: 'NoSQL database design and optimization',
    yearsOfExperience: 1,
    projects: 5
  },
  
  // Blockchain
  {
    name: 'Remix IDE',
    icon: <SiRemix className="text-3xl" />,
    color: 'from-purple-500 to-purple-700',
    category: 'Blockchain',
    level: 4,
    description: 'Smart contract development environment',
    yearsOfExperience: 1,
    projects: 4
  },
  {
    name: 'Hardhat',
    icon: <FaHardHat className="text-3xl" />,
    color: 'from-yellow-400 to-orange-500',
    category: 'Blockchain',
    level: 4,
    description: 'Testing and deployment framework',
    yearsOfExperience: 1,
    projects: 3
  },
  
  // Tools
  {
    name: 'Git/GitHub',
    icon: <FaGithub className="text-3xl" />,
    color: 'from-gray-700 to-gray-900',
    category: 'Tools',
    level: 5,
    description: 'Version control and collaboration',
    yearsOfExperience: 3,
    projects: 20
  },
];

const categoryConfig = {
  'Languages': {
    icon: <FaCode className="text-2xl" />,
    gradient: 'from-purple-500 to-pink-500',
    description: 'Programming languages I use to build solutions'
  },
  'Frontend': {
    icon: <FaRocket className="text-2xl" />,
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Technologies for creating engaging user interfaces'
  },
  'Backend': {
    icon: <FaDatabase className="text-2xl" />,
    gradient: 'from-green-500 to-emerald-500',
    description: 'Server-side technologies and database management'
  },
  'Blockchain': {
    icon: <FaEthereum className="text-2xl" />,
    gradient: 'from-indigo-500 to-purple-500',
    description: 'Decentralized application development tools'
  },
  'Tools': {
    icon: <FaTools className="text-2xl" />,
    gradient: 'from-orange-500 to-red-500',
    description: 'Development tools and workflow optimization'
  }
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Blockchain', 'Tools'];
  
  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  // Calculate total stats
  const totalProjects = skills.reduce((sum, skill) => sum + (skill.projects || 0), 0);
  const avgLevel = Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length);
  const totalYears = Math.max(...skills.map(skill => skill.yearsOfExperience || 0));

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

  const skillVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const SkillCard = ({ skill, index }: { skill: Skill; index: number }) => (
    <motion.div
      variants={skillVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setHoveredSkill(skill.name)}
      onHoverEnd={() => setHoveredSkill(null)}
      onClick={() => setSelectedSkill(skill)}
      className="group cursor-pointer"
    >
      <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-500 overflow-hidden group-hover:scale-105">
        {/* Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
        
        {/* Skill Icon */}
        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${skill.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
          {skill.icon}
        </div>
        
        {/* Skill Info */}
        <div className="relative">
          <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
            {skill.name}
          </h4>
          
          {/* Skill Level */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i < skill.level 
                      ? `bg-gradient-to-r ${skill.color}` 
                      : 'bg-slate-200 dark:bg-slate-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-slate-600 dark:text-slate-400">
              {skill.level}/5
            </span>
          </div>
          
          {/* Stats */}
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>{skill.yearsOfExperience}+ years</span>
            <span>{skill.projects} projects</span>
          </div>
        </div>

        {/* Hover Effect */}
        <motion.div
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          animate={{ scale: hoveredSkill === skill.name ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${skill.color} animate-pulse`}></div>
        </motion.div>
      </div>
    </motion.div>
  );

  return (
    <section id="skills" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-6">
              <FaCog className="text-indigo-500 animate-spin" style={{ animationDuration: '3s' }} />
              Technical Expertise
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-6">
              Skills & Technologies
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              A comprehensive overview of my technical skills, refined through hands-on experience across various projects and professional roles.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto"
          >
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                {skills.length}+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Technologies</div>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                {totalProjects}+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Projects Built</div>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                {totalYears}+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 shadow-lg">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                {avgLevel}/5
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Avg Proficiency</div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mb-16"
          >
            <div className="flex flex-wrap gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-slate-200/50 dark:border-slate-700/50">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'text-white shadow-lg'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {activeCategory === category && (
                    <motion.div
                      layoutId="activeSkillFilter"
                      className={`absolute inset-0 bg-gradient-to-r ${
                        category === 'All' 
                          ? 'from-slate-600 to-slate-800' 
                          : categoryConfig[category as keyof typeof categoryConfig]?.gradient || 'from-slate-600 to-slate-800'
                      } rounded-xl`}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {category !== 'All' && categoryConfig[category as keyof typeof categoryConfig]?.icon}
                    {category}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div ref={ref}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredSkills.map((skill, index) => (
                  <SkillCard key={skill.name} skill={skill} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-medium shadow-xl hover:scale-105 transition-all duration-300">
              <FaChartBar className="text-xl" />
              <span>Let's Build Something Amazing Together</span>
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Ready to leverage these skills for your next project? Let's discuss how we can create something extraordinary.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Skill Detail Modal */}
      <AnimatePresence>
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${selectedSkill.color} flex items-center justify-center text-white mb-6 mx-auto`}>
                {selectedSkill.icon}
              </div>
              
              <h3 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-200 mb-4">
                {selectedSkill.name}
              </h3>
              
              <p className="text-slate-600 dark:text-slate-400 text-center mb-6">
                {selectedSkill.description}
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Experience</span>
                  <span className="font-semibold">{selectedSkill.yearsOfExperience}+ years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Projects</span>
                  <span className="font-semibold">{selectedSkill.projects} completed</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Proficiency</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full ${
                          i < selectedSkill.level 
                            ? `bg-gradient-to-r ${selectedSkill.color}` 
                            : 'bg-slate-200 dark:bg-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}