export interface Project {
  projectTitle: string;
  projectDescription: string;
  startDate: string;
  endDate: string;
  frontEndTechStack: string;
  backendTechStack: string;
  database: string;
  status: 'planned' | 'in-progress' | 'completed'; // Assuming these are the possible statuses
}

