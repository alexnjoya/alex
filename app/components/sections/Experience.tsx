'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaBriefcase, FaCode, FaLaptopCode, FaEthereum, FaCalendarAlt, FaMapMarkerAlt, FaRocket, FaUsers } from 'react-icons/fa';

type Experience = {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: string;
  icon: React.ReactNode;
  isCurrentRole?: boolean;
  companySize?: string;
  achievements?: string[];
};

const experiences: Experience[] = [
  {
    id: 1,
    title: 'Co-Founder',
    company: 'FineTun-ai',
    location: 'Hybrid',
    period: 'Apr 2025 – Present',
    description: [
      'Co-founded and led the development of a no-code platform enabling businesses to fine-tune Large Language Models (LLMs) using their proprietary datasets',
      'Spearheaded product vision and strategy in a fast-paced startup environment',
      'Focused on simplifying AI customization workflows for non-technical teams and startups'
    ],
    type: 'Startup',
    icon: <FaLaptopCode className="text-2xl" />,
    isCurrentRole: true,
    companySize: 'Startup',
    achievements: ['Product Launch', 'Team Leadership', 'AI/ML Innovation']
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'Next Code Systems / Intent',
    location: 'Accra, Ghana',
    period: 'Jan 2024 – Mar 2024',
    description: [
      'Built responsive, user-friendly web interfaces using React.js and Tailwind CSS',
      'Worked collaboratively in an agile team to meet product deadlines',
      'Improved application performance and user experience through optimization techniques'
    ],
    type: 'Frontend',
    icon: <FaCode className="text-2xl" />,
    companySize: 'Mid-size',
    achievements: ['React.js', 'Tailwind CSS', 'Agile Development']
  },
  {
    id: 3,
    title: 'Volunteer Frontend Developer',
    company: 'Mowblox',
    location: 'Remote',
    period: 'Mar 2024 – Jun 2024',
    description: [
      'Developed clean, functional web pages using modern JavaScript and UI libraries',
      'Participated in UI/UX design improvements and user testing feedback loops',
      'Contributed to open-source projects and community-driven development'
    ],
    type: 'Frontend',
    icon: <FaCode className="text-2xl" />,
    companySize: 'Community',
    achievements: ['Open Source', 'UI/UX Design', 'Community Impact']
  },
  {
    id: 4,
    title: 'Blockchain Developer',
    company: 'MEST Africa',
    location: 'Accra, Ghana',
    period: 'Aug 2023 – Oct 2023',
    description: [
      'Wrote, tested, and deployed Ethereum-compatible smart contracts using Solidity',
      'Utilized Remix and Hardhat for smart contract development and simulation',
      'Contributed to blockchain-based app prototypes as part of team projects'
    ],
    type: 'Blockchain',
    icon: <FaEthereum className="text-2xl" />,
    companySize: 'Accelerator',
    achievements: ['Smart Contracts', 'Solidity', 'DApp Development']
  }
];

const typeColors = {
  Startup: 'from-purple-500 to-pink-500',
  Frontend: 'from-blue-500 to-cyan-500',
  Blockchain: 'from-green-500 to-emerald-500'
};

const typeIcons = {
  Startup: <FaRocket className="text-white" />,
  Frontend: <FaCode className="text-white" />,
  Blockchain: <FaEthereum className="text-white" />
};

export default function Experience() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filters = ['All', 'Frontend', 'Blockchain', 'Startup'];

  const filteredExperiences = activeFilter === 'All' 
    ? experiences 
    : experiences.filter(exp => exp.type === activeFilter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="experience" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 dark:bg-purple-400/10 rounded-full text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
              <FaBriefcase className="text-purple-500" />
              Professional Journey
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-6">
              Experience & Growth
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              My professional journey through various roles in software development, focusing on frontend engineering, blockchain technology, and entrepreneurship.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-6 mb-16 max-w-2xl mx-auto"
          >
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">4+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Roles</div>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">2+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Years</div>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">3</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Domains</div>
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
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
                      layoutId="activeExperienceFilter"
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {filter !== 'All' && typeIcons[filter as keyof typeof typeIcons] && (
                      <span className={activeFilter === filter ? 'text-white' : 'text-slate-400'}>
                        {typeIcons[filter as keyof typeof typeIcons]}
                      </span>
                    )}
                    {filter}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <div ref={ref}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="space-y-8"
              >
                {filteredExperiences.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    variants={cardVariants}
                    onHoverStart={() => setHoveredCard(experience.id)}
                    onHoverEnd={() => setHoveredCard(null)}
                    className="group relative"
                  >
                    <div className="flex gap-8 items-start">
                      {/* Timeline Indicator */}
                      <div className="flex flex-col items-center">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${typeColors[experience.type as keyof typeof typeColors]} flex items-center justify-center  group-hover:scale-110 transition-all duration-300`}>
                          {typeIcons[experience.type as keyof typeof typeIcons]}
                        </div>
                        {index < filteredExperiences.length - 1 && (
                          <div className="w-px h-20 bg-gradient-to-b from-slate-300 to-transparent dark:from-slate-600 mt-4"></div>
                        )}
                      </div>

                      {/* Content Card */}
                      <div className="flex-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8  border border-slate-200/50 dark:border-slate-700/50 hover:l transition-all duration-500 group-hover:translate-x-2">
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between mb-6">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                                {experience.title}
                              </h3>
                              {experience.isCurrentRole && (
                                <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full animate-pulse">
                                  Current
                                </span>
                              )}
                            </div>
                            <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
                              {experience.company}
                            </h4>
                          </div>
                          
                          <div className="flex flex-col items-end gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <div className="flex items-center gap-2">
                              <FaCalendarAlt className="text-purple-500" />
                              {experience.period}
                            </div>
                            <div className="flex items-center gap-2">
                              <FaMapMarkerAlt className="text-blue-500" />
                              {experience.location}
                            </div>
                            {experience.companySize && (
                              <div className="flex items-center gap-2">
                                <FaUsers className="text-green-500" />
                                {experience.companySize}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-3 mb-6">
                          {experience.description.map((desc, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                {desc}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Achievements/Skills */}
                        {experience.achievements && (
                          <div className="flex flex-wrap gap-2">
                            {experience.achievements.map((achievement, idx) => (
                              <span 
                                key={idx} 
                                className={`px-3 py-1.5 text-sm font-medium rounded-xl bg-gradient-to-r ${typeColors[experience.type as keyof typeof typeColors]} text-white `}
                              >
                                {achievement}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Hover Effect */}
                        <motion.div
                          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ scale: 0 }}
                          animate={{ scale: hoveredCard === experience.id ? 1 : 0 }}
                        >
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${typeColors[experience.type as keyof typeof typeColors]} animate-pulse`}></div>
                        </motion.div>
                      </div>
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
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center gap-3 p-6 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-2xl hover:scale-105 transition-all duration-300">
              <FaBriefcase className="text-xl" />
              <span className="font-semibold">Let's Work Together</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}