import type { Post } from "@/types";

import {
  Education,
  Header,
  Projects,
  SectionErrorBoundary,
  SectionSkeleton,
  Skills,
  Summary,
  WorkExperience,
} from "@/components/resume";
import { Layout } from "@/components/screens/posts";
import { RESUME_DATA } from "@/data/resume-data";
import { getPosts } from "@/lib/mdx";
import { OpenGraph } from "@/lib/og";

import { notFound } from "next/navigation";
import { Suspense } from "react";

const route = "resume";

const Posts = getPosts(route);

interface PageProps {
  params: Post;
}

export async function generateStaticParams() {
  return Posts.map((post) => ({
    slug: `${post.slug}`,
  }));
}

export function generateMetadata({ params }: PageProps) {
  const post = Posts.find(
    (post: { slug: string }) => post.slug === params.slug,
  );
  const title = post ? post.title : "";
  const image = `${process.env.NEXT_PUBLIC_SITE_URL}api/og?title=${encodeURIComponent(title)}`;

  return {
    ...OpenGraph,
    title,
    openGraph: {
      title,
      images: [image],
    },
    twitter: {
      images: [image],
    },
  };
}

export default function Page({ params }: PageProps) {
  const post = Posts.find(
    (post: { slug: string }) => post.slug === params.slug,
  );

  if (!post) {
    notFound();
  }

  return (
    <>
      <Layout post={post} route={route} className="hidden" />
      <main
        className="container relative mx-auto scroll-my-12 overflow-auto print:p-11"
        id="main-content"
      >
        <section
          className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-4"
          aria-label="Resume Content"
        >
          <SectionErrorBoundary sectionName="Header">
            <Suspense fallback={<SectionSkeleton lines={4} />}>
              <Header />
            </Suspense>
          </SectionErrorBoundary>

          <div className="space-y-8 print:space-y-4">
            <SectionErrorBoundary sectionName="Summary">
              <Suspense fallback={<SectionSkeleton lines={2} />}>
                <Summary summary={RESUME_DATA.summary} />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Work Experience">
              <Suspense fallback={<SectionSkeleton lines={6} />}>
                <WorkExperience work={RESUME_DATA.work} />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Education">
              <Suspense fallback={<SectionSkeleton lines={3} />}>
                <Education education={RESUME_DATA.education} />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Skills">
              <Suspense fallback={<SectionSkeleton lines={2} />}>
                <Skills skills={RESUME_DATA.skills} />
              </Suspense>
            </SectionErrorBoundary>

            <SectionErrorBoundary sectionName="Projects">
              <Suspense fallback={<SectionSkeleton lines={5} />}>
                <Projects projects={RESUME_DATA.projects} />
              </Suspense>
            </SectionErrorBoundary>
          </div>
        </section>
      </main>
    </>
  );
}
