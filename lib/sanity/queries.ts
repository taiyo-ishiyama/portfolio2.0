import { groq } from "next-sanity";

export const profileQuery = groq`
  *[_type == "profile"][0] {
    name,
    role,
    summary,
    photo
  }
`;

export const experienceQuery = groq`
  *[_type == "experience"] | order(order asc, startDate desc) {
    _id,
    company,
    logo,
    role,
    startDate,
    endDate,
    isCurrent,
    location,
    bullets
  }
`;

export const educationQuery = groq`
  *[_type == "education"] | order(order asc, endDate desc) {
    _id,
    school,
    logo,
    degree,
    startDate,
    endDate,
    location,
    gpa,
    description
  }
`;
