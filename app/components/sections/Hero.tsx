'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhoneAlt, FaArrowRight, FaFileAlt, FaReact, FaRocket, FaCode, FaEthereum, FaStar } from 'react-icons/fa';
import { HiOutlineCode, HiOutlineCube } from 'react-icons/hi';
import { RiRocketLine } from 'react-icons/ri';
import Image from 'next/image';
import Profile from '../../../public/profile.jpg';


export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Typewriter effect
  const [titles] = useState([
    "Frontend Engineer",
    "Blockchain Developer",
    "Full-Stack Developer",
    "Web3 Enthusiast"
  ]);
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Responsive state
  const [viewport, setViewport] = useState({
    width: 0,
    height: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  // Initialize
  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 0;
      const height = typeof window !== 'undefined' ? window.innerHeight : 0;

      setViewport({
        width,
        height,
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!mounted) return;

    const currentTitle = titles[titleIndex];
    const typeSpeed = isDeleting ? 50 : 120;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedTitle === currentTitle) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      } else if (isDeleting && displayedTitle === "") {
        setIsDeleting(false);
        setTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
        return;
      }

      setDisplayedTitle(prev =>
        isDeleting
          ? prev.substring(0, prev.length - 1)
          : currentTitle.substring(0, prev.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayedTitle, isDeleting, titleIndex, titles, mounted]);

  // Advanced particle system
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: any[] = [];
    let animationFrameId: number;

    class Particle {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseSize = Math.random() * 2 + 1;
        this.size = this.baseSize;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;

        const colors = [
          `rgba(59, 130, 246, ${this.opacity})`, // blue-500
          `rgba(139, 92, 246, ${this.opacity})`, // violet-500
          `rgba(16, 185, 129, ${this.opacity})`, // emerald-500
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Pulse effect
        this.size = this.baseSize + Math.sin(Date.now() * this.pulseSpeed) * 0.5;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particlesArray = [];
      const particleCount = viewport.isMobile ? 30 : viewport.isTablet ? 50 : 80;

      for (let i = 0; i < particleCount; i++) {
        particlesArray.push(new Particle());
      }
      setIsLoaded(true);
    };

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const connect = () => {
      if (!ctx) return;
      const maxDistance = viewport.isMobile ? 80 : 120;

      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * 0.4;
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesArray.forEach(particle => {
        particle.update();
        particle.draw();
      });

      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    setCanvasSize();
    animate();

    window.addEventListener('resize', setCanvasSize);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted, viewport]);

  if (!mounted) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-900" />;
  }

  const socialLinks = [
    { icon: FaGithub, url: "https://github.com/alexnjoya", label: "GitHub", color: "hover:text-gray-900 dark:hover:text-white" },
    { icon: FaLinkedin, url: "https://linkedin.com/in/alexnjoya", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: FaEnvelope, url: "mailto:njoyaalexander71@gmail.com", label: "Email", color: "hover:text-red-500" },
    { icon: FaPhoneAlt, url: "tel:+233240027151", label: "Phone", color: "hover:text-green-500" }
  ];

  const skills = [
    { name: "React", icon: FaReact, color: "text-blue-500" },
    { name: "Next.js", icon: HiOutlineCode, color: "text-gray-700 dark:text-gray-300" },
    { name: "Solidity", icon: FaEthereum, color: "text-purple-500" },
    { name: "TypeScript", icon: HiOutlineCube, color: "text-blue-600" }
  ];

  return (
    <motion.section
      id="home"
      ref={containerRef}
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
    >
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Background Elements */}
      <div className="absolute inset-0 z-10 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 md:w-[28rem] h-80 md:h-[28rem] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/3 w-48 md:w-72 h-48 md:h-72 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Loading Screen */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white dark:bg-slate-900 flex items-center justify-center z-50"
          >
            <motion.div
              className="w-16 h-16 border-4 border-t-blue-500 border-r-purple-500 border-b-emerald-500 border-l-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-20  max-w-7xl mx-auto px-4 mt-24 container px-8 sm:px-8 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left Column - Text Content */}
          <motion.div
            style={{ y }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="inline-block mb-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Available for opportunities
                </span>
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-4"
            >
              <h2 className="text-xl md:text-2xl font-medium text-blue-600 dark:text-blue-400 mb-2">
                Hello, I'm
              </h2>
            </motion.div>

            {/* Main Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4"
            >
              Alex{' '}
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 bg-clip-text text-transparent">
                Njoya
              </span>
            </motion.h1>

            {/* Typewriter Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="h-12 md:h-16 mb-6"
            >
              <div className="text-xl md:text-2xl lg:text-3xl text-slate-700 dark:text-slate-300 font-semibold flex items-center justify-center lg:justify-start">
                <span>{displayedTitle}</span>
                <span className="w-1 h-6 md:h-8 bg-purple-500 ml-1 opacity-75" />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Final-year Computer Science student at the University of Ghana,
              building innovative solutions at the intersection of frontend excellence
              and blockchain technology.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  Get In Touch
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.a>

              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
              >
                <RiRocketLine className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                View Projects
              </motion.a>

              <motion.a
                href="https://drive.google.com/uc?export=download&id=1L-zlzcuKNqhk6zc3w0Y68e6_aLx94qDD"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:inline-flex items-center justify-center px-6 py-4 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-all duration-300"
              >
                <FaFileAlt className="mr-2" />
                Resume
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="flex items-center justify-center lg:justify-start gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.url}
                  href={social.url}
                  target={social.url.startsWith('http') ? "_blank" : undefined}
                  rel={social.url.startsWith('http') ? "noopener noreferrer" : undefined}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 1.6 + index * 0.1 }}
                  className={`p-3 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 ${social.color}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Visual Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center relative order-1 lg:order-2"
          >
            <div className="relative w-full max-w-sm">
              {/* Main Card */}
              <div className="relative bg-white dark:bg-slate-800 rounded-3xl p-8 border  lg:h-120 lg:mr-[-6rem] border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm">

                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-emerald-500 p-1 ring-4 ring-white/60 dark:ring-slate-900/60 transition-transform duration-300"
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                    <Image
                      src={Profile}
                      alt="Alex Njoya"
                      width={132}
                      height={112}
                      className="rounded-full mt-5 object-cover object-center shadow-lg"
                      priority
                    />
                  </div>
                </motion.div>

                {/* Info */}
                <div className="text-center  mb-6">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Alex Njoya
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 font-medium mb-4">
                    Frontend & Blockchain Developer
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {skills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-xl text-sm font-medium"
                      >
                        <skill.icon className={`${skill.color} text-sm`} />
                        <span className="text-slate-700 dark:text-slate-300">
                          {skill.name}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5 + i * 0.1 }}
                      >
                        <FaStar className="text-yellow-400 text-sm" />
                      </motion.div>
                    ))}
                    <span className="text-sm text-slate-600 dark:text-slate-400 ml-2">
                      5.0 Developer
                    </span>
                  </div>
                </div>

                {/* University */}
                <div className="text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    University of Ghana, Legon
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-sm" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full blur-sm" />
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut"
                }}
                className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-xl backdrop-blur-sm"
              />

              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-6 -right-6 w-8 h-8 bg-gradient-to-br from-emerald-500/30 to-blue-500/30 rounded-full backdrop-blur-sm"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              Scroll to explore
            </span>
            <div className="w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-1 h-3 bg-blue-500 rounded-full mt-2"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .opacity-75 {
          opacity: 0.75;
        }
      `}</style>
    </motion.section>
  );
}