import React from "react";
import Link from "next/link";

import { PostPreviewData } from "@/lib/posts";

import Date from "../components/date";

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
          <span className="ml-20 relative flex justify-between max-w-xs border-b-1 border-background-dark px-4 mb-6">
            <div className="absolute left-[-0.2rem] bottom-[-0.2rem] w-[0.35rem] h-[0.35rem] bg-background-dark rounded-full"></div>
            <small className="font-xs">
              <Date dateString={date} />
            </small>
            <small className="font-xs">{author}</small>
          </span>
          <h2 className="ml-20 font-heading text-base font-bold uppercase mb-4 text-background-light bg-background-dark mr-auto px-4 rounded-lg">
            {title}
          </h2>
          {showPreview && <p className="ml-20 max-w-3xl">{preview}</p>}
        </div>
      ) : (
        <div className="p-2 max-w-xl hover:opacity-90 cursor-pointer grid grid-cols-[0.168fr_1fr]">
          <span className="flex flex-col justify-center min-w-max w-32">
            <small className="font-xs">
              <Date dateString={date} />
            </small>
            <small className="font-xs">{author}</small>
          </span>
          <h3 className="text-sm font-bold uppercase">{title}</h3>
        </div>
      )}
    </Link>
  );
}
