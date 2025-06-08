'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaPaperPlane, 
  FaCheckCircle,
  FaUser,
  FaComment,
  FaClock,
  FaGlobe,
  FaRocket
} from 'react-icons/fa';

const contactInfo = [
  {
    icon: <FaEnvelope className="text-2xl" />,
    title: 'Email',
    value: 'njoyaalexander71@gmail.com',
    href: 'mailto:njoyaalexander71@gmail.com',
    gradient: 'from-blue-500 to-cyan-500',
    description: 'Send me an email anytime'
  },
  {
    icon: <FaPhone className="text-2xl" />,
    title: 'Phone',
    value: '+233 240 027 151',
    href: 'tel:+233240027151',
    gradient: 'from-green-500 to-emerald-500',
    description: 'Call me for urgent matters'
  },
  {
    icon: <FaMapMarkerAlt className="text-2xl" />,
    title: 'Location',
    value: 'Accra, Ghana',
    href: '#',
    gradient: 'from-purple-500 to-pink-500',
    description: 'Available for local meetups'
  }
];

const socialLinks = [
  {
    icon: <FaLinkedin className="text-xl" />,
    name: 'LinkedIn',
    href: '#',
    gradient: 'from-blue-600 to-blue-700',
    hoverGradient: 'from-blue-500 to-blue-600'
  },
  {
    icon: <FaGithub className="text-xl" />,
    name: 'GitHub',
    href: '#',
    gradient: 'from-gray-700 to-gray-900',
    hoverGradient: 'from-gray-600 to-gray-800'
  },
  {
    icon: <FaTwitter className="text-xl" />,
    name: 'Twitter',
    href: '#',
    gradient: 'from-sky-500 to-blue-500',
    hoverGradient: 'from-sky-400 to-blue-400'
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hoveredContact, setHoveredContact] = useState<number | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success message
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

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
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          animate={floatingAnimation}
          className="absolute top-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"
        />
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
              <FaRocket className="text-indigo-500" />
              Let's Connect
            </div>
            
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent mb-6">
              Get In Touch
            </h2>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-3xl mx-auto"
          >
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 ">
              <FaClock className="text-3xl text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">24h</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Response Time</div>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 ">
              <FaGlobe className="text-3xl text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">GMT+0</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Time Zone</div>
            </div>
            <div className="text-center p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 ">
              <FaCheckCircle className="text-3xl text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-800 dark:text-slate-200">100%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Satisfaction</div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-8"
            >
              <motion.div variants={itemVariants}>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8">
                  Contact Information
                </h3>
                
                <div className="space-y-6">
                  {contactInfo.map((contact, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      onHoverStart={() => setHoveredContact(index)}
                      onHoverEnd={() => setHoveredContact(null)}
                      className="group"
                    >
                      <a
                        href={contact.href}
                        className="flex items-center gap-6 p-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover: transition-all duration-500 hover:scale-105"
                      >
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center text-white  group-hover:scale-110 transition-transform duration-300`}>
                          {contact.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-1">
                            {contact.title}
                          </h4>
                          <p className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-1">
                            {contact.value}
                          </p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {contact.description}
                          </p>
                        </div>
                        
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: hoveredContact === index ? 1 : 0,
                            x: hoveredContact === index ? 0 : -10
                          }}
                          className="text-blue-600 dark:text-blue-400"
                        >
                          <FaPaperPlane className="text-xl" />
                        </motion.div>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <h4 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6">
                  Follow Me
                </h4>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${social.gradient} hover:bg-gradient-to-br hover:${social.hoverGradient} flex items-center justify-center text-white  transition-all duration-300`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl p-8 l border border-slate-200/50 dark:border-slate-700/50"
            >
              <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-200 mb-8">
                Send a Message
              </h3>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
                    </motion.div>
                    <h4 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      Thank you for reaching out. I'll get back to you soon!
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-4 pl-12 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Your full name"
                        />
                        <FaUser className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                          focusedField === 'name' ? 'text-blue-500' : 'text-slate-400'
                        }`} />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-4 pl-12 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="your.email@example.com"
                        />
                        <FaEnvelope className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                          focusedField === 'email' ? 'text-blue-500' : 'text-slate-400'
                        }`} />
                      </div>
                    </div>

                    {/* Subject Field */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField('subject')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full px-4 py-4 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="What's this about?"
                      />
                    </div>

                    {/* Message Field */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Message
                      </label>
                      <div className="relative">
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={6}
                          className="w-full px-4 py-4 pl-12 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                          placeholder="Tell me about your project..."
                        />
                        <FaComment className={`absolute left-4 top-6 transition-colors duration-300 ${
                          focusedField === 'message' ? 'text-blue-500' : 'text-slate-400'
                        }`} />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-2xl  hover: transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="text-lg" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}