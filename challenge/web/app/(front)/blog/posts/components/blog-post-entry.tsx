import React from "react";
import Link from "next/link";

import { PostPreviewData } from "@/lib/posts";
import { H3 } from "@/components/typography";

import Date from "./date";


interface BlogPostEntryProps extends PostPreviewData {
  showPreview?: boolean;
}

export function BlogPostEntry(props: BlogPostEntryProps) {
  const { id, data, showPreview } = props;
  const { title, date, author, preview, previewImg, category } = data;

  return (
    <Link href={`blog/posts/${id}`}>
      {showPreview ? (
        <div className="group relative p-2 hover:opacity-90 cursor-pointer flex flex-col py-8 overflow-hidden">
          {previewImg && (
            <img
              src={previewImg}
              alt={title}
              className="absolute left-0 top-0 w-full h-full object-cover object-[left_30%] opacity-0 group-hover:opacity-20 transition-opacity duration-700 z-[-1]"
            />
          )}
          <span className="xl:ml-20 relative flex justify-between max-w-xs border-b-1 border-background-dark px-4 mb-6">
            <div className="absolute left-[-0.2rem] bottom-[-0.2rem] w-[0.35rem] h-[0.35rem] bg-background-dark rounded-full"></div>
            <small className="font-xs text-neutral-500">
              <Date dateString={date} />
            </small>
            <small className="font-xs text-neutral-500">{author}</small>
          </span>
          <H3 className="xl:mx-20 ">
            {title}
          </H3>
          {showPreview && <p className="xl:mx-20 max-w-[100%] xl:max-w-3xl">{preview}</p>}
        </div>
      ) : (
        <div className="p-2 flex flex-col max-w-xl hover:opacity-90 cursor-pointer 2xl:grid grid-cols-[0.168fr_1fr]">
          <span className="flex gap-4 xl:gap-0 mb-2 xl:mb-0 xl:flex-col justify-center min-w-max w-32">
            <small className="font-xs text-neutral-500">
              <Date dateString={date} />
            </small>
            <small className="font-xs text-neutral-500">{author}</small>
          </span>
          <h3 className="text-sm uppercase">{title}</h3>
        </div>
      )}
    </Link>
  );
}
