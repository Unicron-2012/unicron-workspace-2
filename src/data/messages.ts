export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const mockMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content:
      "Welcome to Unicron Workspace. How can I help you today?",
    timestamp: "10:40 AM",
  },
  {
    id: "2",
    role: "user",
    content:
       "Create a complete CI/CD pipeline for a microservices application using Jenkins, Docker, Kubernetes, and AWS EKS.",
    timestamp: "10:41 AM",
  },
  {
    id: "3",
    role: "assistant",
    content:
     "I'll design the pipeline architecture, configure Jenkins stages, containerize services with Docker, deploy to AWS EKS using Kubernetes manifests, integrate security scanning with Trivy, and set up monitoring with Prometheus and Grafana.",
    timestamp: "10:41 AM",
  },
];
