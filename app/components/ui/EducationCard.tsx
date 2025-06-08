'use client';

import { FaCalendarAlt } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';
import { motion } from 'framer-motion';
import { Education } from '@/types';

interface EducationCardProps {
  education: Education;
  index: number;
  isEven: boolean;
}

export default function EducationCard({ education, index, isEven }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-white dark:bg-gray-800 border-4 border-primary-500 z-10 flex items-center justify-center">
        {education.icon || <MdSchool className="text-3xl text-primary-500" />}
      </div>
      
      {/* Content */}
      <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
        <div className="card p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {education.degree}
            </h3>
            <div className="flex items-center mb-4 text-primary-500">
              <MdSchool className="mr-2" />
              <span className="font-medium">{education.institution}</span>
            </div>
            <div className="flex items-center mb-4 text-gray-500 dark:text-gray-400 text-sm">
              <FaCalendarAlt className="mr-2" />
              <span>{education.period}</span>
            </div>
            {education.description && (
              <p className="text-gray-600 dark:text-gray-400">
                {education.description}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}