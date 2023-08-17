"use client";

import React, { ComponentProps } from "react";
import Image, { ImageProps } from "next/image";
import { MDXRemote } from "next-mdx-remote";

import { PostCategory, PostData, PostPreviewData } from "@/lib/posts";
import { BlogPostEntry } from "@/app/blog/posts/components/blog-post-entry";
import Date from "@/app/blog/posts/components/date";

// using any: because next/image has literally no compatible types with a normal image, even though the props are identical
const ResponsiveImage = (props: any) => (
    <Image
        src={props.src}
        alt={props.alt || "image"}
        width={804}
        height={0}
        className="rounded-2xl my-12"
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
    <main className="grid grid-cols-golden grid-rows-golden mb-40">
      <section className="mx-40">
        <div className="absolute left-1 top-1">
          <div className="text-gray-500 font-medium mb-5">
            <span className="py-1 pl-40 pr-8 bg-elements-light rounded-br-xl rounded-tr-md text-background-light uppercase text-xs font-bold">
              {author}
            </span>
            <div className="absolute top-[-2.1rem] left-2">
              <div className="absolute left-[-0.2rem] top-[0.618rem] w-[0.35rem] h-[0.35rem] bg-elements-light rounded-full"></div>
              <Date dateString={date} className="text-xs ml-4 text-background-dark" />
            </div>
            <span className="ml-6 text-xs">{translateCategory(category)}</span>
          </div>
        </div>

        <h1 className="text-lg font-heading mt-20 mb-6">{title}</h1>
        <div className="bg-gray-500 opacity-60 z-[-1] h-[1px] mb-6 w-1/2 relative ml-6" />
        {/* Post Content */}
        <MDXRemote
          components={{
            img: ResponsiveImage,
            h3: (p) => <h3 {...p} className="text-sm font-bold mt-6 mb-2" />,
            p: (p) => <p {...p} className="mb-2 text-sm" />,
          }}
          {...mdxSource}
        />
      </section>
      <section className="col-span-2 mx-20 mt-20 row-span-2 transition-opacity duration-200 opacity-50 hover:opacity-100">
        <h3 className="mb-12 text-background-dark text-lg font-bold font-heading tracking-wide">
          FURTHER \\
          <br />
          READINGS
        </h3>
        {renderFurtherReadings(furtherReadingsData, id)}
      </section>
    </main>
  );
}
