export type ProjectCategory = 'fullstack' | 'frontend' | 'ecommerce' | 'showcase';

export interface Project {
  id: string;
  title: string;
  subtitle?: string;
  category: ProjectCategory;
  categoryLabel: string;
  tier: 'client' | 'showcase';
  description: string;
  longDescription: string;
  highlights: string[];
  tech: string[];
  img?: string;
  demoLink?: string;
  codeLink?: string;
  featured?: boolean;
  iconKey?: 'finance' | 'education' | 'makerspace' | 'charity' | 'engineering';
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  location: string;
  current?: boolean;
  summary: string;
}

export const projects: Project[] = [
  {
    id: 'medina-united-mfc',
    title: 'Medina United MFC',
    subtitle: 'Full-Stack Web Platform & Admin Portal',
    category: 'fullstack',
    categoryLabel: 'FinTech & Admin Portal',
    tier: 'client',
    description:
      'Engineered responsive frontend interfaces and backend REST API integrations for financial service workflows, member account management, role-based admin access controls, and real-time operational reporting.',
    longDescription:
      'Full-stack web platform and administrative portal built for Medina United MFC. Designed and integrated responsive user interfaces with backend REST APIs to power core financial service workflows, structured member account management, granular role-based admin access controls, and real-time operational reporting.',
    highlights: [
      'Financial service workflows & member account management',
      'Role-based admin access controls (RBAC)',
      'Real-time operational reporting & monitoring',
      'Responsive frontend & backend REST API integrations',
    ],
    tech: ['Responsive UI', 'REST APIs', 'RBAC', 'Admin Portal', 'Live Reporting'],
    iconKey: 'finance',
    featured: true,
  },
  {
    id: 'doc-institute',
    title: 'DOC Institute',
    subtitle: 'Full-Stack Educational & Training Portal',
    category: 'fullstack',
    categoryLabel: 'Educational Portal',
    tier: 'client',
    description:
      'Developed and maintained the institutional web portal, interactive course/program management dashboards, user registration workflows, database schemas, and ongoing content/system updates.',
    longDescription:
      'End-to-end educational and training portal engineered for DOC Institute. Built and maintained the public institutional portal alongside interactive course and program management dashboards, streamlined user registration workflows, structured database schemas, and continuous content and system updates.',
    highlights: [
      'Institutional web portal & content management',
      'Interactive course & program management dashboards',
      'Structured user registration & enrollment workflows',
      'Database schema design & ongoing system maintenance',
    ],
    tech: ['Full-Stack', 'Dashboards', 'Database Schemas', 'Registration Flows', 'Web Portal'],
    iconKey: 'education',
    featured: true,
  },
  {
    id: 'etd-ifm-makerspace',
    title: 'EtD-FaM Makerspace',
    subtitle: 'Co-funded by the European Union • Frontend & Portal Engineering',
    category: 'frontend',
    categoryLabel: 'EU Co-Funded Portal',
    tier: 'client',
    description:
      'Built accessible, multi-device frontend modules and administrative tools supporting innovation program tracking, equipment/facility scheduling, stakeholder reporting, and user support.',
    longDescription:
      'Frontend and portal engineering for the EtD-FaM (Ethiopian-Djibouti Females at Makerspace) project, co-funded by the European Union. Delivered accessible, multi-device frontend modules and administrative tools supporting innovation program tracking, equipment and facility scheduling, stakeholder reporting, and responsive user support.',
    highlights: [
      'Accessible, multi-device frontend modules',
      'Innovation program tracking & administrative tools',
      'Equipment & facility scheduling workflows',
      'Stakeholder reporting & user support systems',
    ],
    tech: ['Frontend Modules', 'Accessible UI', 'Scheduling Tools', 'Program Tracking', 'Reporting'],
    img: '/etd-fam.jpg',
    demoLink: 'https://etd-fam.arsiun.edu.et/',
    iconKey: 'makerspace',
    featured: true,
  },
  {
    id: 'berzegi-charity',
    title: 'Berzegi Charity Organization',
    subtitle: 'Full-Stack Web Application & Beneficiary Management',
    category: 'fullstack',
    categoryLabel: 'Non-Profit Platform',
    tier: 'client',
    description:
      'Designed and deployed a full-stack community and donor engagement platform featuring secure administrative controls, beneficiary/program data management, and automated content publishing.',
    longDescription:
      'Full-stack community and donor engagement platform designed and deployed for Berzegi Charity Organization. Combines public storytelling and donor outreach with secure administrative controls, structured beneficiary and program data management, and automated content publishing.',
    highlights: [
      'Community & donor engagement platform',
      'Secure administrative controls & permissions',
      'Beneficiary & program data management',
      'Automated content publishing workflows',
    ],
    tech: ['Full-Stack Web', 'Admin Controls', 'Data Management', 'Auto Publishing', 'Donor UI'],
    iconKey: 'charity',
    featured: true,
  },
  {
    id: 'etop-it-solutions',
    title: 'Etop IT Solutions',
    subtitle: 'Frontend Engineering, Testing & Deployment Support',
    category: 'frontend',
    categoryLabel: 'Frontend & QA Support',
    tier: 'client',
    description:
      'Contributed modular UI components, responsive layouts, API integrations, and end-to-end debugging and performance optimization to ensure reliable production releases.',
    longDescription:
      'Frontend engineering, testing, and deployment support for Etop IT Solutions. Built reusable modular UI components and responsive layouts, implemented frontend-to-backend API integrations, and executed end-to-end debugging and performance optimization to safeguard reliable production releases.',
    highlights: [
      'Modular UI components & responsive layouts',
      'Frontend-to-backend API integrations',
      'End-to-end debugging & issue resolution',
      'Performance optimization & production release support',
    ],
    tech: ['Modular UI', 'Responsive Layouts', 'API Integration', 'E2E Debugging', 'Performance'],
    iconKey: 'engineering',
    featured: true,
  },
  {
    id: 'amana-school',
    title: 'Amana Model Secondary School',
    subtitle: 'Enterprise Academic & School Management System',
    category: 'fullstack',
    categoryLabel: 'Education System',
    tier: 'client',
    description:
      'Comprehensive academic enterprise portal managing student records, grade computation, attendance tracking, and role-based administrative workflows.',
    longDescription:
      'Engineered a scalable full-stack school management system for Amana Model Secondary School (hosted on Yegofi Technology infrastructure). Built with a responsive React frontend and Node.js/Express backend with MySQL, delivering secure role-based access for teachers, students, and administrators.',
    highlights: [
      'Role-based access control (Admin, Teacher, Student, Registrar)',
      'Automated academic grade computation & report card generation',
      'Student attendance tracking & behavioral logging',
      'Responsive mobile-optimized dashboard',
    ],
    tech: ['React', 'Node.js', 'Express.js', 'MySQL', 'REST API', 'Tailwind CSS'],
    img: '/amss.png',
    demoLink: 'https://amana.yegofi.com/',
    codeLink: 'https://github.com/nuredin05',
    featured: true,
  },
  {
    id: 'tailor-shop',
    title: 'Anawar Fashion & Bespoke Tailoring',
    subtitle: 'Custom Garment E-Commerce & Appointment Platform',
    category: 'ecommerce',
    categoryLabel: 'Bespoke E-Commerce',
    tier: 'client',
    description:
      'Digital bespoke fashion platform featuring interactive custom measurement input, fitting appointment booking, fabric selection, and real-time order tracking.',
    longDescription:
      'Developed a tailor management platform for Anawar Fashion Tailor, enabling clients to order tailored attire, specify exact body measurements, schedule fitting appointments, and track order production stages in real time.',
    highlights: [
      'Interactive custom body measurement configurator',
      'Appointment booking & fitting schedule manager',
      'Stripe & payment gateway integration',
      'Admin order production pipeline & notifications',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'Express.js', 'Stripe', 'Tailwind CSS'],
    img: '/tailor.png',
    demoLink: 'https://ana.fashion.yegofi.com',
    codeLink: 'https://github.com/nuredin05/student_behavior_tracking_system',
    featured: true,
  },
  {
    id: 'evangadi-forum',
    title: 'Evangadi Tech Community Forum',
    subtitle: 'Full-Stack Developer Q&A Platform',
    category: 'fullstack',
    categoryLabel: 'Community Platform',
    tier: 'showcase',
    description:
      'Developer discussion platform featuring JWT authentication, question posting, nested answer threads, and relational MySQL storage.',
    longDescription:
      'Engineered a collaborative developer Q&A forum platform with secure user authentication, question categorization, thread replies, and relational MySQL database storage.',
    highlights: [
      'Secure JWT authentication & password hashing',
      'Nested Q&A thread discussion architecture',
      'Relational MySQL schema for questions & answers',
      'Redux global state management',
    ],
    tech: ['React', 'Redux', 'Node.js', 'Express', 'MySQL', 'JWT Auth'],
    img: '/evangadi.png',
    demoLink: 'https://evangadi-forum-nes.netlify.app/',
    codeLink: 'https://github.com/nuredin05/evangadi-forum',
  },
  {
    id: 'portfolio-v2',
    title: 'Developer Portfolio v2',
    subtitle: 'Next.js 16 & React 19 Personal Website',
    category: 'frontend',
    categoryLabel: 'Next.js 16 Web App',
    tier: 'showcase',
    description:
      'Minimalist, high-performance developer portfolio built with Next.js 16 App Router, React 19, TypeScript, and Tailwind CSS.',
    longDescription:
      'Designed and implemented a responsive, accessible developer portfolio with project case-study modals, dark/light theme persistence, and clean editorial typography.',
    highlights: [
      'Next.js 16 App Router & React 19 architecture',
      'High-contrast minimalist light & dark theme',
      'Clean responsive layout & interactive modals',
      'Fast static rendering & SEO metadata',
    ],
    tech: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS'],
    img: '/portfolio.png',
    demoLink: 'https://nuru-portfolio.vercel.app/',
    codeLink: 'https://github.com/nuredin05/MY-PORTFOLIO',
  },
  {
    id: 'amazon-clone',
    title: 'Amazon E-Commerce Clone',
    subtitle: 'Full-Stack Storefront & Checkout Flow',
    category: 'ecommerce',
    categoryLabel: 'E-Commerce Showcase',
    tier: 'showcase',
    description:
      'End-to-end e-commerce storefront featuring product catalogs, persistent shopping cart, Firebase authentication, and Stripe payments.',
    longDescription:
      'Architected an end-to-end e-commerce application mirroring core storefront capabilities: persistent multi-item basket, user authentication, Stripe payment integration, and cloud-hosted database functions.',
    highlights: [
      'Real-time shopping cart & price calculation',
      'Firebase authentication & secure session storage',
      'Stripe card processing & order history logging',
      'Search & category filtering system',
    ],
    tech: ['React', 'Node.js', 'Firebase Auth', 'Firestore', 'Stripe API'],
    img: '/amazon.png',
    demoLink: 'https://amazonprojnes.netlify.app/',
    codeLink: 'https://github.com/nuredin05/amazon-clone',
  },
  {
    id: 'netflix-clone',
    title: 'Netflix Streaming UI',
    subtitle: 'TMDB-Powered Media Discovery App',
    category: 'showcase',
    categoryLabel: 'Streaming UI',
    tier: 'showcase',
    description:
      'Media streaming web application integrated with TMDB API for trending titles, trailer previews, and responsive category carousels.',
    longDescription:
      'Crafted a high-fidelity streaming UI featuring real-time movie and TV show data from TMDB API, dynamic hero banners, YouTube trailer embeds on click, and responsive multi-row horizontal sliders.',
    highlights: [
      'TMDB live API data streaming & categorization',
      'Dynamic video trailer modal with React YouTube',
      'Smooth horizontal carousel touch scrolling',
      'Optimized image lazy loading & backdrop rendering',
    ],
    tech: ['React', 'TMDB API', 'Axios', 'Firebase', 'CSS Modules'],
    img: '/netflix.png',
    demoLink: 'https://my-netflix-clone-nes.netlify.app/',
    codeLink: 'https://github.com/nuredin05/my-netflix-clone',
  },
  {
    id: 'apple-clone',
    title: 'Apple Product Showcase',
    subtitle: 'Interactive Product Presentation Page',
    category: 'showcase',
    categoryLabel: 'UI Showcase',
    tier: 'showcase',
    description:
      'Product showcase website highlighting clean minimalist typography, responsive product sections, and interactive layout transitions.',
    longDescription:
      'Developed an interactive product presentation page inspired by Apple design language, featuring smooth transitions, high-resolution product sections, and responsive typography.',
    highlights: [
      'Minimalist typography & editorial layout',
      'Interactive product spec compare table',
      'Smooth scroll micro-interactions',
      'Express backend with Firebase cloud integration',
    ],
    tech: ['React', 'Node.js', 'Express', 'Firebase', 'Tailwind CSS'],
    img: '/apple.png',
    demoLink: 'https://apple-clone-nes.netlify.app/',
    codeLink: 'https://github.com/nuredin05/amazon-clone',
  },
];

export const experiences: ExperienceItem[] = [
  {
    id: 'yegofi-fullstack',
    role: 'Full Stack Developer',
    organization: 'Yegofi Technology',
    period: 'Apr 2026 – Present',
    type: 'Full-time • Hybrid',
    location: 'Addis Ababa, Ethiopia',
    current: true,
    summary:
      'Engineering modern web applications, scalable REST APIs, and relational/NoSQL database architectures while leading end-to-end system delivery.',
  },
  {
    id: 'yegofi-frontend',
    role: 'Frontend Web Developer',
    organization: 'Yegofi Technology',
    period: 'Sep 2024 – Present',
    type: 'Full-time • Remote',
    location: 'Addis Ababa, Ethiopia',
    current: true,
    summary:
      'Building performant, accessible interfaces with React, Next.js, TypeScript, and Tailwind CSS for responsive dashboards and client portals.',
  },
  {
    id: 'wollo-chief',
    role: 'Chief Technical Assistant',
    organization: 'Wollo University',
    period: 'Jul 2024 – Present',
    type: 'Full-time • 8+ yrs total tenure',
    location: 'Kombolcha, Ethiopia',
    current: true,
    summary:
      'Leading institutional computing operations, server administration, network infrastructure maintenance, and advanced technical systems support.',
  },
  {
    id: 'wollo-senior',
    role: 'Senior Technical Assistant',
    organization: 'Wollo University',
    period: 'May 2018 – Jun 2024',
    type: '6 yrs 2 mos',
    location: 'Kombolcha, Ethiopia',
    summary:
      'Delivered technical systems support, hardware diagnostics, network troubleshooting, and software deployment across university computing labs.',
  },
];
