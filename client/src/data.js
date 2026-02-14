export const techData = [
  {
    id: "frontend",
    name: "Frontend Ecosystem",
    role: "React, Tailwind, GSAP",
    icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    color: "#61DAFB",
    type: "Frontend",
    projects: [
      {
        title: "Modern Interactive Portfolio",
        desc: "High-performance portfolio built with React, Tailwind CSS, and GSAP for smooth animations.",
        video: "https://media.giphy.com/media/l0HlOHDpYtKFBHwMg/giphy.gif",
        tech: ["React", "GSAP", "Tailwind CSS"],
      },
      {
        title: "Dynamic Dashboard",
        desc: "Responsive admin dashboard with real-time data visualization and theme customization.",
        video: "https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif",
        tech: ["React", "Chart.js", "Redux"],
      },
    ],
    journey: [
      {
        date: "2023",
        title: "Web Fundamentals",
        desc: "Deep dive into Semantic HTML5, CSS3 Architecture, and Modern JavaScript (ES6+).",
      },
      {
        date: "2024",
        title: "Component Era",
        desc: "Building scalable UIs with React and styling with utility-first CSS (Tailwind).",
      },
      {
        date: "2025",
        title: "Type Safety & Motion",
        desc: "Adopting TypeScript for robust code and GSAP/Framer Motion for award-winning animations.",
      },
    ],
    stack: ["JavaScript", "TypeScript", "React", "HTML5", "CSS3", "Tailwind", "GSAP", "Framer Motion"],
    learning: ["WebGL", "Three.js", "React Native"],
  },
  {
    id: "backend",
    name: "Backend Engineering",
    role: "Node.js, Express, Databases",
    icon: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    color: "#339933",
    type: "Backend",
    projects: [
      {
        title: "Scalable REST API",
        desc: "Secure RESTful API Architecture with rate limiting, caching, and JWT authentication.",
        video: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm90Zm91bmQ/26tn33aiTi1jbp6DK/giphy.gif",
        tech: ["Node.js", "Express", "MongoDB"],
      },
      {
        title: "Real-Time Systems",
        desc: "WebSocket-based communication server for live chat and notifications.",
        video: "https://media.giphy.com/media/3o7bu3XilJejQ5XUly/giphy.gif",
        tech: ["Socket.io", "Redis", "Node.js"],
      },
    ],
    journey: [
      {
        date: "2024",
        title: "API Development",
        desc: "Mastering Node.js runtimes and building RESTful services with Express.",
      },
      {
        date: "Early 2025",
        title: "Database Architecture",
        desc: "Designing schemas with PostgreSQL (SQL) and MongoDB (NoSQL) for diverse data needs.",
      },
      {
        date: "Late 2025",
        title: "Performance & Security",
        desc: "Implementing Caching (Redis), Real-time comms (Socket.io), and JWT authentication.",
      },
    ],
    stack: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Redis", "Socket.io", "JWT"],
    learning: ["GraphQL", "NestJS", "Microservices"],
  },
  {
    id: "systems",
    name: "Systems Programming",
    role: "C, C++, Low-Level Logic",
    icon: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
    color: "#00599C",
    type: "Systems",
    projects: [
      {
        title: "Algorithm Optimization",
        desc: "Implementation of complex data structures and algorithms with focus on time/space complexity.",
        video: "https://media.giphy.com/media/26n6WywJyh39n1pW8/giphy.gif",
        tech: ["C++", "STL", "Memory Management"],
      },
    ],
    journey: [
      {
        date: "Phase 1",
        title: "Low-Level C",
        desc: "Understanding memory management, pointers, and manual resource allocation.",
      },
      {
        date: "Phase 2",
        title: "Object-Oriented C++",
        desc: "Leveraging STL containers, templates, and RAII principles.",
      },
      {
        date: "Phase 3",
        title: "System Proficiency",
        desc: "Writing Makefiles, debugging with GDB, and understanding OS syscalls.",
      },
    ],
    stack: ["C", "C++", "Make", "GDB", "Bash"],
    learning: ["Rust", "Embedded Systems", "OS Development"],
  },
  {
    id: "web3",
    name: "Web3 Support",
    role: "Smart Contracts & Integration",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Ethereum_logo_2014.svg",
    color: "#3C3C3D",
    type: "Web3",
    projects: [
      {
        title: "Decentralized App (DApp)",
        desc: "Web3 client interacting with smart contracts on the Ethereum testnet.",
        video: "https://media.giphy.com/media/QLxQ4F835g8t7B6W5L/giphy.gif",
        tech: ["Solidity", "Web3.js", "Metamask"],
      },
    ],
    journey: [
      {
        date: "2024",
        title: "Distributed Ledgers",
        desc: "Conceptual understanding of Blockchain, Consensus, and EVM.",
      },
      {
        date: "Early 2025",
        title: "Smart Contracts",
        desc: "Writing secure contracts in Solidity and testing with Hardhat/Ganache.",
      },
      {
        date: "Late 2025",
        title: "dApp Integration",
        desc: "Connecting frontends to blockchain using Ethers.js and Web3.js providers.",
      },
    ],
    stack: ["Solidity", "Web3.js", "Ethers.js", "Hardhat", "Ganache"],
    learning: ["Rust (Solana)", "ZK-Rollups", "DeFi Protocols"],
  },
  {
    id: "devops",
    name: "DevOps & Cloud",
    role: "Git, Linux, Docker, K8s",
    icon: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg",
    color: "#326CE5",
    type: "DevOps",
    projects: [
      {
        title: "High-Availability Clusters",
        desc: "Managed production-grade Kubernetes clusters with automated rollouts and rollbacks.",
        video: "https://media.giphy.com/media/l41lZxzROUeDcsO9q/giphy.gif",
        tech: ["Kubernetes", "Docker", "GitOps"],
      },
      {
        title: "Infrastructure as Code",
        desc: "Automated deployment pipelines and server configuration.",
        video: "https://media.giphy.com/media/l0HlOHDpYtKFBHwMg/giphy.gif",
        tech: ["Linux", "Bash", "GitHub Actions"],
      },
    ],
    journey: [
      {
        date: "August 2025",
        title: "Linux & Bash Foundations",
        desc: "Mastered the command line, file systems, permissions, and wrote automation scripts with Bash.",
      },
      {
        date: "October 2025",
        title: "Containerization with Docker",
        desc: "Learned to package applications, write optimized Dockerfiles, and manage container networking.",
      },
      {
        date: "December 2025",
        title: "CI/CD Pipelines",
        desc: "Implemented automated testing and deployment workflows using GitHub Actions and Jenkins.",
      },
      {
        date: "February 2026",
        title: "Kubernetes & Cloud",
        desc: "Orchestrating microservices with K8s and managing cloud infrastructure on AWS.",
      },
    ],
    stack: ["Docker", "Kubernetes", "AWS", "Linux", "Git", "GitHub Actions", "Shell Scripting", "Observability (Prometheus/Grafana)"],
    learning: ["Terraform", "Jenkins(CI&CD)", "Anisible", "ArgoCD",],
  },
];
