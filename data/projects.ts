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
    title: "NetSpect - AI-Powered Covert Timing Channel Detection",
    description: [
      "Developed an AI-based system to detect and disrupt covert timing channels that bypass traditional firewalls.",
      "Solves the risk of illegal data exfiltration in high-security sectors like Defense and Research by monitoring hidden communication.",
      "Implemented a two-layered approach: Layer 1 for protocol header normalization (TTL/TCP Timestamps) and Layer 2 for IAT-based detection using Machine Learning.",
      "Uniquely combines Linux Kernel Modules for real-time prevention with a Decision Tree model for traffic classification."
    ],
    image: "/images/netspect.png",
    imageAlt: "NetSpect network security project preview",
    liveUrl: "",
    githubUrl: "https://github.com/2020-HelloWorld/NetSpect",
    tags: ["C", "Python", "Linux Kernel", "Machine Learning", "Netfilter"],
    gradient: "from-emerald-500 to-cyan-500"
  },

  {
    id: 2,
    title: "Secure Enterprise Event Management",
    description: [
      "An enterprise-grade platform for managing large-scale organizational events and attendee check-ins.",
      "Built with a Go-based REST API backend and a React frontend to ensure high performance and security.",
      "Integrated a specialized kiosk mode for secure on-site registration and a Python-driven microservice for automated communication.",
      "Deployed with robust audit logging and JWT-based authentication for administrative oversight."
    ],
    image: "/images/attendence.png",
    imageAlt: "Enterprise platform preview",
    liveUrl: "",
    githubUrl: "https://github.com/2020-HelloWorld/pinakatech-event-management",
    tags: ["Go", "React", "Python", "JWT", "PostgreSQL"],
    gradient: "from-cyan-500 to-purple-500"
  },

  {
    id: 3,
    title: "Yoga-Studio DApp - Blockchain Appointment System",
    description: [
      "A decentralized application built to automate yoga studio bookings and payments using the Ethereum network.",
      "Experimented with Solidity to create immutable smart contracts for managing appointment slots and peer-to-peer financial transactions.",
      "Features a full-stack architecture with a Node.js/Express backend and EJS-based frontend dashboard.",
      "Enhanced skills in Web3 integration and containerized deployment using Docker and Kubernetes."
    ],
    image: "/images/dapp.png",
    imageAlt: "Yoga Studio DApp blockchain project preview",
    liveUrl: "",
    githubUrl: "https://github.com/Ghanashyam-Bhat/yoga-studio-dapp",
    tags: ["Solidity", "Ethereum", "Node.js", "Docker", "Web3.js"],
    gradient: "from-pink-500 to-rose-500"
  }
];
