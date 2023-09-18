"use client";

import React, { ComponentProps } from "react";
import Image, { ImageProps } from "next/image";
import { MDXRemote } from "next-mdx-remote";

import { PostCategory, PostData, PostPreviewData } from "@/lib/posts";
import { Line } from "@/components/decorations/line";
import { Footer } from "@/components/Footer";
import { GoldenLayoutLines } from "@/components/golden-layout-lines";
import { H1 } from "@/components/typography";
import { BlogPostEntry } from "@/app/(front)/blog/posts/components/blog-post-entry";
import Date from "@/app/(front)/blog/posts/components/date";

// using any: because next/image has literally no compatible types with a normal image, even though the props are identical
const ResponsiveImage = (props: any) => (
  <Image
    src={props.src}
    alt={props.alt || "image"}
    width={804}
    height={0}
    className="my-12 rounded-2xl"
  />
);

type FurtherReadingsData = { [key: string]: PostPreviewData[] };

type Props = {
  furtherReadingsData: FurtherReadingsData;
} & PostData;

function renderFurtherReadings(data: FurtherReadingsData, currPostId: string) {
  const flattened = Object.values(data).reduce((acc, val) => acc.concat(val), []);
  const filtered = flattened.filter((post) => post.id !== currPostId);
  return filtered.map((props) => <BlogPostEntry {...props} showPreview={false} />);
}

function translateCategory(category: PostCategory) {
  switch (category) {
    case "changelog":
      return "SOFTWARE CHANGELOGS";
    case "productivity":
      return "NEUROTAP & PRODUCTIVITY";
    default:
      return "LATEST & GREATEST";
  }
}

export default function PostLayout(props: Props) {
  const { id, furtherReadingsData, data, mdxSource } = props;
  const { title, date, author, category } = data;

  return (
    <>
      <main className="relative mt-[-2.4rem] pt-8 md:mt-0 md:pt-0 grid-cols-golden grid-rows-golden bg-white lg:grid">
        <GoldenLayoutLines className="z-10" />
        <section className="px-4 lg:ml-12 xl:mx-12 2xl:mx-40 row-span-3 pb-40">
          <div className="absolute left-1 top-16 md:top-8 lg:top-2">
            <div className="mb-5 font-medium text-gray-500">
              <span className="rounded-br-xl rounded-tr-md bg-elements-light py-1 pl-20 pr-8 text-xs font-bold uppercase text-background-light lg:pl-40">
                {author}
              </span>
              <div className="absolute left-2 top-[-1.5rem] lg:top-[-2.1rem]">
                <div className="absolute left-[-0.2rem]  top-[0.618rem] hidden h-[0.35rem] w-[0.35rem] rounded-full bg-elements-light"></div>
                <Date dateString={date} className="ml-4 text-xs text-background-dark" />
              </div>
              <span className="ml-6 text-xs">{translateCategory(category)}</span>
            </div>
          </div>
          <H1 smaller className="mb-6 mt-24 inline-block lg:block">
            {title}
          </H1>
          <div className="relative z-[-1] mb-6 ml-6 h-[1px] w-1/2 bg-gray-500 opacity-60" />
          {/* Post Content */}
          <MDXRemote
            components={{
              img: ResponsiveImage,
              h3: (p) => <h3 {...p} className="mb-2 mt-6 text-sm 2xl:text-lg 2xl:mt-12 font-bold" />,
              p: (p) => <p {...p} className="mb-2 text-sm 2xl:text-md 3xl:text-base text-stone-700" />,
            }}
            {...mdxSource}
          />
        </section>
        <section className="col-span-2 col-start-2 row-span-3 row-start-1 bg-background-light px-4 pt-28 lg:opacity-50 transition-opacity duration-200 hover:opacity-100 lg:px-20">
          <h3 className="mb-12 font-heading text-base font-bold tracking-wide text-background-dark lg:text-lg">
            FURTHER&nbsp;\\
            <br />
            READINGS
          </h3>
          {renderFurtherReadings(furtherReadingsData, id)}
        </section>
      </main>
      <Footer />
    </>
  );
}
