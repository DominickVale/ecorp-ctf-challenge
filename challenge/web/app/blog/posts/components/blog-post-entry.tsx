import React from "react";
import Link from "next/link";

import { PostPreviewData } from "@/lib/posts";

import Date from "../components/date";

interface BlogPostEntryProps extends PostPreviewData {}

export function BlogPostEntry(props: BlogPostEntryProps) {
  const { id, title, date, author, preview, category } = props;
  return (
    <Link href={`blog/posts/${id}`}>
      <div className="p-2 max-w-xl border-gray-500 border-1 hover:opacity-90 cursor-pointer">
        <span>
          <small>
            <Date dateString={date} />
          </small>
          <small>{author}</small>
        </span>
        <h3>{title}</h3>
        {category === "latest" && <p>{preview}</p>}
      </div>
    </Link>
  );
}
