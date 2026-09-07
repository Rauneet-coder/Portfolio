export const personalInfo = {
  name: "Rauneet Singh",
  title: "Backend & DevOps Engineer",
  tagline: "Building resilient REST APIs, containerized architectures, and open-source infrastructure.",
  email: "rauneetsingh1903@gmail.com",
  github: "https://github.com/Rauneet-coder",
  linkedin: "https://linkedin.com/in/rauneet-singh-85369428b",
  location: "Durgapur, West Bengal, India",
  status: "Open to Internships, Platform Engineering & OSS Programs (GSoC, LFX, Outreachy)",
  summary: "Backend and DevOps-focused Computer Science undergraduate with proven experience building production-ready REST APIs, authentication systems, and containerized applications. Merged a contribution into Jenkins Core — an open-source CI/CD platform used by millions of developers worldwide. Proficient in Node.js, Express.js, Docker, Kubernetes, GitHub Actions, and Linux environments.",
  education: {
    degree: "B.Tech, Computer Science and Engineering",
    institution: "Bengal College of Engineering and Technology (BCET), Durgapur",
    affiliate: "MAKAUT, West Bengal",
    period: "Aug 2024 – Jul 2028",
    status: "2nd Year"
  }
};

export const skillsData = {
  languages: [
    { name: "JavaScript", level: "Proficient", icon: "js" },
    { name: "Bash / Shell", level: "Advanced", icon: "bash" },
    { name: "Python", level: "Basic / Scripting", icon: "python" }
  ],
  backend: [
    { name: "Node.js", level: "Production", icon: "node" },
    { name: "Express.js", level: "Production", icon: "express" },
    { name: "REST APIs", level: "Advanced", icon: "api" },
    { name: "JWT Auth", level: "Production", icon: "jwt" },
    { name: "bcrypt", level: "Production", icon: "security" },
    { name: "Zod Validation", level: "Production", icon: "zod" },
    { name: "MVC Architecture", level: "Advanced", icon: "mvc" }
  ],
  databases: [
    { name: "MongoDB", level: "Production (Mongoose)", icon: "mongodb" },
    { name: "PostgreSQL", level: "Advanced", icon: "postgres" },
    { name: "Prisma ORM", level: "Proficient", icon: "prisma" }
  ],
  devops: [
    { name: "Docker", level: "Production", icon: "docker" },
    { name: "Kubernetes", level: "Cluster Ops", icon: "k8s" },
    { name: "Jenkins", level: "Core Contributor", icon: "jenkins" },
    { name: "GitHub Actions", level: "CI/CD Automation", icon: "actions" },
    { name: "Linux Administration", level: "Advanced", icon: "linux" },
    { name: "Shell Scripting", level: "Automation", icon: "terminal" },
    { name: "AWS", level: "Actively Learning", icon: "aws" }
  ],
  tools: [
    { name: "Git", level: "Advanced", icon: "git" },
    { name: "GitHub", level: "Collaborative / OSS", icon: "github" },
    { name: "Postman", level: "API Testing", icon: "postman" },
    { name: "cURL", level: "CLI Testing", icon: "curl" }
  ]
};

export const techData = [
  {
    id: "jenkins-oss",
    name: "Jenkins Core",
    role: "Open Source Contributor",
    category: "Open Source",
    color: "#D33833",
    badge: "MERGED PR #26966",
    prUrl: "https://github.com/jenkinsci/jenkins/pull/26966",
    repo: "jenkinsci/jenkins",
    summary: "Merged contribution into Jenkins Core, an open-source CI/CD platform powering millions of enterprise pipelines globally.",
    projects: [
      {
        title: "Jenkins Core Event Handling Fix (PR #26966)",
        desc: "Identified and resolved a cross-browser event handling bug caused by deprecated window.event reliance, eliminating a silent failure path in production pipelines.",
        repoUrl: "https://github.com/jenkinsci/jenkins/pull/26966",
        tech: ["Jenkins Core", "Java", "JavaScript", "CI/CD Pipelines", "Git"],
        deepDive: {
          challenge: "Deprecated window.event caused silent failures in non-Chromium modern browsers during pipeline interactions.",
          solution: "Refactored legacy event listeners to pass standard event objects directly, maintaining full backward compatibility.",
          impact: "Passed full Jenkins automated CI validation matrix end-to-end and successfully merged into Jenkins Core master branch."
        }
      }
    ],
    journey: [
      {
        date: "Discovery",
        title: "Issue Root Cause Identification",
        desc: "Isolated silent browser event failure path while analyzing Jenkins core UI interaction scripts."
      },
      {
        date: "Implementation",
        title: "Event Delegation Refactor",
        desc: "Modernized event lifecycle handling and ensured zero regressions across legacy browser suites."
      },
      {
        date: "Code Review",
        title: "Maintainer Iteration",
        desc: "Engaged in collaborative technical code reviews with Jenkins core maintainers, incorporating suggestions."
      },
      {
        date: "Production Merge",
        title: "Master Pipeline Green",
        desc: "All automated Jenkins CI matrix test suites passed and PR #26966 was merged into master branch."
      }
    ],
    stack: ["Jenkins", "Java", "JavaScript", "Maven", "CI/CD", "Git", "GitHub"],
    learning: ["Jenkins Plugin Architecture", "Groovy Shared Libraries", "Distributed Agents"]
  },
  {
    id: "backend-auth",
    name: "Auth Microservice",
    role: "Production Auth & RBAC",
    category: "Backend Engineering",
    color: "#10B981",
    badge: "JWT + BCRYPT + ZOD",
    summary: "Production-ready authentication backend featuring JWT login, bcrypt hashing, rate limiting, and role-based access control.",
    projects: [
      {
        title: "Production Authentication System Backend",
        desc: "Hardened REST API authentication service with rate limiting, Zod schema validation, and granular RBAC protection.",
        tech: ["Node.js", "Express.js", "MongoDB", "JWT", "bcrypt", "Zod"],
        deepDive: {
          challenge: "Defending authentication endpoints from distributed brute-force attacks and malformed payload injection.",
          solution: "Implemented Express rate-limiting middleware, strict Zod request schema validation, and bcrypt salt rounds (10+).",
          impact: "Achieved sub-20ms auth validation latency with zero unhandled injection vectors."
        }
      }
    ],
    journey: [
      {
        date: "Phase 1",
        title: "Security Architecture Design",
        desc: "Structured stateless JWT session workflow with token expiry and secret rotation patterns."
      },
      {
        date: "Phase 2",
        title: "Zod Schema Enforcement",
        desc: "Built comprehensive validation middleware validating request headers, query params, and JSON bodies."
      },
      {
        date: "Phase 3",
        title: "Brute-force & Rate Limiting",
        desc: "Integrated express-rate-limit and account lockout policies to thwart credential stuffing attacks."
      }
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "bcrypt", "Zod", "Postman"],
    learning: ["OAuth 2.0 / OIDC", "Redis Session Caching", "Refresh Token Rotation"]
  },
  {
    id: "backend-course",
    name: "Course Platform API",
    role: "Scalable MVC Backend",
    category: "Backend Engineering",
    color: "#6366F1",
    badge: "MULTI-ROLE MVC",
    summary: "Multi-role course management and content delivery API with role-gated endpoints, session management, and CRUD architecture.",
    projects: [
      {
        title: "Course Selling Platform Backend",
        desc: "Scalable RESTful API serving course management, student enrollments, instructor dashboards, and media metadata.",
        tech: ["Node.js", "Express.js", "MongoDB", "Mongoose", "MVC"],
        deepDive: {
          challenge: "Enforcing strict authorization boundaries between student purchasers, instructors, and super-admins.",
          solution: "Architected role-based middleware guards that verify resource ownership before invoking controller handlers.",
          impact: "Zero cross-tenant data leakage with structured, decoupled controller-service-repository layers."
        }
      }
    ],
    journey: [
      {
        date: "Architecture",
        title: "MVC & Clean Folder Structure",
        desc: "Separated routes, controllers, services, models, and middlewares for high maintainability."
      },
      {
        date: "Data Modeling",
        title: "Mongoose Schema Normalization",
        desc: "Designed optimized MongoDB schemas with indexes for high-volume course queries and enrollments."
      },
      {
        date: "Role Protection",
        title: "Admin & User Guard Middlewares",
        desc: "Developed composable middlewares for role verification and safe error propagation."
      }
    ],
    stack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "REST APIs", "MVC Pattern"],
    learning: ["Stripe / Payment Gateway Integration", "GraphQL Query Federation", "PostgreSQL Migration"]
  },
  {
    id: "devops-cloud",
    name: "DevOps & Cloud",
    role: "Containerization & CI/CD",
    category: "DevOps & Platform",
    color: "#0EA5E9",
    badge: "DOCKER + K8S + GITHUB ACTIONS",
    summary: "Production containerization, automated GitHub Actions CI/CD workflows, Linux systems automation, and Kubernetes orchestration.",
    projects: [
      {
        title: "Containerized Microservice Pipeline",
        desc: "Multi-stage Docker builds coupled with automated GitHub Actions pipelines for automated linting, testing, and deployment.",
        tech: ["Docker", "Kubernetes", "GitHub Actions", "Linux", "Bash"],
        deepDive: {
          challenge: "Slow pipeline build times and bloated Docker production images causing deployment latency.",
          solution: "Crafted multi-stage Dockerfiles leveraging Alpine bases and build caching layers, reducing image footprint by 65%.",
          impact: "Cut CI/CD pipeline execution duration from 8 minutes down to under 2.5 minutes."
        }
      }
    ],
    journey: [
      {
        date: "Foundation",
        title: "Linux & Bash Automation",
        desc: "Mastered Linux environment administration, file permissions, daemon management, and cron automation."
      },
      {
        date: "Containers",
        title: "Docker Multi-Stage Engineering",
        desc: "Optimized Docker images, container networking, volumes, and multi-service docker-compose setups."
      },
      {
        date: "Orchestration",
        title: "Kubernetes & CI/CD",
        desc: "Configured Pods, Deployments, Services, and automated GitHub Actions workflows for continuous delivery."
      }
    ],
    stack: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Linux", "Bash", "AWS (learning)"],
    learning: ["Terraform (IaC)", "Helm Charts", "Prometheus & Grafana Observability", "ArgoCD"]
  }
];

// Interactive API Explorer Endpoints for Live In-Browser Testing
export const apiExplorerEndpoints = [
  {
    id: "auth-login",
    method: "POST",
    path: "/api/v1/auth/login",
    title: "Authenticate User & Issue JWT",
    desc: "Validates email and password via Zod schema, checks bcrypt hash, and issues a signed JWT bearer token.",
    defaultPayload: JSON.stringify({
      email: "engineer@enterprise.com",
      password: "SuperSecretPassword123!"
    }, null, 2),
    mockResponse: {
      status: 200,
      statusText: "OK",
      latencyMs: 38,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "x-ratelimit-limit": "100",
        "x-ratelimit-remaining": "98",
        "x-response-time": "38.2ms"
      },
      body: {
        success: true,
        message: "Authentication successful",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl85OTMyMSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTczODg5NjAwMCwiZXhwIjoxNzM4OTgyNDAwfQ.sK89x_mockSignatureValid",
        user: {
          id: "usr_99321",
          email: "engineer@enterprise.com",
          role: "admin"
        }
      }
    }
  },
  {
    id: "courses-list",
    method: "GET",
    path: "/api/v1/courses?category=devops&limit=3",
    title: "Fetch Published Courses",
    desc: "Retrieves course documents from MongoDB with role verification and projection indexing.",
    defaultPayload: "",
    mockResponse: {
      status: 200,
      statusText: "OK",
      latencyMs: 24,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "x-cache": "HIT",
        "x-response-time": "24.1ms"
      },
      body: {
        success: true,
        count: 2,
        data: [
          {
            _id: "crs_60d5ec49f1b2c",
            title: "Production Docker & Kubernetes Mastery",
            instructor: "Rauneet Singh",
            price: 49.99,
            published: true,
            enrollments: 412
          },
          {
            _id: "crs_78f1ab33e9d40",
            title: "Hardened Node.js & Express REST APIs",
            instructor: "Rauneet Singh",
            price: 59.99,
            published: true,
            enrollments: 689
          }
        ]
      }
    }
  },
  {
    id: "jenkins-pr",
    method: "GET",
    path: "/api/v1/oss/jenkins-pr/26966",
    title: "Jenkins Core PR #26966 Telemetry",
    desc: "Fetches live status and verification telemetry for Rauneet's Jenkins Core open-source merge.",
    defaultPayload: "",
    mockResponse: {
      status: 200,
      statusText: "OK",
      latencyMs: 42,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "x-oss-status": "MERGED"
      },
      body: {
        repository: "jenkinsci/jenkins",
        pullRequestNumber: 26966,
        contributor: "Rauneet-coder (Rauneet Singh)",
        state: "MERGED",
        title: "Resolve deprecated window.event cross-browser event handling bug",
        ciStatus: "ALL_CHECKS_PASSED",
        impact: "Eliminated silent execution drop across millions of Jenkins CI/CD controller pipelines"
      }
    }
  },
  {
    id: "system-health",
    method: "GET",
    path: "/api/v1/health",
    title: "System Health & Cluster Metrics",
    desc: "Returns Node.js process runtime uptime, memory footprint, and database cluster connectivity.",
    defaultPayload: "",
    mockResponse: {
      status: 200,
      statusText: "OK",
      latencyMs: 8,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "x-cluster-health": "OPTIMAL"
      },
      body: {
        status: "healthy",
        uptimeSeconds: 948201,
        services: {
          mongoDatabase: "CONNECTED",
          postgresDatabase: "CONNECTED",
          redisCluster: "CONNECTED",
          apiGateway: "HEALTHY"
        },
        memoryUsageMb: {
          heapUsed: 42.8,
          heapTotal: 64.2,
          rss: 98.4
        }
      }
    }
  }
];

// Interactive CI/CD Pipeline Simulator Stages
export const cicdPipelineStages = [
  {
    id: "lint",
    name: "ESLint & Prettier",
    duration: "1.2s",
    status: "passed",
    command: "npm run lint",
    logs: [
      "checking codebase formatting...",
      "validating AST syntax trees...",
      "✔ 0 errors, 0 warnings found across 48 modules."
    ]
  },
  {
    id: "test",
    name: "Unit & Security Tests",
    duration: "3.4s",
    status: "passed",
    command: "npm test -- --coverage",
    logs: [
      "PASS src/tests/auth.test.js",
      "  ✔ POST /api/v1/auth/login with valid creds returns 200 + JWT (18ms)",
      "  ✔ POST /api/v1/auth/login with invalid creds returns 401 (14ms)",
      "  ✔ Rate limiter halts exceeding requests at 100/min (9ms)",
      "PASS src/tests/zod-validation.test.js",
      "  ✔ Rejects malformed email and weak password formats (6ms)",
      "Test Suites: 2 passed, 2 total | Tests: 18 passed"
    ]
  },
  {
    id: "build",
    name: "Multi-Stage Docker Build",
    duration: "5.1s",
    status: "passed",
    command: "docker build -t rauneet/api-service:v2.4 .",
    logs: [
      "Step 1/8 : FROM node:20-alpine AS builder",
      "Step 2/8 : WORKDIR /app",
      "Step 3/8 : COPY package*.json ./ && RUN npm ci --omit=dev",
      "Step 4/8 : FROM node:20-alpine AS runner",
      "Step 5/8 : COPY --from=builder /app/node_modules ./node_modules",
      "Step 6/8 : USER node",
      "Step 7/8 : EXPOSE 5000",
      "Step 8/8 : CMD [\"node\", \"server.js\"]",
      "Successfully tagged rauneet/api-service:v2.4 [Image size: 84.3 MB]"
    ]
  },
  {
    id: "scan",
    name: "Trivy Vulnerability Scan",
    duration: "2.1s",
    status: "passed",
    command: "trivy image rauneet/api-service:v2.4",
    logs: [
      "Scanning target image OS packages and dependencies...",
      "Total: 0 (UNKNOWN: 0, LOW: 0, MEDIUM: 0, HIGH: 0, CRITICAL: 0)",
      "✔ Security Gate Passed: Zero High/Critical CVEs."
    ]
  },
  {
    id: "deploy",
    name: "Kubernetes Rolling Deployment",
    duration: "4.0s",
    status: "passed",
    command: "kubectl apply -f k8s/ && kubectl rollout status deploy/api-service",
    logs: [
      "deployment.apps/api-service configured",
      "Waiting for deployment spec update to be observed...",
      "Waiting for 3 pods to be ready...",
      "Pod 1/3 (api-service-7f98c8-b2x9) -> Ready",
      "Pod 2/3 (api-service-7f98c8-k5m1) -> Ready",
      "Pod 3/3 (api-service-7f98c8-q8w4) -> Ready",
      "deployment \"api-service\" successfully rolled out."
    ]
  }
];
