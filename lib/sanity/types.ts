export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

export type Profile = {
  name: string;
  role: string;
  summary?: string;
  photo?: SanityImage;
  resume?: {
    asset: {
      url: string;
    };
  };
};

export type Experience = {
  _id: string;
  company: string;
  logo?: SanityImage;
  role: string;
  startDate: string;
  endDate?: string;
  isCurrent?: boolean;
  location?: string;
  bullets?: string[];
  order?: number;
};

export type Education = {
  _id: string;
  school: string;
  logo?: SanityImage;
  degree: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  gpa?: string;
  description?: string;
  order?: number;
};

export type Project = {
  _id: string;
  title: string;
  slug: { current: string };
  thumbnail?: SanityImage;
  shortDescription?: string;
  fullDescription?: string;
  techStacks?: string[];
  githubUrl?: string;
  demoUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  order?: number;
};
