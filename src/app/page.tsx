'use client';
import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHtml5, FaCss3Alt, FaJs, FaReact, FaVuejs, FaNodeJs, FaPython, FaGitAlt, FaFigma, FaExternalLinkAlt, FaServer, FaDatabase, FaCode, FaTerminal, FaMapMarkerAlt, FaPhone, FaInstagram } from 'react-icons/fa';
export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      // Update active section
      const sections = ['home', 'about', 'skills', 'partners', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-yellow-900/98 shadow-lg' : 'bg-transparent backdrop-blur-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="flex-shrink-0">
              <img className="w-20 h-10 text-yellow-900" src="/logo_n.png" alt="NE"></img>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['home', 'about', 'skills', 'partners', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize text-yellow-600/95  px-3 py-2 text-sm font-medium transition-colors relative ${activeSection === item ? 'text-white' : ''
                      }`}
                  >
                    {item}
                    {activeSection === item && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500"></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                type='submit'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-yellow-500 hover:bg-secondaryClr-100 focus:outline-none"
              >
                <div className="space-y-1">
                  <span className={`block w-6 h-0.5 bg-current transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-current transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-6 h-0.5 bg-current transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64' : 'max-h-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-secondaryClr-50 shadow-lg">
            {['home', 'about', 'skills', 'partners', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-yellow-700 hover:text-yellow-500 hover:bg-secondaryClr-100 capitalize"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-white" >
        <div className="absolute inset-0">
          <img
            src="/bg.jpg"
            alt="Nuru Endris"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-yellow-900">
            <h1 className="text-4xl lg:text-7xl font-bold leading-tight mb-6">
              Hi, I'm <span className="text-yellow-900">Nuru Endris</span>
            </h1>
            <h2 className="text-2xl lg:text-4xl font-light mb-8 opacity-90">Full Stack Developer</h2>
            <p className="text-lg lg:text-xl opacity-80 mb-10 leading-relaxed max-w-2xl">
              Passionate about creating innovative web solutions and bringing ideas to life through code. Specializing in modern web technologies and user-centric design.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mb-10">
              <button
                onClick={() => scrollToSection('contact')}
                className="px-10 py-4 bg-yellow-900 text-white rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all text-lg"
              >
                Get In Touch
              </button>
              <button
                onClick={() => scrollToSection('projects')}
                className="px-10 py-4 border-2 border-yellow-900 text-secondaryClr rounded-full font-semibold hover:bg-secondaryClr hover:text-yellow-900 transition-all text-lg"
              >
                View Projects
              </button>
            </div>
            <div className="flex gap-6">
              {[
                { icon: FaGithub, label: 'GitHub', url: 'https://github.com/nuredin05' },
                { icon: FaLinkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/nuru-endris-757645163/' },
                { icon: FaTwitter, label: 'Twitter', url: '#' },
                { icon: FaEnvelope, label: 'Email', url: '#' }
              ].map(({ icon: Icon, label, url }) => (
                <a
                  key={label}
                  href={url}
                  className="w-12 h-12 bg-yellow-900/10 rounded-full flex items-center justify-center text-yellow-900 hover:bg-yellow-800/20 transform hover:-translate-y-1 transition-all border border-yellow-900/20"
                  aria-label={label}
                >
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 bg-transparent rounded-full flex items-center justify-center border-4 border-yellow-900/50 animate-float shadow-2xl">
                <img
                  src="/me.jpg"
                  alt="Nuru Endris"
                  className="w-72 h-72 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-yellow-900/30"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-yellow-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-16 text-white">
            About Me
          </h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-white mb-8 leading-relaxed">
              I'm a passionate full-stack developer with a keen eye for detail and a love for creating elegant, efficient solutions to complex problems. With expertise in modern web technologies, I bring ideas to life through clean, maintainable code.
            </p>
            <p className="text-xl text-white mb-16 leading-relaxed">
              My journey in web development started with curiosity and has evolved into a career driven by continuous learning and innovation. I specialize in building responsive, user-friendly applications that deliver exceptional experiences.
            </p>
            <div className="flex justify-center gap-16">
              {[
                { number: '2+', label: 'Years Experience' },
                { number: '10+', label: 'Projects Completed' },
                { number: '5+', label: 'Happy Clients' }
              ].map(({ number, label }) => (
                <div key={label} className="text-center">
                  <div className="text-4xl font-bold text-yellow-900 mb-3">{number}</div>
                  <div className="text-sm text-yellow-600 uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-16 text-yellow-900">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                title: 'Frontend',
                skills: [
                  { icon: FaHtml5, name: 'HTML5' },
                  { icon: FaCss3Alt, name: 'CSS3' },
                  { icon: FaJs, name: 'JavaScript' },
                  { icon: FaReact, name: 'React' },
                  { icon: FaVuejs, name: 'Vue.js' },
                  { icon: FaFigma, name: 'Figma' }
                ]
              },
              {
                title: 'Backend',
                skills: [
                  { icon: FaNodeJs, name: 'Node.js' },
                  { icon: FaServer, name: 'Express.js' },
                  { icon: FaDatabase, name: 'MongoDB' },
                  { icon: FaDatabase, name: 'MySQL' },
                  { icon: FaPython, name: 'FireBase' }
                ]
              },
              {
                title: 'Tools & Others',
                skills: [
                  { icon: FaGitAlt, name: 'Git' },
                  { icon: FaCode, name: 'VS Code' },
                  { icon: FaTerminal, name: 'Terminal' },
                  { icon: FaGithub, name: 'GitHub' }
                ]
              }
            ].map(({ title, skills }) => (
              <div key={title} className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all border border-yellow-900">
                <h3 className="text-2xl font-semibold mb-8 text-yellow-900">{title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {skills.map(({ icon: Icon, name }) => (
                    <div key={name} className="flex flex-col items-center   rounded-2xl transform hover:-translate-y-1 transition-all cursor-pointer">
                      <Icon className="w-12 h-12 mb-3 text-yellow-900" />
                      <span className="text-sm font-medium">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Projects Section */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-16 text-yellow-900">
            Recent Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: 'Amana School System',
                description: 'A comprehensive school management system designed for Amana Model Secondary School, featuring student records, academic tracking, and administrative tools to revolutionize the educational experience.',
                tech: ['React', 'Node.js', 'Express', 'MySQL'],
                img: '/amss.png',
                demoLink: 'https://amana.yegofi.com/',
                codeLink: 'https://github.com/nuredin05'
              },
              {
                title: 'Tailor Shop',
                description: 'A custom tailoring service platform with appointment booking, measurement tracking, fabric selection, and order management for bespoke clothing.',
                tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
                img: '/tailor.png',
                demoLink: 'https://ana.fashion.yegofi.com',
                codeLink: 'https://github.com/nuredin05/student_behavior_tracking_system'
              },
              {
                title: 'Portfolio Website',
                description: 'A responsive portfolio website with smooth animations, project showcase, skills section, and contact form built with modern web technologies.',
                tech: ['Next.js', 'Tailwind', 'Framer'],
                img: '/portfolio.png',
                demoLink: 'https://nuru-portfolio.vercel.app/',
                codeLink: 'https://github.com/nuredin05/MY-PORTFOLIO'
              },
              {
                title: 'Amazon Clone',
                description: 'A fully functional e-commerce platform with product catalog, shopping cart, user authentication, and payment integration mimicking Amazon\'s core features.',
                tech: ['React', 'Node.js', 'firebase'],
                img: '/amazon.png',
                demoLink: 'https://amazonprojnes.netlify.app/',
                codeLink: 'https://github.com/nuredin05/amazon-clone'
              },
              {
                title: 'Netflix Clone',
                description: 'A streaming platform with movie browsing, search functionality, user profiles, and video playback using TMDB API for real movie data.',
                tech: ['react', 'TMDB movies', 'firebase'],
                img: '/netflix.png',
                demoLink: 'https://my-netflix-clone-nes.netlify.app/',
                codeLink: 'https://github.com/nuredin05/my-netflix-clone'
              },
              {
                title: 'Apple Clone',
                description: 'A modern tech showcase website featuring product displays, interactive galleries, and smooth animations inspired by Apple\'s design language.',
                tech: ['React', 'Node.js', 'firebase', 'express'],
                img: '/apple.png',
                demoLink: 'https://apple-clone-nes.netlify.app/',
                codeLink: 'https://github.com/nuredin05/amazon-clone'
              },
              {
                title: 'Evangadi Forum',
                description: 'A community discussion platform with user authentication, post creation, commenting system, and real-time updates for collaborative learning.',
                tech: ['react', 'redux', 'mysql'],
                img: '/evangadi.png',
                demoLink: 'https://evangadi-forum-nes.netlify.app/',
                codeLink: 'https://github.com/nuredin05/evangadi-forum'
              }
            ].map(({ title, description, tech, img, demoLink, codeLink }) => (
              <div key={title} className="bg-yellow-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all border border-yellow-200">
                <div className="h-36 bg-transparent flex items-center justify-center">
                  <img
                    src={img}
                    alt={title}
                    className="w-full h-30 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-2xl font-semibold mb-4 text-yellow-900">{title}</h3>
                  <p className="text-yellow-700 mb-6 leading-relaxed text-lg">{description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {tech.map((techItem) => (
                      <span key={techItem} className="px-4 py-2 bg-yellow-200 text-yellow-900 rounded-full text-sm font-semibold">
                        {techItem}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-6">
                    <a href={demoLink} className="flex items-center gap-2 text-yellow-900 hover:text-yellow-700 font-semibold transition-colors">
                      <FaExternalLinkAlt className="w-5 h-5" />
                      Live Demo
                    </a>
                    <a href={codeLink} className="flex items-center gap-2 text-yellow-900 hover:text-yellow-700 font-semibold transition-colors">
                      <FaGithub className="w-5 h-5" />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Partners Section */}
      <section id="partners" className="py-24 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-16 text-yellow-900">
            Trusted Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            {[
              {
                name: 'Anawar Fashion Tailor',
                img: '/logo1.png',
                link: 'https://ana.fashion.yegofi.com'
              },
              {
                name: 'Amana Model Secondary School',
                img: '/amana_logo.png',
                link: 'https://amana.yegofi.com'
              },
            ].map(({ name, img, link }) => (
              <a key={name} href={link} className="flex flex-col items-center justify-center p-2 ">
                <img src={img} alt={name} className="w-24 h-24 text-yellow-900 border-yellow-900 border-1 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all rounded-full mb-4" />
                <span className="text-sm font-semibold text-yellow-900 text-center">{name} </span>
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-24 bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-16 text-yellow-900">
            Get In Touch
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div>
              <h3 className="text-3xl font-semibold mb-6 text-yellow-900">Let's Connect</h3>
              <p className="text-xl text-yellow-700 mb-10 leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. Whether you have a question or just want to say hi, feel free to reach out!
              </p>
              <div className="space-y-6 mb-10">
                {[
                  { icon: FaEnvelope, text: 'nuru.endriscs@gmail.com' },
                  { icon: FaPhone, text: '+251 913 91 23 88' },
                  { icon: FaMapMarkerAlt, text: 'Kombolcha , Ethiopia' }
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-4 text-yellow-700 text-lg">
                    <Icon className="w-6 h-6 text-yellow-900" />
                    <span>{text}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-6">
                {[
                  { icon: FaGithub, label: 'GitHub', url: 'https://github.com/nuredin05' },
                  { icon: FaLinkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/nuru-endris-757645163/' },
                  { icon: FaTwitter, label: 'Twitter', url: '#' },
                  { icon: FaInstagram, label: 'Instagram', url: '#' }
                ].map(({ icon: Icon, label, url }) => (
                  <a
                    key={label}
                    href={url}
                    className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-900 hover:bg-yellow-300 transition-colors"
                    aria-label={label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            <form className="bg-yellow-50 p-10 rounded-3xl shadow-xl border border-yellow-200">
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-6 py-4 border-2 border-yellow-200 rounded-xl focus:border-yellow-900 focus:outline-none transition-colors bg-yellow-50 text-lg"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-6 py-4 border-2 border-yellow-200 rounded-xl focus:border-yellow-900 focus:outline-none transition-colors bg-yellow-50 text-lg"
                  required
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-6 py-4 border-2 border-yellow-200 rounded-xl focus:border-yellow-900 focus:outline-none transition-colors bg-yellow-50 text-lg"
                  required
                />
                <textarea
                  rows={6}
                  placeholder="Your Message"
                  className="w-full px-6 py-4 border-2 border-yellow-200 rounded-xl focus:border-yellow-900 focus:outline-none transition-colors resize-none bg-yellow-50 text-lg"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-10 py-4 bg-yellow-900 text-secondaryClr rounded-xl font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all text-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl mb-2"> Copyright © {new Date().getFullYear()} Nuru Endris. All rights reserved.</p>

        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
