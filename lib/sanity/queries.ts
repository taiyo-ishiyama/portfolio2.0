import { groq } from "next-sanity";

export const profileQuery = groq`
  *[_type == "profile"][0] {
    name,
    role,
    summary,
    photo,
    "resume": { "asset": resume.asset->{ url } }
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

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(order asc) {
    _id,
    title,
    slug,
    thumbnail,
    shortDescription,
    techStacks,
    githubUrl,
    demoUrl,
    liveUrl
  }
`;

export const allProjectsQuery = groq`
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    thumbnail,
    shortDescription,
    techStacks,
    githubUrl,
    demoUrl,
    liveUrl,
    featured
  }
`;
