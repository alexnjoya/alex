// Generic API response type
export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  errors?: any[];
}

// Paginated response type
export interface PaginatedResponse<T = any> extends ApiResponse<T> {
  results: number;
  total: number;
}

// Contact message type
export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Project type
export interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: 'Web' | 'Blockchain' | 'Mobile' | 'Other' | 'AI/ML';
  githubLink?: string;
  liveLink?: string;
  featured?: boolean;
  complexity?: 'Expert' | 'Advanced' | 'Intermediate';
  duration?: string;
  team?: string;
  highlights?: string[];
}

// Custom request interface with user data
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Query parameters for projects
export interface ProjectQueryParams {
  category?: string;
  featured?: boolean;
  limit?: number;
  skip?: number;
}

// Environment variables
export interface EnvVariables {
  NODE_ENV: 'development' | 'production' | 'test';
  PORT: number;
  MONGODB_URI: string;
  EMAIL_SERVICE: string;
  EMAIL_USER: string;
  EMAIL_PASS: string;
  EMAIL_FROM: string;
  EMAIL_TO: string;
  JWT_SECRET?: string;
  JWT_EXPIRES_IN?: string;
}

// Skill type for skills section
export interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
  category: string;
  level: number; // 1-5
}

// Experience type
export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  type: 'Frontend' | 'Blockchain' | 'Startup' | 'Other';
  icon: React.ReactNode;
}