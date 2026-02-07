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
