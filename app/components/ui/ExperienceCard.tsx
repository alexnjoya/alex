'use client';

import { FaCalendarAlt, FaBriefcase } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
  index: number;
}

export default function ExperienceCard({ experience, index }: ExperienceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card p-6 border-l-4 border-primary-500 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
            {experience.icon}
          </div>
        </div>
        <div className="flex-grow">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{experience.title}</h3>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1 md:mt-0">
              <FaCalendarAlt className="mr-2" />
              <span>{experience.period}</span>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <FaBriefcase className="text-primary-500 mr-2" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {experience.company} • {experience.location}
            </span>
          </div>
          <ul className="space-y-2">
            {experience.description.map((item, i) => (
              <li key={i} className="text-gray-600 dark:text-gray-400 flex items-start">
                <span className="inline-block w-2 h-2 bg-primary-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}