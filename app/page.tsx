import { Metadata } from 'next';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
// import Navbar from './components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Alex Njoya | Software & Blockchain Developer',
  description: 'Personal portfolio of Alex Njoya, a Computer Science student and software developer specializing in frontend engineering and blockchain development.',
  keywords: 'Alex Njoya, Software Developer, Blockchain Developer, React, Next.js, Solidity, Frontend Engineer, Computer Science, Ghana',
};

export default function HomePage() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      
    </>
  );
}