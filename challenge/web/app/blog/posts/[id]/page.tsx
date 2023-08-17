import React from "react";

import { getCategorizedPostPreviews, getPostData, PostData } from "@/lib/posts";
import PostLayout from "@/app/blog/posts/components/post-layout";

export async function generateMetadata({ params }: Props) {
  const postData: PostData = await getPostData(params.id);

  return {
    title: postData.data.title,
  };
}

type Props = {
  params: {
    id: string;
  };
};
export default async function Post({ params }: Props) {
  const postData: PostData = await getPostData(params.id);
  const furtherReadingsData = getCategorizedPostPreviews();

  return <PostLayout furtherReadingsData={furtherReadingsData} {...postData} />;
}
