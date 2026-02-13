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
        date: "2020",
        title: "HTML5 & CSS3 Mastery",
        desc: "Mastered semantic HTML and responsive design principles.",
      },
      {
        date: "2021",
        title: "JavaScript & ES6+",
        desc: "Deep dive into JS core concepts, DOM manipulation, and modern syntax.",
      },
      {
        date: "2022+",
        title: "React & Modern UI",
        desc: "Building complex SPA applications with React, Context API, and animation libraries.",
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
        date: "2021",
        title: "Server-Side Logic",
        desc: "Understanding event loop, streams, and file I/O in Node.js.",
      },
      {
        date: "2022",
        title: "Database Design",
        desc: "Designing normalized schemas in PostgreSQL and flexible documents in MongoDB.",
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
        date: "Foundation",
        title: "C Language",
        desc: "Mastering pointers, memory allocation, and hardware interaction.",
      },
      {
        date: "Advanced",
        title: "Object-Oriented C++",
        desc: "Leveraging polymorphism, templates, and modern C++17/20 features.",
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
        date: "2023",
        title: "Blockchain Fundamentals",
        desc: "Understanding consensus mechanisms, gas, and transactions.",
      },
      {
        date: "Present",
        title: "Smart Contract Development",
        desc: "Writing and deploying secure contracts using Solidity.",
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
        date: "2021",
        title: "The Linux Terminal",
        desc: "Moving from GUI to CLI. Scripting automation with Bash.",
      },
      {
        date: "2022",
        title: "Containerization",
        desc: "Dockerizing applications and managing microservices.",
      },
      {
        date: "2023",
        title: "Orchestration",
        desc: "Scaling applications with Kubernetes and Helm charts.",
      },
    ],
    stack: ["Docker", "Kubernetes", "AWS", "Linux", "Git", "GitHub Actions", "Terraform"],
    learning: ["Service Mesh (Istio)", "Observability (Prometheus/Grafana)", "DevSecOps"],
  },
];
