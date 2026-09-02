export interface Profile {
  name: string;
  title: string;
  image: string;
  bannerImage?: string;
  about: string;
  skills: string[];
  languages: Language[];
  education: Education;
  social: {
    linkedin: string;
    github: string;
    email: string;
  };
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Language {
  name: string;
  level: string;
  flag: string;
  progress: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  date?: string;
  image: string;
  href?: string;
  tags?: string[];
  repoUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  icon: string;
  company?: string;
  period?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer?: string;
  icon?: string;
  date?: string;
  description?: string;
}
