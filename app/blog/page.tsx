import { getCategorizedPostPreviews, PostPreviewData } from "@/lib/posts";
import { BlogPostEntry } from "@/app/blog/posts/components/blog-post-entry";

function renderPostCategory(posts: PostPreviewData[]) {
  return posts.map((props) => <BlogPostEntry {...props} />);
}

export default function Blog() {
  const allPostsData = getCategorizedPostPreviews();
  return (
    <main className="grid-cols-golden-inner">
      <section className="col-start-2 col-end-9">
        <h1 className="text-2xl leading-tight">LATEST & GREATEST</h1>
        {renderPostCategory(allPostsData.latest)}
      </section>
      <section className="pt-24">
        <h3>
          NEUROTAP &<br />
          PRODUCTIVITY
        </h3>
        {renderPostCategory(allPostsData.productivity)}
      </section>
      <section>
        <h3>
          SOFTWARE \\
          <br />
          CHANGELOGS
        </h3>
        {renderPostCategory(allPostsData.changelog)}
      </section>
    </main>
  );
}
