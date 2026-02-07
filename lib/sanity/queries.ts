import { groq } from "next-sanity";

export const profileQuery = groq`
  *[_type == "profile"][0] {
    name,
    role,
    summary,
    photo
  }
`;
