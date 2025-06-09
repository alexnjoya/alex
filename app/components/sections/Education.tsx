'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaCalendarAlt, FaCertificate, FaUniversity, FaBookOpen, FaAward, FaTrophy, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { MdSchool, MdComputer, MdCode } from 'react-icons/md';
import { SiEthereum, SiJavascript, SiReact } from 'react-icons/si';

type Education = {
  id: number;
  institution: string;
  degree: string;
  period: string;
  description?: string;
  icon: JSX.Element;
  type: 'university' | 'bootcamp' | 'certification';
  gpa?: string;
  achievements?: string[];
  skills?: string[];
  isOngoing?: boolean;
  location?: string;
  credentialUrl?: string;
};

const educations: Education[] = [
  {
    id: 1,
    institution: 'University of Ghana, Legon',
    degree: 'BSc. Mathematical Science (Computer Science)',
    period: '2022 – 2025',
    description: 'Comprehensive study of software development, algorithms, data structures, and mathematical foundations with emphasis on practical application development and problem-solving.',
    icon: <FaUniversity className="text-3xl" />,
    type: 'university',
    gpa: '3.8/4.0',
    location: 'Accra, Ghana',
    isOngoing: true,
    achievements: [
      'Dean\'s List Recognition',
      'Outstanding Performance in Data Structures',
      'Computer Science Society Member'
    ],
    skills: ['Algorithm Design', 'Data Structures', 'Software Engineering', 'Mathematics', 'Problem Solving']
  },
  {
    id: 2,
    institution: 'MEST Africa, Accra',
    degree: 'Web3 & Blockchain Development Bootcamp',
    period: 'Jul 2023 – Sep 2023',
    description: 'Intensive hands-on bootcamp focused on building decentralized applications (DApps) using Solidity and Ethereum ecosystem. Gained expertise in smart contract development, security best practices, and blockchain architecture.',
    icon: <SiEthereum className="text-3xl" />,
    type: 'bootcamp',
    location: 'Accra, Ghana',
    achievements: [
      'Top 10% Graduate',
      'Built 3 Production DApps',
      'Smart Contract Security Specialist'
    ],
    skills: ['Solidity', 'Smart Contracts', 'DApp Development', 'Web3.js', 'Blockchain Security']
  },
  {
    id: 3,
    institution: 'Udemy Online Learning',
    degree: 'Full-Stack Web Development Certifications',
    period: 'Jul 2023 – Sep 2023',
    description: 'Completed comprehensive certification programs covering modern web development technologies including advanced JavaScript concepts, React ecosystem, and full-stack development practices.',
    icon: <FaCertificate className="text-3xl" />,
    type: 'certification',
    location: 'Online',
    achievements: [
      'JavaScript: Basic to Advanced (98% Score)',
      'React: Beginner to Advanced (95% Score)',
      'Advanced JavaScript Concepts (100% Score)'
    ],
    skills: ['JavaScript ES6+', 'React.js', 'Node.js', 'Full-Stack Development', 'Modern Web APIs']
  },
];

const typeConfig = {
  university: {
    gradient: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-700',
    icon: <FaUniversity className="text-blue-500" />
  },
  bootcamp: {
    gradient: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    borderColor: 'border-purple-200 dark:border-purple-700',
    icon: <MdCode className="text-purple-500" />
  },
  certification: {
    gradient: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    borderColor: 'border-green-200 dark:border-green-700',
    icon: <FaAward className="text-green-500" />
  }
};

export default function Education() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filters = ['All', 'University', 'Bootcamp', 'Certification'];
  
  const filteredEducations = activeFilter === 'All' 
    ? educations 
    : educations.filter(edu => edu.type === activeFilter.toLowerCase());

  // Calculate total achievements
  const totalAchievements = educations.reduce((sum, edu) => sum + (edu.achievements?.length || 0), 0);
  const totalSkills = [...new Set(educations.flatMap(edu => edu.skills || []))].length;
  const totalYears = 3; // 2022-2025

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  const timelineVariants = {
    hidden: { scaleY: 0 },
    visible: { 
      scaleY: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section  id="education" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 dark:bg-blue-400/10 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <FaGraduationCap className="text-blue-500" />
              Academic Journey
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-6">
              Education & Training
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              My academic foundation and specialized training in computer science, blockchain technology, and modern web development.
            </p>
          </motion.div>

          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto"
          >
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 ">
              <FaGraduationCap className="text-3xl text-blue-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{educations.length}</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Programs</div>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 ">
              <FaTrophy className="text-3xl text-purple-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{totalAchievements}+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Achievements</div>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 ">
              <FaBookOpen className="text-3xl text-green-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{totalSkills}+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Skills Learned</div>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 ">
              <FaCalendarAlt className="text-3xl text-orange-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-slate-800 dark:text-slate-200">{totalYears}+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Years</div>
            </div>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-center mb-16"
          >
            <div className="flex gap-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-2  border border-slate-200/50 dark:border-slate-700/50">
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
                      layoutId="activeEducationFilter"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {filter !== 'All' && typeConfig[filter.toLowerCase() as keyof typeof typeConfig]?.icon}
                    {filter}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Education Timeline */}
          <div ref={ref} className="relative">
            {/* Timeline Line */}
            <motion.div
              variants={timelineVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="absolute left-8 md:left-1/2 top-0 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 rounded-full transform md:-translate-x-1/2 origin-top"
            />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="space-y-12"
              >
                {filteredEducations.map((education, index) => (
                  <motion.div
                    key={education.id}
                    variants={cardVariants}
                    className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-20">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.5, type: "spring", stiffness: 200 }}
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${typeConfig[education.type].gradient} flex items-center justify-center text-white  border-4 border-white dark:border-slate-800`}
                      >
                        {education.icon}
                      </motion.div>
                    </div>

                    {/* Content Card */}
                    <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'} w-full`}>
                      <div className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl p-8 l border border-slate-200/50 dark:border-slate-700/50 hover:l transition-all duration-500 ${index % 2 === 0 ? 'md:ml-0' : 'md:mr-0'}`}>
                        {/* Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                                {education.degree}
                              </h3>
                              {education.isOngoing && (
                                <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium rounded-full animate-pulse">
                                  Ongoing
                                </span>
                              )}
                            </div>
                            <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                              {education.institution}
                            </h4>
                            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
                              <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-purple-500" />
                                {education.period}
                              </div>
                              {education.location && (
                                <div className="flex items-center gap-2">
                                  <MdSchool className="text-green-500" />
                                  {education.location}
                                </div>
                              )}
                             
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                          {education.description}
                        </p>

                        {/* Skills */}
                        {education.skills && (
                          <div className="mb-6">
                            <h5 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Key Skills Learned:</h5>
                            <div className="flex flex-wrap gap-2">
                              {education.skills.map((skill, idx) => (
                                <span 
                                  key={idx} 
                                  className={`px-3 py-1.5 text-sm font-medium rounded-xl bg-gradient-to-r ${typeConfig[education.type].gradient} text-white `}
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Achievements - Expandable */}
                        {education.achievements && (
                          <div>
                            <button
                              onClick={() => setExpandedCard(expandedCard === education.id ? null : education.id)}
                              className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                              <FaAward className="text-yellow-500" />
                              Achievements & Recognition
                              {expandedCard === education.id ? <FaChevronUp /> : <FaChevronDown />}
                            </button>
                            
                            <AnimatePresence>
                              {expandedCard === education.id && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3 }}
                                  className="overflow-hidden"
                                >
                                  <div className="space-y-2">
                                    {education.achievements.map((achievement, idx) => (
                                      <div key={idx} className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className="text-sm text-slate-600 dark:text-slate-400">{achievement}</span>
                                      </div>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        )}
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
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-20"
          >
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl font-medium  hover:scale-105 transition-all duration-300">
              <FaGraduationCap className="text-xl" />
              <span>Continuous Learning & Growth</span>
            </div>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              My educational journey continues as I stay updated with the latest technologies and industry best practices.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}