'use client';

import { FaGithub, FaExternalLinkAlt, FaEthereum, FaLaptopCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Badge from './Badge';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
    >
      <div className="relative h-56 md:h-60 w-full overflow-hidden">
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
        <div className="absolute top-4 left-4 z-20 flex gap-2">
          {project.tags.slice(0, 2).map((tag, i) => (
            <Badge
              key={i}
              variant={project.category === 'Blockchain' ? 'secondary' : 'primary'}
              size="sm"
              rounded
              className="backdrop-blur bg-opacity-80"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start gap-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {project.title}
          </h3>
          <div className="flex space-x-2">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repository for ${project.title}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-500 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <FaGithub size={20} />
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${project.title}`}
                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-500 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-primary-400"
              >
                <FaExternalLinkAlt size={18} />
              </a>
            )}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-base line-clamp-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.tags.slice(2).map((tag, i) => (
            <Badge
              key={i}
              variant={project.category === 'Blockchain' ? 'secondary' : 'primary'}
              size="sm"
              rounded
              className="backdrop-blur bg-opacity-80"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
}