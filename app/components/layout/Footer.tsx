'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaMapMarkerAlt, FaPhone, FaHeart, FaCode, FaRocket } from 'react-icons/fa';

export default function Footer() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { 
      icon: FaGithub, 
      url: "https://github.com/alexnjoya", 
      label: "GitHub",
      color: "hover:text-gray-300 hover:bg-gray-700"
    },
    { 
      icon: FaLinkedin, 
      url: "https://linkedin.com/in/alexnjoya", 
      label: "LinkedIn",
      color: "hover:text-blue-400 hover:bg-blue-500/20"
    },
    { 
      icon: FaEnvelope, 
      url: "mailto:njoyaalexander71@gmail.com", 
      label: "Email",
      color: "hover:text-red-400 hover:bg-red-500/20"
    },
  ];

  const skills = [
    "React", "Next.js", "TypeScript", "Node.js", "Solidity", "Web3"
  ];

  if (!mounted) {
    return null;
  }

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 mb-6 cursor-pointer"
              onClick={() => handleNavClick('#home')}
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                AN
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Alex Njoya</h3>
                <p className="text-sm text-slate-400">Full-Stack Developer</p>
              </div>
            </motion.div>

            {/* Description */}
            <p className="text-slate-400 text-lg leading-relaxed mb-6 max-w-md">
              Passionate software developer and blockchain engineer based in Accra, Ghana. 
              Creating innovative solutions that bridge technology and real-world impact.
            </p>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="px-3 py-1 bg-slate-700/50 text-slate-300 rounded-xl text-sm font-medium border border-slate-600/50 hover:bg-slate-600/50 transition-colors duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.url}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  aria-label={social.label}
                  className={`p-3 bg-slate-700/50 text-slate-400 rounded-xl border border-slate-600/50 transition-all duration-300 ${social.color}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <FaRocket className="mr-3 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-blue-400 transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <FaEnvelope className="mr-3 text-purple-400" />
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center text-slate-400 group"
              >
                <FaEnvelope className="mr-3 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                <a 
                  href="mailto:njoyaalexander71@gmail.com"
                  className="hover:text-white transition-colors duration-300"
                >
                  njoyaalexander71@gmail.com
                </a>
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center text-slate-400 group"
              >
                <FaMapMarkerAlt className="mr-3 text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300" />
                <span>Accra, Ghana</span>
              </motion.li>
              <motion.li 
                whileHover={{ x: 5 }}
                className="flex items-center text-slate-400 group"
              >
                <FaPhone className="mr-3 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                <a 
                  href="tel:+233240027151"
                  className="hover:text-white transition-colors duration-300"
                >
                  +233 240 027 151
                </a>
              </motion.li>
            </ul>

            {/* Availability Status */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl"
            >
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="font-semibold">Available for work</span>
              </div>
              <p className="text-slate-400 text-sm">
                Open to new opportunities and collaborations
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-slate-700/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <div className="flex items-center text-slate-400 text-sm">
              <span>&copy; {currentYear} Alex Njoya. Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mx-2"
              >
                <FaHeart className="text-red-500" />
              </motion.div>
              <span>and</span>
              <FaCode className="mx-2 text-blue-400" />
              <span>in Ghana</span>
            </div>

            {/* Additional Links */}
            <div className="flex items-center space-x-6 text-sm">
              <button
                onClick={() => handleNavClick('#about')}
                className="text-slate-400 hover:text-white transition-colors duration-300"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleNavClick('#contact')}
                className="text-slate-400 hover:text-white transition-colors duration-300"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl shadow-2xl transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <FaArrowUp className="text-lg group-hover:animate-bounce" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}