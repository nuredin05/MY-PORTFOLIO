'use client';

import { useState, useEffect, useMemo, FormEvent } from 'react';
import confetti from 'canvas-confetti';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaExternalLinkAlt,
  FaArrowRight,
  FaCheckCircle,
  FaRegCopy,
  FaCheck,
  FaRocket,
  FaServer,
  FaDatabase,
  FaTimes,
  FaLaptopCode,
  FaBriefcase,
  FaGraduationCap,
  FaArrowUp,
  FaStar,
  FaAward,
  FaBolt,
  FaBuilding,
  FaSun,
  FaMoon
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiReact,
  SiNodedotjs
} from 'react-icons/si';

interface Project {
  id: string;
  title: string;
  category: 'fullstack' | 'ecommerce' | 'clone';
  categoryLabel: string;
  description: string;
  longDescription: string;
  highlights: string[];
  tech: string[];
  img: string;
  demoLink: string;
  codeLink: string;
  featured?: boolean;
}

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeProjectFilter, setActiveProjectFilter] = useState<'all' | 'fullstack' | 'ecommerce' | 'clone'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme ? savedTheme === 'dark' : true;
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      return next;
    });
  };

  // Hero dynamic role typewriter
  const roles = useMemo(() => [
    'Full Stack Web Developer at Yegofi Technology',
    'React & Next.js Frontend Specialist',
    'Node.js & Express API Architect',
    'Chief Technical Specialist at Wollo University'
  ], []);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeletingRole, setIsDeletingRole] = useState(false);

  // Form submission state - Clean without fixed dropdowns
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'projects', 'partners', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentFullRole = roles[currentRoleIndex];
    let timer: NodeJS.Timeout;

    if (isDeletingRole) {
      timer = setTimeout(() => {
        setDisplayedRole(prev => prev.slice(0, -1));
        if (displayedRole.length <= 1) {
          setIsDeletingRole(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }, 35);
    } else {
      timer = setTimeout(() => {
        setDisplayedRole(currentFullRole.slice(0, displayedRole.length + 1));
        if (displayedRole.length === currentFullRole.length) {
          timer = setTimeout(() => setIsDeletingRole(true), 2400);
        }
      }, 70);
    }

    return () => clearTimeout(timer);
  }, [displayedRole, isDeletingRole, currentRoleIndex, roles]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    }
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        colors: ['#000000', '#ffffff', '#737373', '#d4d4d4'],
        origin: { y: 0.6 }
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 800);
  };

  // Projects Data
  const projects: Project[] = [
    {
      id: 'amana-school',
      title: 'Amana School Management System',
      category: 'fullstack',
      categoryLabel: 'Enterprise Education Portal',
      description: 'Comprehensive academic enterprise portal for Amana Model Secondary School managing student records, grade reports, attendance, and administrative workflows.',
      longDescription: 'Engineered a scalable full-stack school management system for Amana Model Secondary School (hosted on Yegofi Technology infrastructure). Built with responsive React frontend and robust Node.js/Express backend with MySQL, delivering secure role-based access for teachers, students, and administrators.',
      highlights: [
        'Role-Based Access Control (Admin, Teacher, Student, Registrar)',
        'Automated Academic Grade Computation & Report Card Generation',
        'Student Attendance Tracking & Behavioral Logging',
        'Responsive Mobile-Optimized Dashboard'
      ],
      tech: ['React', 'Node.js', 'Express.js', 'MySQL', 'REST API', 'Tailwind CSS'],
      img: '/amss.png',
      demoLink: 'https://amana.yegofi.com/',
      codeLink: 'https://github.com/nuredin05',
      featured: true
    },
    {
      id: 'tailor-shop',
      title: 'Anawar Fashion & Bespoke Tailoring',
      category: 'ecommerce',
      categoryLabel: 'Custom E-Commerce Platform',
      description: 'Digital bespoke fashion platform featuring interactive custom measurement input, style booking, fabric selection, and order status tracking.',
      longDescription: 'Developed a tailor management platform for Anawar Fashion Tailor, enabling clients to order tailored attire, specify exact body measurements, schedule fitting appointments, and track order stages in real time.',
      highlights: [
        'Interactive Custom Body Measurement Configurator',
        'Appointment Booking & Fitting Schedule Manager',
        'Stripe & Payment Gateway Integration',
        'Admin Order Production Pipeline & Notifications'
      ],
      tech: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Stripe', 'Tailwind CSS'],
      img: '/tailor.png',
      demoLink: 'https://ana.fashion.yegofi.com',
      codeLink: 'https://github.com/nuredin05/student_behavior_tracking_system',
      featured: true
    },
    {
      id: 'portfolio-v2',
      title: 'Modern Developer Portfolio v2',
      category: 'fullstack',
      categoryLabel: 'Next.js 16 Web App',
      description: 'High-performance interactive portfolio built with Next.js 16 App Router, React 19, TypeScript, and minimalist monochrome black & white design.',
      longDescription: 'Designed and implemented an ultra-responsive, sleek developer portfolio with micro-animations, bento-grid layouts, project modals, dark/light theme switching, and interactive contact workflows.',
      highlights: [
        'Next.js 16 Turbopack & React 19 Architecture',
        'Minimalist Black & White Theme System',
        'Dark & Light Mode Switcher with LocalStorage Sync',
        'Lighthouse 98+ Performance & SEO Score'
      ],
      tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Canvas Confetti'],
      img: '/portfolio.png',
      demoLink: 'https://nuru-portfolio.vercel.app/',
      codeLink: 'https://github.com/nuredin05/MY-PORTFOLIO',
      featured: true
    },
    {
      id: 'amazon-clone',
      title: 'Amazon E-Commerce Platform Clone',
      category: 'ecommerce',
      categoryLabel: 'E-Commerce Architecture',
      description: 'Full-featured Amazon web clone featuring product catalogs, responsive shopping cart, user authentication, and Firebase Cloud Functions.',
      longDescription: 'Architected an end-to-end e-commerce application mirroring core Amazon capabilities: persistent multi-item basket, user authentication, stripe payment integration, and cloud-hosted database functions.',
      highlights: [
        'Real-time Shopping Cart & Price Calculation',
        'Firebase Authentication & Secure Session Storage',
        'Stripe Card Processing & Order History Logging',
        'Search & Category Filtering System'
      ],
      tech: ['React', 'Node.js', 'Firebase Auth', 'Firestore', 'Stripe API'],
      img: '/amazon.png',
      demoLink: 'https://amazonprojnes.netlify.app/',
      codeLink: 'https://github.com/nuredin05/amazon-clone'
    },
    {
      id: 'netflix-clone',
      title: 'Netflix Streaming Application',
      category: 'clone',
      categoryLabel: 'Streaming App',
      description: 'Video streaming web application integrated with TMDB API for live trending movies, trailer previews, search, and dynamic genres.',
      longDescription: 'Crafted a high-fidelity Netflix UI featuring real-time movie & TV show data from TMDB API, dynamic hero video banners, YouTube trailer embeds on click, and responsive multi-row horizontal sliders.',
      highlights: [
        'TMDB Live API Data Streaming & Categorization',
        'Dynamic Video Trailer Modal with React YouTube',
        'Smooth Horizontal Carousel Touch Scrolling',
        'Optimized Image Lazy Loading & Backdrop Rendering'
      ],
      tech: ['React', 'TMDB API', 'Axios', 'Firebase', 'CSS Modules'],
      img: '/netflix.png',
      demoLink: 'https://my-netflix-clone-nes.netlify.app/',
      codeLink: 'https://github.com/nuredin05/my-netflix-clone'
    },
    {
      id: 'apple-clone',
      title: 'Apple Showcase & Motion Experience',
      category: 'clone',
      categoryLabel: 'Interactive Showcase',
      description: 'Apple-inspired product showcase website highlighting sleek motion design, 3D interactive layout, and clean minimalist aesthetics.',
      longDescription: 'Developed an interactive product presentation page inspired by Apple design language, featuring smooth transitions, high-resolution product carousels, and responsive typography.',
      highlights: [
        'Apple-Inspired Minimalist Typography & Layout',
        'Interactive Product Spec Compare Table',
        'Smooth Scroll Micro-Interactions & Animations',
        'Express Backend with Firebase Cloud Integration'
      ],
      tech: ['React', 'Node.js', 'Express', 'Firebase', 'Tailwind CSS'],
      img: '/apple.png',
      demoLink: 'https://apple-clone-nes.netlify.app/',
      codeLink: 'https://github.com/nuredin05/amazon-clone'
    },
    {
      id: 'evangadi-forum',
      title: 'Evangadi Tech Community Forum',
      category: 'fullstack',
      categoryLabel: 'Community Q&A Platform',
      description: 'Developer discussion platform featuring user authentication, question posting, answer threads, upvotes, and real-time community engagement.',
      longDescription: 'Engineered a collaborative developer Q&A forum platform with secure user authentication, question categorization, thread replies, and relational MySQL database storage.',
      highlights: [
        'Secure JWT Authentication & Password Hashing',
        'Nested Q&A Thread Discussion Architecture',
        'Relational MySQL Schema for Questions & Answers',
        'Redux Global State Management'
      ],
      tech: ['React', 'Redux', 'Node.js', 'Express', 'MySQL', 'JWT Auth'],
      img: '/evangadi.png',
      demoLink: 'https://evangadi-forum-nes.netlify.app/',
      codeLink: 'https://github.com/nuredin05/evangadi-forum'
    }
  ];

  const filteredProjects = projects.filter(project => {
    if (activeProjectFilter === 'all') return true;
    return project.category === activeProjectFilter;
  });

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] relative overflow-hidden transition-colors duration-300">
      
      {/* Ambient background monochrome glows & dot grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-neutral-400/10 dark:bg-white/5 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute top-[35%] -right-40 w-[650px] h-[650px] bg-neutral-400/10 dark:bg-white/5 rounded-full blur-[160px] animate-pulse-glow" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-neutral-400/10 dark:bg-white/5 rounded-full blur-[140px] animate-pulse-glow" style={{ animationDelay: '6s' }} />
        <div className="absolute inset-0 bg-dot-pattern opacity-60" />
      </div>

      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3.5 shadow-lg' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-black dark:bg-white text-white dark:text-black group-hover:scale-105 transition-transform shadow-md">
              <div className="w-full h-full flex items-center justify-center font-bold text-lg">
                <span>NE</span>
              </div>
            </div>
            <div className="text-left hidden sm:block">
              <span className="font-bold text-base text-[var(--text-main)] tracking-tight block group-hover:opacity-75 transition-opacity">Nuru Endris</span>
              <span className="text-xs text-[var(--text-muted)] font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white animate-ping inline-block"></span>
                Full Stack Developer • Yegofi Tech
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 glass-panel px-4 py-1.5 rounded-full shadow-sm">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'projects', label: 'Projects' },
              { id: 'partners', label: 'Partners' },
              { id: 'experience', label: 'Experience' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all relative ${
                  activeSection === item.id
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs + Dark/Light Mode Switcher */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl glass-panel text-[var(--text-main)] hover:scale-110 active:scale-95 transition-all shadow-sm cursor-pointer"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle dark/light mode"
            >
              {isDarkMode ? <FaSun className="w-4 h-4 text-white" /> : <FaMoon className="w-4 h-4 text-black" />}
            </button>

            <a
              href="https://www.linkedin.com/in/nuru-endris-757645163/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl glass-panel text-xs font-semibold flex items-center gap-2 hover:bg-black/5 dark:hover:bg-white/10 transition-all text-[var(--text-main)]"
            >
              <FaLinkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-5 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-sm font-bold shadow-md hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Hire Me</span>
              <FaArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu & Theme Toggle Buttons */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl glass-panel text-[var(--text-main)] focus:outline-none transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FaSun className="w-4 h-4 text-white" /> : <FaMoon className="w-4 h-4 text-black" />}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-xl glass-panel text-[var(--text-main)] focus:outline-none transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes className="w-5 h-5" /> : (
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className="w-full h-0.5 bg-[var(--text-main)] rounded-full" />
                  <span className="w-3/4 h-0.5 bg-[var(--text-muted)] rounded-full ml-auto" />
                  <span className="w-full h-0.5 bg-[var(--text-main)] rounded-full" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-4 pt-3 pb-5 glass-nav border-b mt-2 space-y-2 animate-fadeIn">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Me' },
              { id: 'projects', label: 'Featured Projects' },
              { id: 'partners', label: 'Partners & Clients' },
              { id: 'experience', label: 'Experience & Background' },
              { id: 'contact', label: 'Get In Touch' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-black text-white dark:bg-white dark:text-black font-bold'
                    : 'text-[var(--text-muted)] hover:bg-black/5 dark:hover:bg-white/10 hover:text-[var(--text-main)]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="https://www.linkedin.com/in/nuru-endris-757645163/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl glass-panel text-[var(--text-main)] font-semibold text-sm text-center flex items-center justify-center gap-2"
              >
                <FaLinkedin className="w-4 h-4" />
                <span>View LinkedIn Profile</span>
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-sm text-center flex items-center justify-center gap-2"
              >
                <span>Hire Me / Get In Touch</span>
                <FaArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-screen pt-32 pb-20 flex items-center relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Hero Text */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-6">
                
                {/* Available for hire status badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-xs font-mono shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse"></span>
                  <span>Full Stack Developer • Yegofi Technology & Wollo University</span>
                </div>

                {/* Main Headline */}
                <div className="space-y-2">
                  <p className="text-[var(--text-muted)] text-lg font-medium tracking-wide">Hello World, I'm</p>
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-main)]">
                    Nuru <span className="gradient-text-bw">Endris</span>
                  </h1>
                  <div className="h-12 flex items-center justify-center lg:justify-start">
                    <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[var(--text-main)] font-mono">
                      {displayedRole}
                      <span className="inline-block w-0.5 h-6 ml-1 bg-[var(--text-main)] animate-pulse align-middle"></span>
                    </span>
                  </div>
                </div>

                {/* Subtext description */}
                <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Full Stack Web Developer at <span className="font-bold text-[var(--text-main)]">Yegofi Technology</span> and Chief Technical Specialist at <span className="font-bold text-[var(--text-main)]">Wollo University</span> (8+ years technical tenure). Building performant, responsive web apps with React, Next.js, Node.js, Express, MySQL & MongoDB.
                </p>

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="px-7 py-3.5 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-sm shadow-lg hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Projects</span>
                    <FaRocket className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-7 py-3.5 rounded-xl glass-panel text-[var(--text-main)] font-semibold text-sm hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Hire Me</span>
                    <FaEnvelope className="w-4 h-4" />
                  </button>
                  <a
                    href="https://www.linkedin.com/in/nuru-endris-757645163/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-xl border border-black/15 dark:border-white/20 text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/10 font-semibold text-sm transition-all flex items-center gap-2"
                  >
                    <FaLinkedin className="w-4 h-4" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>

                {/* Social Links */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <span className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">Socials:</span>
                  <div className="flex items-center gap-3">
                    {[
                      { icon: FaLinkedin, href: 'https://www.linkedin.com/in/nuru-endris-757645163/', label: 'LinkedIn' },
                      { icon: FaGithub, href: 'https://github.com/nuredin05', label: 'GitHub' },
                      { icon: FaEnvelope, href: 'mailto:nuru.endriscs@gmail.com', label: 'Email' },
                      { icon: FaPhone, href: 'tel:+251913912388', label: 'Phone' },
                    ].map(({ icon: Icon, href, label }) => (
                      <a
                        key={label}
                        href={href}
                        target={href.startsWith('http') ? '_blank' : undefined}
                        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-[var(--text-main)] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all hover:scale-110 active:scale-95 shadow-sm"
                        aria-label={label}
                        title={label}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-4 pt-6 max-w-lg mx-auto lg:mx-0">
                  <div className="glass-panel p-4 rounded-2xl text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">8+ Yrs</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1 font-medium">Tech & Systems</div>
                  </div>
                  <div className="glass-panel p-4 rounded-2xl text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">2+ Yrs</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1 font-medium">Yegofi Tech</div>
                  </div>
                  <div className="glass-panel p-4 rounded-2xl text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">10+</div>
                    <div className="text-xs text-[var(--text-muted)] mt-1 font-medium">Live Systems</div>
                  </div>
                </div>
              </div>

              {/* Right Column: Hero Visual / Profile Avatar */}
              <div className="lg:col-span-5 flex justify-center items-center">
                <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96 flex items-center justify-center">
                  
                  {/* Decorative glowing gradient backdrop */}
                  <div className="absolute inset-0 rounded-full bg-black/10 dark:bg-white/10 blur-2xl animate-pulse-glow" />

                  {/* Rotating orbital border */}
                  <div className="absolute inset-0 rounded-full border border-black/20 dark:border-white/20 border-dashed animate-spin-slow" />
                  
                  {/* Inner ring */}
                  <div className="absolute inset-4 rounded-full border border-black/10 dark:border-white/10" />

                  {/* Profile Avatar Card */}
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2 bg-gradient-to-tr from-black via-neutral-600 to-white dark:from-white dark:via-neutral-400 dark:to-black shadow-2xl animate-float-slow overflow-hidden">
                    <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg-main)] border-4 border-[var(--bg-main)]">
                      <img
                        src="/me.jpg"
                        alt="Nuru Endris"
                        className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Floating Tech Badges */}
                  <div className="absolute -top-2 right-4 glass-panel px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg animate-float-slow">
                    <SiNextdotjs className="w-5 h-5" />
                    <span className="text-xs font-semibold">Next.js 16</span>
                  </div>

                  <div className="absolute -bottom-2 -left-2 glass-panel px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg animate-float-slow" style={{ animationDelay: '2s' }}>
                    <SiReact className="w-5 h-5 animate-spin-slow" />
                    <span className="text-xs font-semibold">React 19</span>
                  </div>

                  <div className="absolute bottom-16 -right-6 glass-panel px-3.5 py-2 rounded-2xl flex items-center gap-2 shadow-lg animate-float-slow" style={{ animationDelay: '4s' }}>
                    <SiNodedotjs className="w-5 h-5" />
                    <span className="text-xs font-semibold">Node.js</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION (Bento Grid) */}
        <section id="about" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-xs font-mono uppercase tracking-wider">
                About & Experience Overview
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Full Stack Developer & <span className="gradient-text-bw">Systems Specialist</span>
              </h2>
              <p className="text-[var(--text-muted)] text-base sm:text-lg">
                Delivering high-performance software at Yegofi Technology with deep computing and institutional systems expertise from Wollo University.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Card 1: Interactive Code Window (7 cols) */}
              <div className="md:col-span-7 glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  {/* IDE header */}
                  <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-black/40 dark:bg-white/40" />
                      <span className="w-3 h-3 rounded-full bg-black/60 dark:bg-white/60" />
                      <span className="w-3 h-3 rounded-full bg-black/80 dark:bg-white/80" />
                      <span className="text-xs font-mono text-[var(--text-muted)] ml-2">nuruProfile.ts</span>
                    </div>
                    <span className="text-[11px] font-mono bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 px-2 py-0.5 rounded">LinkedIn Verified</span>
                  </div>

                  {/* Code snippet */}
                  <div className="font-mono text-xs sm:text-sm text-[var(--text-main)] space-y-1.5 overflow-x-auto py-2 leading-relaxed">
                    <p><span className="font-bold opacity-60">const</span> <span className="font-semibold">developer</span> = &#123;</p>
                    <p className="pl-4"><span className="opacity-60">fullName:</span> <span>'Nuru Endris'</span>,</p>
                    <p className="pl-4"><span className="opacity-60">currentRoles:</span> [</p>
                    <p className="pl-8">'Full Stack Developer @ Yegofi Technology',</p>
                    <p className="pl-8">'Chief Technical Assistant @ Wollo University'</p>
                    <p className="pl-4">],</p>
                    <p className="pl-4"><span className="opacity-60">location:</span> <span>'Kombolcha / Addis Ababa, Ethiopia'</span>,</p>
                    <p className="pl-4"><span className="opacity-60">primaryStack:</span> [</p>
                    <p className="pl-8">'React.js', 'Next.js', 'Node.js', 'Express', 'MySQL', 'MongoDB'</p>
                    <p className="pl-4">],</p>
                    <p className="pl-4"><span className="opacity-60">linkedIn:</span> <span>'linkedin.com/in/nuru-endris-757645163'</span>,</p>
                    <p className="pl-4"><span className="opacity-60">openToOpportunities:</span> <span className="font-bold">true</span></p>
                    <p>&#125;;</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <FaCheckCircle className="text-[var(--text-main)]" />
                    <span>8+ Years Combined Technical & Full-Stack Experience</span>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/nuru-endris-757645163/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold hover:underline flex items-center gap-1.5"
                  >
                    <span>View on LinkedIn</span>
                    <FaExternalLinkAlt className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Card 2: Core Engineering Pillars (5 cols) */}
              <div className="md:col-span-5 glass-card rounded-3xl p-6 sm:p-8 space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FaBolt />
                  <span>Key Competencies</span>
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      icon: FaLaptopCode,
                      title: 'Frontend & UI Architecture',
                      desc: 'Interactive, responsive web apps using React, Next.js, Redux Toolkit, and Tailwind CSS.',
                    },
                    {
                      icon: FaServer,
                      title: 'Backend & RESTful Services',
                      desc: 'Scalable servers with Node.js, Express, JWT authentication, and structured middleware.',
                    },
                    {
                      icon: FaDatabase,
                      title: 'Relational & NoSQL Databases',
                      desc: 'Database design, normalization, queries, and indexing with MySQL, MongoDB, and Firebase.',
                    }
                  ].map((pillar) => (
                    <div key={pillar.title} className="flex gap-4 p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/5 dark:border-white/10 hover:border-black/20 dark:hover:border-white/30 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                        <pillar.icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{pillar.title}</h4>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{pillar.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3: Yegofi Technology (4 cols) */}
              <div className="md:col-span-4 glass-card rounded-3xl p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
                    <FaBuilding className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">Yegofi Technology</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Full-time Full Stack & Frontend Web Developer (2 yrs). Building and scaling modern client web platforms and production services.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-xs font-medium">
                  🏢 Addis Ababa & Remote
                </div>
              </div>

              {/* Card 4: Wollo University (4 cols) */}
              <div className="md:col-span-4 glass-card rounded-3xl p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
                    <FaGraduationCap className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">Wollo University</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Chief Technical Assistant (8+ yrs tenure). Managing hardware, software troubleshooting, technical systems support, and computing infrastructure.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-xs font-medium">
                  🏛️ 8 yrs 4 mos Service
                </div>
              </div>

              {/* Card 5: Evangadi Networks (4 cols) */}
              <div className="md:col-span-4 glass-card rounded-3xl p-6 space-y-4 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
                    <FaAward className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold">Evangadi Networks</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Full-Stack Software Engineering fellowship. Specialized in MERN stack, MySQL relational schemas, and collaborative engineering.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-xs font-medium">
                  🚀 Full-Stack Certified
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS SECTION */}
        <section id="projects" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-xs font-mono uppercase tracking-wider">
                Production Portfolio
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Featured <span className="gradient-text-bw">Projects & Systems</span>
              </h2>
              <p className="text-[var(--text-muted)] text-base sm:text-lg">
                Explore real-world client platforms, enterprise school systems, and full-stack web applications.
              </p>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap justify-center gap-2 pt-6">
                {[
                  { id: 'all', label: 'All Projects (7)' },
                  { id: 'fullstack', label: 'Full-Stack Systems' },
                  { id: 'ecommerce', label: 'E-Commerce & Portals' },
                  { id: 'clone', label: 'Showcases & Media' },
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveProjectFilter(filter.id as any)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      activeProjectFilter === filter.id
                        ? 'bg-black text-white dark:bg-white dark:text-black shadow-md'
                        : 'glass-panel text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="glass-card rounded-3xl overflow-hidden flex flex-col group transition-all duration-300"
                >
                  {/* Project Image Preview */}
                  <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-neutral-900">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-transparent to-transparent opacity-80" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-black text-white dark:bg-white dark:text-black shadow-md">
                        {project.categoryLabel}
                      </span>
                      {project.featured && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-[var(--bg-panel)] text-[var(--text-main)] border border-black/10 dark:border-white/20 backdrop-blur-md flex items-center gap-1 shadow-md">
                          <FaStar className="w-2.5 h-2.5" /> Featured
                        </span>
                      )}
                    </div>

                    {/* Quick view button */}
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-black text-white dark:bg-white dark:text-black text-xs font-semibold transition-opacity opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
                    >
                      Quick Details
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">
                        {project.title}
                      </h3>
                      <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Tech Badges */}
                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-white/10">
                        <a
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-bold bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-xl transition-all shadow-sm hover:opacity-85"
                        >
                          <FaExternalLinkAlt className="w-3 h-3" />
                          <span>Live Demo</span>
                        </a>

                        <a
                          href={project.codeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                        >
                          <FaGithub className="w-4 h-4" />
                          <span>Code Repository</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* PARTNERS & CLIENT COLLABORATIONS */}
        <section id="partners" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-xs font-mono uppercase tracking-wider">
                Client Success
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Trusted Partners & <span className="gradient-text-bw">Clients</span>
              </h2>
              <p className="text-[var(--text-muted)] text-base sm:text-lg">
                Organizations and institutions that trusted me to architect and deliver their critical digital platforms.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* Partner 1: Amana */}
              <div className="glass-card p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-6 group">
                <div className="w-24 h-24 rounded-2xl p-2 glass-panel flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <img src="/amana_logo.png" alt="Amana Secondary School" className="w-16 h-16 object-contain" />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="text-lg font-bold">Amana Model Secondary School</h3>
                    <span className="text-[10px] font-mono bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 px-2 py-0.5 rounded">Education Tech</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Designed and deployed their full institutional school management and academic tracking system.
                  </p>
                  <a
                    href="https://amana.yegofi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline pt-1"
                  >
                    <span>Visit Live Portal</span>
                    <FaExternalLinkAlt className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

              {/* Partner 2: Anawar Fashion */}
              <div className="glass-card p-8 rounded-3xl flex flex-col sm:flex-row items-center gap-6 group">
                <div className="w-24 h-24 rounded-2xl p-2 glass-panel flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <img src="/logo1.png" alt="Anawar Fashion Tailor" className="w-16 h-16 object-contain" />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="text-lg font-bold">Anawar Fashion Tailor</h3>
                    <span className="text-[10px] font-mono bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 px-2 py-0.5 rounded">Bespoke E-Commerce</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Engineered bespoke garment tailoring order management and fitting appointment platform.
                  </p>
                  <a
                    href="https://ana.fashion.yegofi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold hover:underline pt-1"
                  >
                    <span>Visit Live Platform</span>
                    <FaExternalLinkAlt className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* WORK EXPERIENCE & CAREER TIMELINE */}
        <section id="experience" className="py-24 relative">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-xs font-mono uppercase tracking-wider">
                Career History
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Work Experience & <span className="gradient-text-bw">Tenure</span>
              </h2>
              <p className="text-[var(--text-muted)] text-xs sm:text-sm">
                Verified professional employment history from LinkedIn
              </p>
            </div>

            <div className="space-y-10 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:-translate-x-1/2 before:bg-black/20 dark:before:bg-white/20">
              
              {/* Experience Item 1: Yegofi Technology - Full Stack Developer */}
              <div className="relative flex flex-col sm:flex-row items-center group">
                <div className="flex sm:w-1/2 sm:pr-8 sm:text-right w-full pl-10 sm:pl-0 mb-4 sm:mb-0">
                  <div className="glass-card p-6 rounded-3xl w-full">
                    <div className="flex flex-wrap items-center justify-start sm:justify-end gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold">Apr 2026 - Present • Hybrid</span>
                      <span className="text-[10px] font-mono bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 rounded font-bold">Current</span>
                    </div>
                    <h3 className="text-lg font-bold">Full Stack Developer</h3>
                    <p className="text-xs font-semibold opacity-80">Yegofi Technology (Full-time • 2 yrs)</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Addis Ababa, Ethiopia</p>
                    <p className="text-xs text-[var(--text-muted)] mt-2.5 leading-relaxed">
                      Engineering modern web applications, scalable REST APIs, microservices, and database management. Leading full-stack web architecture and system delivery.
                    </p>
                  </div>
                </div>
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--bg-main)] border-4 border-black dark:border-white flex items-center justify-center z-10 shadow-md">
                  <FaBriefcase className="w-3 h-3" />
                </div>
                <div className="hidden sm:block sm:w-1/2 sm:pl-8 text-xs text-[var(--text-dim)] font-mono">
                  Yegofi Technology • Full Stack Web
                </div>
              </div>

              {/* Experience Item 2: Yegofi Technology - Frontend Web Developer */}
              <div className="relative flex flex-col sm:flex-row items-center group">
                <div className="hidden sm:block sm:w-1/2 sm:pr-8 sm:text-right text-xs text-[var(--text-dim)] font-mono">
                  Yegofi Technology • Frontend Architecture
                </div>
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--bg-main)] border-4 border-black/60 dark:border-white/60 flex items-center justify-center z-10 shadow-md">
                  <FaLaptopCode className="w-3.5 h-3.5" />
                </div>
                <div className="flex sm:w-1/2 sm:pl-8 w-full pl-10 sm:pl-8">
                  <div className="glass-card p-6 rounded-3xl w-full">
                    <span className="text-xs font-mono font-semibold">Sep 2024 - Present • Remote</span>
                    <h3 className="text-lg font-bold mt-1">Frontend Web Developer</h3>
                    <p className="text-xs font-semibold opacity-80">Yegofi Technology</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Addis Ababa, Ethiopia (Remote)</p>
                    <p className="text-xs text-[var(--text-muted)] mt-2.5 leading-relaxed">
                      Crafting performant, accessible UI/UX with React, Next.js, TypeScript, and modern CSS architectures. Building responsive dashboards and state-driven components.
                    </p>
                  </div>
                </div>
              </div>

              {/* Experience Item 3: Wollo University - Chief Technical Assistant */}
              <div className="relative flex flex-col sm:flex-row items-center group">
                <div className="flex sm:w-1/2 sm:pr-8 sm:text-right w-full pl-10 sm:pl-0 mb-4 sm:mb-0">
                  <div className="glass-card p-6 rounded-3xl w-full">
                    <div className="flex flex-wrap items-center justify-start sm:justify-end gap-2 mb-1">
                      <span className="text-xs font-mono font-semibold">Jul 2024 - Present • 2 yrs 2 mos</span>
                      <span className="text-[10px] font-mono bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 rounded font-bold">Current</span>
                    </div>
                    <h3 className="text-lg font-bold">Chief Technical Assistant</h3>
                    <p className="text-xs font-semibold opacity-80">Wollo University (Full-time • 8 yrs 4 mos tenure)</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Kombolcha, Ethiopia</p>
                    <p className="text-xs text-[var(--text-muted)] mt-2.5 leading-relaxed">
                      Leading technical computing operations, institutional computer assistance, server management, network infrastructure maintenance, and advanced technical support.
                    </p>
                  </div>
                </div>
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--bg-main)] border-4 border-black dark:border-white flex items-center justify-center z-10 shadow-md">
                  <FaBuilding className="w-3 h-3" />
                </div>
                <div className="hidden sm:block sm:w-1/2 sm:pl-8 text-xs text-[var(--text-dim)] font-mono">
                  Wollo University • Chief Technical Operations
                </div>
              </div>

              {/* Experience Item 4: Wollo University - Senior Technical Assistant */}
              <div className="relative flex flex-col sm:flex-row items-center group">
                <div className="hidden sm:block sm:w-1/2 sm:pr-8 sm:text-right text-xs text-[var(--text-dim)] font-mono">
                  Wollo University • 6 yrs 2 mos
                </div>
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[var(--bg-main)] border-4 border-black/60 dark:border-white/60 flex items-center justify-center z-10 shadow-md">
                  <FaGraduationCap className="w-3.5 h-3.5" />
                </div>
                <div className="flex sm:w-1/2 sm:pl-8 w-full pl-10 sm:pl-8">
                  <div className="glass-card p-6 rounded-3xl w-full">
                    <span className="text-xs font-mono font-semibold">May 2018 - Jun 2024 • 6 yrs 2 mos</span>
                    <h3 className="text-lg font-bold mt-1">Senior Technical Assistant</h3>
                    <p className="text-xs font-semibold opacity-80">Wollo University</p>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Kombolcha, Ethiopia</p>
                    <p className="text-xs text-[var(--text-muted)] mt-2.5 leading-relaxed">
                      Provided institutional technical support, computer assistance, hardware diagnostics, network troubleshooting, and software deployment across university labs.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* INTERACTIVE CONTACT & HIRE ME SECTION (Clean, flexible inputs - NO fixed dropdowns) */}
        <section id="contact" className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-xs font-mono uppercase tracking-wider">
                Hire Me & Collaborate
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                Let's Build Something <span className="gradient-text-bw">Exceptional</span>
              </h2>
              <p className="text-[var(--text-muted)] text-base sm:text-lg">
                Have a project idea, open full-stack developer role, or contract inquiry? Send a direct message below.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto">
              
              {/* Left Column: Direct Info & Quick Copy (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="glass-card p-8 rounded-3xl space-y-6">
                  <h3 className="text-xl font-bold">Direct Information</h3>
                  <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed">
                    Feel free to reach out directly via email, phone, or LinkedIn. I typically respond within 24 hours.
                  </p>

                  <div className="space-y-4">
                    
                    {/* LinkedIn Card */}
                    <a
                      href="https://www.linkedin.com/in/nuru-endris-757645163/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/10 dark:border-white/15 flex items-center justify-between group hover:border-black/30 dark:hover:border-white/40 transition-all"
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                          <FaLinkedin className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-[11px] font-mono opacity-70">LinkedIn Profile</div>
                          <div className="text-xs sm:text-sm font-semibold truncate">nuru-endris-757645163</div>
                        </div>
                      </div>
                      <FaExternalLinkAlt className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform opacity-70" />
                    </a>

                    {/* Email Card with 1-click copy */}
                    <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/10 dark:border-white/15 flex items-center justify-between group">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                          <FaEnvelope className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-[11px] font-mono opacity-70">Email Address</div>
                          <div className="text-xs sm:text-sm font-semibold truncate">nuru.endriscs@gmail.com</div>
                        </div>
                      </div>
                      <button
                        onClick={() => copyToClipboard('nuru.endriscs@gmail.com', 'email')}
                        className="p-2.5 rounded-xl glass-panel hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shrink-0 ml-2 cursor-pointer"
                        title="Copy email"
                      >
                        {copiedEmail ? <FaCheck className="w-4 h-4" /> : <FaRegCopy className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Phone Card with 1-click copy & call */}
                    <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/10 dark:border-white/15 flex items-center justify-between group">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                          <FaPhone className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <div className="text-[11px] font-mono opacity-70">Phone / Telegram</div>
                          <div className="text-xs sm:text-sm font-semibold truncate">+251 913 91 23 88</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        <button
                          onClick={() => copyToClipboard('+251913912388', 'phone')}
                          className="p-2.5 rounded-xl glass-panel hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
                          title="Copy phone"
                        >
                          {copiedPhone ? <FaCheck className="w-4 h-4" /> : <FaRegCopy className="w-4 h-4" />}
                        </button>
                        <a
                          href="tel:+251913912388"
                          className="p-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black transition-all text-xs font-bold"
                          title="Call directly"
                        >
                          Call
                        </a>
                      </div>
                    </div>

                    {/* Location Card */}
                    <div className="p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.04] border border-black/10 dark:border-white/15 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                        <FaMapMarkerAlt className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono opacity-70">Location</div>
                        <div className="text-xs sm:text-sm font-semibold">Kombolcha & Addis Ababa, Ethiopia (Remote available)</div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Status Callout */}
                <div className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/15 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm">
                    <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-ping"></span>
                    <span>Ready for Full-Stack Roles & Engineering Projects</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Available for frontend modernization, backend API engineering, custom web applications, or joining agile engineering teams.
                  </p>
                </div>

              </div>

              {/* Right Column: Clean Flexible Contact Form - NO FIXED DROPDOWNS */}
              <div className="lg:col-span-7">
                <div className="glass-card p-8 sm:p-10 rounded-3xl relative">
                  
                  {formSubmitted ? (
                    <div className="py-12 text-center space-y-4 animate-fadeIn">
                      <div className="w-16 h-16 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center mx-auto">
                        <FaCheckCircle className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold">Message Sent Successfully!</h3>
                      <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
                        Thank you for reaching out, Nuru Endris will get back to you shortly at your email.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-5">
                      
                      {/* Name & Email inputs */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        
                        <div className="space-y-2">
                          <label className="text-xs font-mono block opacity-80">Your Name *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Alex Johnson"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/15 dark:border-white/20 text-[var(--text-main)] placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:border-black dark:focus:border-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-mono block opacity-80">Your Email *</label>
                          <input
                            type="email"
                            required
                            placeholder="alex@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/15 dark:border-white/20 text-[var(--text-main)] placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:border-black dark:focus:border-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                          />
                        </div>

                      </div>

                      {/* Subject input */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono block opacity-80">Subject / Project Topic *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Full-Stack Web Development / Job Opportunity / Project Inquiry"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/15 dark:border-white/20 text-[var(--text-main)] placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:border-black dark:focus:border-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all"
                        />
                      </div>

                      {/* Quick preset pills */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-mono opacity-60">Quick Topics (Click to fill):</span>
                        <div className="flex flex-wrap gap-2">
                          {[
                            '💼 Full-Time Developer Role',
                            '🌐 Custom Web Application',
                            '⚙️ API & Database Design',
                            '✨ Freelance Project'
                          ].map((topic) => (
                            <button
                              key={topic}
                              type="button"
                              onClick={() => setFormData({ ...formData, subject: topic })}
                              className="px-3 py-1 rounded-lg text-xs bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-[var(--text-main)] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message Field */}
                      <div className="space-y-2">
                        <label className="text-xs font-mono block opacity-80">Your Message *</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Write your message, project requirements, or opportunity details here..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/15 dark:border-white/20 text-[var(--text-main)] placeholder-neutral-400 dark:placeholder-neutral-600 text-sm focus:border-black dark:focus:border-white focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white transition-all resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-sm shadow-md hover:opacity-90 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </div>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <FaArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                    </form>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* PROJECT DETAILS MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 dark:bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="glass-card w-full max-w-2xl rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 relative shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 p-2.5 rounded-xl glass-panel text-[var(--text-main)] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-black text-white dark:bg-white dark:text-black inline-block">
                {selectedProject.categoryLabel}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold">
                {selectedProject.title}
              </h3>
            </div>

            {/* Image Preview */}
            <div className="h-56 sm:h-64 rounded-2xl overflow-hidden bg-neutral-900 border border-black/10 dark:border-white/10">
              <img
                src={selectedProject.img}
                alt={selectedProject.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Long Description */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold">Architectural Overview</h4>
              <p className="text-[var(--text-muted)] text-xs sm:text-sm leading-relaxed">
                {selectedProject.longDescription}
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold">Key Engineered Capabilities</h4>
              <ul className="space-y-2">
                {selectedProject.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
                    <FaCheckCircle className="w-4 h-4 text-[var(--text-main)] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg text-xs font-mono bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-black/10 dark:border-white/10">
              <a
                href={selectedProject.codeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl glass-panel text-xs font-bold flex items-center gap-2 transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                <FaGithub className="w-4 h-4" />
                <span>View Source</span>
              </a>
              <a
                href={selectedProject.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-black text-white dark:bg-white dark:text-black text-xs font-bold flex items-center gap-2 shadow-md transition-opacity hover:opacity-85"
              >
                <FaExternalLinkAlt className="w-3 h-3" />
                <span>Open Live Demo</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-black/10 dark:border-white/10 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Brand / Copyright */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-black text-white dark:bg-white dark:text-black p-0.5 flex items-center justify-center font-bold text-xs">
                NE
              </div>
              <div className="text-xs text-[var(--text-muted)]">
                <span>© {new Date().getFullYear()} Nuru Endris. All rights reserved.</span>
              </div>
            </div>

            {/* Tech tag */}
            <div className="text-xs text-[var(--text-dim)] font-mono text-center md:text-left">
              Engineered with <span className="font-bold text-[var(--text-main)]">Next.js 16</span>, <span className="font-bold text-[var(--text-main)]">React 19</span> & <span className="font-bold text-[var(--text-main)]">Tailwind CSS</span>
            </div>

            {/* Socials & Back to Top */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {[
                  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/nuru-endris-757645163/', label: 'LinkedIn' },
                  { icon: FaGithub, href: 'https://github.com/nuredin05', label: 'GitHub' },
                  { icon: FaEnvelope, href: 'mailto:nuru.endriscs@gmail.com', label: 'Email' },
                  { icon: FaPhone, href: 'tel:+251913912388', label: 'Phone' },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>

              <button
                onClick={() => scrollToSection('home')}
                className="p-2.5 rounded-xl glass-panel text-[var(--text-main)] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
                title="Back to Top"
                aria-label="Back to Top"
              >
                <FaArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
