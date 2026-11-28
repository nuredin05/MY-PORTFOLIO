'use client';

import { useState, useEffect, useSyncExternalStore, FormEvent } from 'react';
import Image from 'next/image';
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
  FaServer,
  FaDatabase,
  FaTimes,
  FaLaptopCode,
  FaGraduationCap,
  FaArrowUp,
  FaBuilding,
  FaSun,
  FaMoon,
  FaLayerGroup,
  FaGlobe,
  FaLock,
} from 'react-icons/fa';
import { projects, experiences, Project } from '../data/portfolio';

type FilterTab = 'client' | 'all' | 'showcase';

const emptySubscribe = (callback: () => void) => {
  window.addEventListener('storage', callback);
  window.addEventListener('theme-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('theme-change', callback);
  };
};

const getThemeSnapshot = () => {
  const saved = localStorage.getItem('theme');
  return saved ? saved === 'dark' : true;
};

const getServerThemeSnapshot = () => true;

function getProjectIcon(iconKey?: Project['iconKey']) {
  switch (iconKey) {
    case 'finance':
      return FaBuilding;
    case 'education':
      return FaGraduationCap;
    case 'makerspace':
      return FaLayerGroup;
    case 'charity':
      return FaGlobe;
    default:
      return FaLaptopCode;
  }
}

export default function Home() {
  const isDarkMode = useSyncExternalStore(
    emptySubscribe,
    getThemeSnapshot,
    getServerThemeSnapshot
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeFilter, setActiveFilter] = useState<FilterTab>('client');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 32);

      const sections = ['home', 'about', 'projects', 'experience', 'contact'];
      const scrollPos = window.scrollY + 180;

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

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  const toggleTheme = () => {
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    window.dispatchEvent(new Event('theme-change'));
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 76;
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const copyToClipboard = async (text: string, field: 'email' | 'phone') => {
    let copied = false;

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(text);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied && typeof document !== 'undefined') {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        copied = document.execCommand('copy');
      } finally {
        document.body.removeChild(textarea);
      }
    }

    if (copied) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    }
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 500);
  };

  const clientCount = projects.filter((p) => p.tier === 'client').length;
  const showcaseCount = projects.filter((p) => p.tier === 'showcase').length;

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.tier === activeFilter;
  });

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' },
  ];

  const techStack = [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Express.js',
    'MySQL',
    'MongoDB',
    'REST APIs',
    'Tailwind CSS',
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] relative transition-colors duration-200">
      {/* Subtle Background Dot Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-dot-pattern opacity-60" />

      {/* Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
          scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => scrollToSection('home')}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg bg-[var(--text-main)] text-[var(--bg-main)] flex items-center justify-center font-bold text-sm tracking-tight group-hover:opacity-85 transition-opacity">
              NE
            </div>
            <div className="text-left">
              <span className="font-bold text-sm sm:text-base tracking-tight block">
                Nuru Endris
              </span>
              <span className="text-[11px] text-[var(--text-dim)] font-mono hidden sm:block">
                Full-Stack Developer
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-black/5 dark:bg-white/10 text-[var(--text-main)] font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-black/[0.03] dark:hover:bg-white/[0.05]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2.5">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg surface-panel text-[var(--text-main)] hover:opacity-80 cursor-pointer"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <FaSun className="w-4 h-4" />
              ) : (
                <FaMoon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 rounded-lg bg-[var(--text-main)] text-[var(--bg-main)] text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
            >
              <span>Hire Me</span>
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-lg surface-panel text-[var(--text-main)]"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <FaSun className="w-4 h-4" />
              ) : (
                <FaMoon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-lg surface-panel text-[var(--text-main)]"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="w-4 h-4" />
              ) : (
                <div className="w-4 h-3.5 flex flex-col justify-between">
                  <span className="w-full h-0.5 bg-[var(--text-main)] rounded-full" />
                  <span className="w-full h-0.5 bg-[var(--text-main)] rounded-full" />
                  <span className="w-2/3 h-0.5 bg-[var(--text-main)] rounded-full ml-auto" />
                </div>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-4 glass-nav mt-2 space-y-1 animate-fadeIn">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium ${
                  activeSection === item.id
                    ? 'bg-black/5 dark:bg-white/10 font-semibold'
                    : 'text-[var(--text-muted)]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full mt-2 py-2.5 rounded-lg bg-[var(--text-main)] text-[var(--bg-main)] font-semibold text-sm flex items-center justify-center gap-2"
            >
              <span>Hire Me</span>
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* HERO SECTION */}
        <section id="home" className="pt-32 pb-20 sm:pt-40 sm:pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full surface-panel text-xs font-medium text-[var(--text-muted)]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>Available for Full-Stack Roles &amp; Consulting</span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
                    Nuru Endris
                  </h1>
                  <p className="text-lg sm:text-xl font-semibold text-[var(--text-muted)]">
                    Full-Stack Web Developer &amp; Systems Specialist
                  </p>
                </div>

                <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-2xl">
                  Building reliable, accessible web platforms, admin portals, and
                  RESTful APIs at{' '}
                  <span className="font-semibold text-[var(--text-main)]">
                    Yegofi Technology
                  </span>
                  , backed by over 8 years of computing and technical systems
                  leadership at{' '}
                  <span className="font-semibold text-[var(--text-main)]">
                    Wollo University
                  </span>
                  .
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="px-6 py-3 rounded-xl bg-[var(--text-main)] text-[var(--bg-main)] font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Projects</span>
                    <FaArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="px-6 py-3 rounded-xl surface-panel font-semibold text-sm hover:border-[var(--border-hover)] cursor-pointer"
                  >
                    Get in Touch
                  </button>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  {[
                    {
                      icon: FaLinkedin,
                      href: 'https://www.linkedin.com/in/nuru-endris-757645163/',
                      label: 'LinkedIn',
                    },
                    {
                      icon: FaGithub,
                      href: 'https://github.com/nuredin05',
                      label: 'GitHub',
                    },
                    {
                      icon: FaEnvelope,
                      href: 'mailto:nuru.endriscs@gmail.com',
                      label: 'Email',
                    },
                    {
                      icon: FaPhone,
                      href: 'tel:+251913912388',
                      label: 'Phone',
                    },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={
                        href.startsWith('http')
                          ? 'noopener noreferrer'
                          : undefined
                      }
                      className="w-9 h-9 rounded-lg surface-panel flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--border-hover)]"
                      aria-label={label}
                      title={label}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[var(--border-main)] max-w-lg">
                  <div>
                    <div className="text-2xl font-bold">8+ yrs</div>
                    <div className="text-xs text-[var(--text-dim)] mt-0.5">
                      Systems &amp; IT Tenure
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">2+ yrs</div>
                    <div className="text-xs text-[var(--text-dim)] mt-0.5">
                      Full-Stack Delivery
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{clientCount}+</div>
                    <div className="text-xs text-[var(--text-dim)] mt-0.5">
                      Production Portals
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="surface-card rounded-3xl p-3 max-w-sm w-full">
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-900">
                    <Image
                      src="/me.jpg"
                      alt="Nuru Endris"
                      fill
                      sizes="(max-width: 768px) 320px, 384px"
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                  <div className="px-2 pt-3 pb-1 flex items-center justify-between text-xs text-[var(--text-muted)]">
                    <span className="font-medium text-[var(--text-main)]">
                      Addis Ababa &amp; Kombolcha
                    </span>
                    <span className="font-mono text-[11px] text-[var(--text-dim)]">
                      Remote-ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT & CAPABILITIES */}
        <section id="about" className="py-20 border-t border-[var(--border-main)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-dim)]">
                About &amp; Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Engineering dependable software from interface to database
              </h2>
              <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
                I partner with organizations, institutes, and growing teams to
                design and ship responsive web portals, secure admin workflows,
                and clean API integrations that hold up in production.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: FaLaptopCode,
                  title: 'Frontend Engineering',
                  desc: 'Accessible, responsive interfaces and modular dashboards built with React, Next.js, TypeScript, and Tailwind CSS.',
                },
                {
                  icon: FaServer,
                  title: 'Backend & REST APIs',
                  desc: 'Structured Node.js and Express services with role-based access control, authentication, and reliable integrations.',
                },
                {
                  icon: FaDatabase,
                  title: 'Databases & Operations',
                  desc: 'Schema design, query optimization, and production support across MySQL, MongoDB, and institutional infrastructure.',
                },
              ].map((pillar) => (
                <div
                  key={pillar.title}
                  className="surface-card rounded-2xl p-6 space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center">
                    <pillar.icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold">{pillar.title}</h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-mono text-[var(--text-dim)] mr-2">
                Core Stack:
              </span>
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono surface-panel text-[var(--text-muted)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section
          id="projects"
          className="py-20 border-t border-[var(--border-main)]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl space-y-3">
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-dim)]">
                  Selected Work
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Projects &amp; Production Systems
                </h2>
                <p className="text-[var(--text-muted)] text-sm sm:text-base">
                  Client portals, institutional platforms, and full-stack web
                  applications delivered across finance, education, non-profit,
                  and commerce.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'client' as const, label: `Client Systems (${clientCount})` },
                  { id: 'all' as const, label: `All (${projects.length})` },
                  { id: 'showcase' as const, label: `Showcases (${showcaseCount})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      activeFilter === tab.id
                        ? 'bg-[var(--text-main)] text-[var(--bg-main)]'
                        : 'surface-panel text-[var(--text-muted)] hover:text-[var(--text-main)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const PreviewIcon = getProjectIcon(project.iconKey);

                return (
                  <article
                    key={project.id}
                    className="surface-card rounded-2xl overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Preview Banner */}
                      {project.img ? (
                        <div className="relative h-44 w-full bg-neutral-900 overflow-hidden border-b border-[var(--border-main)]">
                          <Image
                            src={project.img}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover object-top"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-black/80 text-white backdrop-blur-sm">
                              {project.categoryLabel}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="px-6 pt-6 pb-2 flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 border border-[var(--border-main)] flex items-center justify-center">
                            <PreviewIcon className="w-4 h-4" />
                          </div>
                          <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-black/5 dark:bg-white/10 text-[var(--text-muted)]">
                            {project.categoryLabel}
                          </span>
                        </div>
                      )}

                      {/* Body */}
                      <div className="p-6 pt-4 space-y-2.5">
                        <div>
                          <h3 className="text-lg font-bold leading-snug">
                            <button
                              onClick={() => setSelectedProject(project)}
                              className="text-left hover:underline cursor-pointer"
                            >
                              {project.title}
                            </button>
                          </h3>
                          {project.subtitle && (
                            <p className="text-xs font-mono text-[var(--text-dim)] mt-0.5">
                              {project.subtitle}
                            </p>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 pb-6 space-y-4">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-black/[0.04] dark:bg-white/[0.07] text-[var(--text-muted)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-main)] gap-2">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold hover:opacity-75 transition-opacity cursor-pointer"
                        >
                          <span>View Details</span>
                          <FaArrowRight className="w-3 h-3" />
                        </button>

                        <div className="flex items-center gap-2">
                          {project.demoLink ? (
                            <a
                              href={project.demoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--text-main)] text-[var(--bg-main)] hover:opacity-90 transition-opacity"
                            >
                              <span>Live</span>
                              <FaExternalLinkAlt className="w-2.5 h-2.5" />
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--text-dim)]">
                              <FaLock className="w-2.5 h-2.5" />
                              <span>Client System</span>
                            </span>
                          )}

                          {project.codeLink && (
                            <a
                              href={project.codeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg surface-panel text-[var(--text-muted)] hover:text-[var(--text-main)]"
                              aria-label={`${project.title} repository`}
                              title="View Source"
                            >
                              <FaGithub className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section
          id="experience"
          className="py-20 border-t border-[var(--border-main)]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-dim)]">
                Background
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Experience &amp; Training
              </h2>
            </div>

            <div className="divide-y divide-[var(--border-main)] border-y border-[var(--border-main)]">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start"
                >
                  <div className="md:col-span-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        {exp.period}
                      </span>
                      {exp.current && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          Current
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[var(--text-dim)]">
                      {exp.type} • {exp.location}
                    </p>
                  </div>

                  <div className="md:col-span-8 space-y-1.5">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h3 className="text-base font-bold">{exp.role}</h3>
                      <span className="text-sm text-[var(--text-muted)]">
                        at {exp.organization}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {exp.summary}
                    </p>
                  </div>
                </div>
              ))}

              <div className="py-6 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start">
                <div className="md:col-span-4 space-y-1">
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    Certification
                  </span>
                  <p className="text-xs text-[var(--text-dim)]">
                    Full-Stack Fellowship
                  </p>
                </div>
                <div className="md:col-span-8 space-y-1.5">
                  <div className="flex flex-wrap items-baseline gap-x-2">
                    <h3 className="text-base font-bold">
                      Full-Stack Web Development
                    </h3>
                    <span className="text-sm text-[var(--text-muted)]">
                      at Evangadi Networks
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Intensive software engineering training focused on React,
                    Node.js, Express, MySQL relational schemas, and
                    collaborative delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section
          id="contact"
          className="py-20 border-t border-[var(--border-main)]"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-10">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--text-dim)]">
                Contact
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Let&apos;s work together
              </h2>
              <p className="text-[var(--text-muted)] text-sm sm:text-base">
                Open to full-stack developer roles, frontend architecture, and
                custom web platform engagements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-3">
                <div className="surface-card rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <FaEnvelope className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[11px] font-mono text-[var(--text-dim)]">
                          Email
                        </div>
                        <a
                          href="mailto:nuru.endriscs@gmail.com"
                          className="text-sm font-medium hover:underline truncate block"
                        >
                          nuru.endriscs@gmail.com
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard('nuru.endriscs@gmail.com', 'email')
                      }
                      className="p-2 rounded-lg surface-panel text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer shrink-0"
                      title="Copy email"
                      aria-label="Copy email"
                    >
                      {copiedField === 'email' ? (
                        <FaCheck className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <FaRegCopy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-[var(--border-main)]">
                    <div className="flex items-center gap-3 min-w-0">
                      <FaPhone className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                      <div className="min-w-0">
                        <div className="text-[11px] font-mono text-[var(--text-dim)]">
                          Phone / Telegram
                        </div>
                        <a
                          href="tel:+251913912388"
                          className="text-sm font-medium hover:underline truncate block"
                        >
                          +251 913 91 23 88
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => copyToClipboard('+251913912388', 'phone')}
                      className="p-2 rounded-lg surface-panel text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer shrink-0"
                      title="Copy phone"
                      aria-label="Copy phone"
                    >
                      {copiedField === 'phone' ? (
                        <FaCheck className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <FaRegCopy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 pt-3 border-t border-[var(--border-main)]">
                    <FaMapMarkerAlt className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                    <div>
                      <div className="text-[11px] font-mono text-[var(--text-dim)]">
                        Location
                      </div>
                      <div className="text-sm font-medium">
                        Addis Ababa &amp; Kombolcha, Ethiopia
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[var(--border-main)]">
                    <a
                      href="https://www.linkedin.com/in/nuru-endris-757645163/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl surface-panel text-xs font-semibold flex items-center justify-center gap-2 hover:border-[var(--border-hover)]"
                    >
                      <FaLinkedin className="w-3.5 h-3.5" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="https://github.com/nuredin05"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 rounded-xl surface-panel text-xs font-semibold flex items-center justify-center gap-2 hover:border-[var(--border-hover)]"
                    >
                      <FaGithub className="w-3.5 h-3.5" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="surface-card rounded-2xl p-6 sm:p-8">
                  {formSubmitted ? (
                    <div className="py-10 text-center space-y-4 animate-fadeIn">
                      <FaCheckCircle className="w-10 h-10 mx-auto text-emerald-500" />
                      <h3 className="text-xl font-bold">Message Received</h3>
                      <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto">
                        Thank you for reaching out. I typically reply within 24
                        hours.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="px-5 py-2.5 rounded-xl bg-[var(--text-main)] text-[var(--bg-main)] text-xs font-semibold cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-[var(--text-muted)] block">
                            Name
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl bg-transparent border border-[var(--border-main)] text-sm focus:border-[var(--text-main)] focus:outline-none transition-colors"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-[var(--text-muted)] block">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="you@company.com"
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-3.5 py-2.5 rounded-xl bg-transparent border border-[var(--border-main)] text-sm focus:border-[var(--text-main)] focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[var(--text-muted)] block">
                          Subject
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Project inquiry or role"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-transparent border border-[var(--border-main)] text-sm focus:border-[var(--text-main)] focus:outline-none transition-colors"
                        />
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {[
                            'Full-Time Role',
                            'Web Application',
                            'API & Backend',
                            'Consulting',
                          ].map((topic) => (
                            <button
                              key={topic}
                              type="button"
                              onClick={() =>
                                setFormData({ ...formData, subject: topic })
                              }
                              className="px-2.5 py-1 rounded-md text-[11px] font-medium surface-panel text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[var(--text-muted)] block">
                          Message
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell me a little about your project or team..."
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-2.5 rounded-xl bg-transparent border border-[var(--border-main)] text-sm focus:border-[var(--text-main)] focus:outline-none transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 rounded-xl bg-[var(--text-main)] text-[var(--bg-main)] font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        <span>
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </span>
                        {!isSubmitting && <FaArrowRight className="w-3.5 h-3.5" />}
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
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="surface-card w-full max-w-2xl rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 relative shadow-2xl"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg surface-panel text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
              aria-label="Close modal"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            <div className="space-y-1.5 pr-10">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-black/5 dark:bg-white/10 text-[var(--text-muted)] inline-block">
                {selectedProject.categoryLabel}
              </span>
              <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
              {selectedProject.subtitle && (
                <p className="text-xs font-mono text-[var(--text-dim)]">
                  {selectedProject.subtitle}
                </p>
              )}
            </div>

            {selectedProject.img && (
              <div className="relative h-52 sm:h-60 rounded-xl overflow-hidden bg-neutral-900 border border-[var(--border-main)]">
                <Image
                  src={selectedProject.img}
                  alt={selectedProject.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 640px"
                  className="object-cover object-top"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-dim)]">
                Overview
              </h4>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                {selectedProject.longDescription}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-dim)]">
                Key Deliverables
              </h4>
              <ul className="space-y-2">
                {selectedProject.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2.5 text-sm text-[var(--text-muted)]"
                  >
                    <FaCheckCircle className="w-3.5 h-3.5 text-[var(--text-main)] shrink-0 mt-1" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--text-dim)]">
                Stack &amp; Focus
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-black/[0.04] dark:bg-white/[0.08] text-[var(--text-muted)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-4 border-t border-[var(--border-main)]">
              {selectedProject.codeLink && (
                <a
                  href={selectedProject.codeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl surface-panel text-xs font-semibold flex items-center gap-2 hover:border-[var(--border-hover)]"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span>View Source</span>
                </a>
              )}
              {selectedProject.demoLink ? (
                <a
                  href={selectedProject.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[var(--text-main)] text-[var(--bg-main)] text-xs font-semibold flex items-center gap-2 hover:opacity-90"
                >
                  <FaExternalLinkAlt className="w-3 h-3" />
                  <span>Open Live Site</span>
                </a>
              ) : (
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl bg-[var(--text-main)] text-[var(--bg-main)] text-xs font-semibold cursor-pointer"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-[var(--border-main)] py-8 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-dim)]">
          <span>© {new Date().getFullYear()} Nuru Endris</span>

          <div className="flex items-center gap-3">
            {[
              {
                icon: FaLinkedin,
                href: 'https://www.linkedin.com/in/nuru-endris-757645163/',
                label: 'LinkedIn',
              },
              {
                icon: FaGithub,
                href: 'https://github.com/nuredin05',
                label: 'GitHub',
              },
              {
                icon: FaEnvelope,
                href: 'mailto:nuru.endriscs@gmail.com',
                label: 'Email',
              },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={
                  href.startsWith('http') ? 'noopener noreferrer' : undefined
                }
                className="p-2 rounded-lg hover:text-[var(--text-main)] transition-colors"
                aria-label={label}
              >
                <Icon className="w-3.5 h-3.5" />
              </a>
            ))}

            <button
              onClick={() => scrollToSection('home')}
              className="p-2 rounded-lg surface-panel text-[var(--text-main)] hover:opacity-80 cursor-pointer"
              title="Back to Top"
              aria-label="Back to Top"
            >
              <FaArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
