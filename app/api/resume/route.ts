import { NextResponse } from "next/server";
import { sanityClient } from "@/lib/sanity/client";
import { groq } from "next-sanity";

const resumeUrlQuery = groq`
  *[_type == "profile"][0].resume.asset->url
`;

export async function GET() {
  const resumeUrl = await sanityClient.fetch<string | null>(resumeUrlQuery);

  if (!resumeUrl) {
    return new NextResponse("Resume not found", { status: 404 });
  }

  // Fetch the PDF from Sanity and proxy it
  const response = await fetch(resumeUrl);

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to fetch resume from storage" },
      { status: response.status }
    );
  }

  const pdfBuffer = await response.arrayBuffer();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=resume.pdf",
    },
  });
}
