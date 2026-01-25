export interface Profile {
  name: string;
  title: string;
  image: string;
  about: string;
  skills: string[];
  languages: Language[];
  social: {
    linkedin: string;
    github: string;
  };
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
  image: string;
  href?: string;
  tags?: string[];
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
  issuer: string;
  icon: string;
  date?: string;
}
