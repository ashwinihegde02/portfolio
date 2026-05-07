export interface Project {
  id: number
  title: string
  description: string[]
  image: string
  imageAlt: string
  liveUrl?: string
  githubUrl?: string
  tags: string[]
  gradient: string
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "Secure Enterprise Event Management",
    description: [
      "An enterprise-grade platform for managing large-scale organizational events and attendee check-ins.",
      "Built with a Go-based REST API backend and a React frontend to ensure high performance and security.",
      "Integrated a specialized kiosk mode for secure on-site registration and a Python-driven microservice for automated communication.",
      "Deployed with robust audit logging and JWT-based authentication for administrative oversight."
    ],
    image: "/images/event-management.png",
    imageAlt: "Enterprise platform preview",
    liveUrl: "",
    githubUrl: "https://github.com/2020-HelloWorld/pinakatech-event-management",
    tags: ["Go", "React", "Python", "JWT", "PostgreSQL"],
    gradient: "from-cyan-500 to-purple-500"
  },

  {
    id: 2,
    title: "Pinakatech Matrimony",
    description: [
      "Developed a comprehensive full-stack matrimony platform designed to facilitate secure and intuitive partner discovery.",
      "Engineered a scalable architecture to handle user profiling, advanced search filtering, and secure photo management.",
      "Focused on building a high-trust user environment by implementing robust verification workflows and privacy-centric data handling.",
      "Integrated modern frontend components with a reliable backend infrastructure to ensure a smooth, high-performance user experience across devices."
    ],
    image: "/images/matrimony-website.png",
    imageAlt: "Pinakatech Matrimony platform preview",
    liveUrl: "",
    githubUrl: "https://github.com/2020-HelloWorld/pinakatech-matrimony",
    tags: ["Full-Stack", "React", "Node.js", "Database Design", "User Authentication"],
    gradient: "from-rose-500 to-orange-500"
  },

  {
    id: 3,
    title: "Knowledge Graph Augmentation using GANs",
    description: [
      "Published IEEE research focused on 'Completing the Puzzle' by resolving data sparsity in incomplete Knowledge Graphs.",
      "Developed a hybrid framework utilizing Generative Adversarial Networks (GANs) and Graph Convolutional Networks (GCNs) to generate synthetic nodes.",
      "Achieved superior accuracy in link prediction and entity resolution compared to traditional RotatE and TransE embedding models.",
      "Evaluated performance using Mean Reciprocal Rank (MRR) and Gini Index to ensure high-fidelity data distribution and structural integrity."
    ],
    image: "/images/knowledge-graph-research.png",
    imageAlt: "Knowledge Graph Augmentation Research Architecture",
    liveUrl: "https://ieeexplore.ieee.org/document/10910552",
    githubUrl: "https://github.com/ashwinihegde02/dkg-rag",
    tags: ["Python", "PyTorch", "Machine Learning", "GANs", "GCN", "IEEE Research"],
    gradient: "from-violet-600 to-indigo-600"
  },
];
