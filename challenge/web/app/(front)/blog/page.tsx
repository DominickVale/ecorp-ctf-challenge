import { getCategorizedPostPreviews, PostPreviewData } from "@/lib/posts";
import { Footer } from "@/components/Footer";
import { LayoutLines } from "@/components/layout-lines";
import { BlogPostEntry } from "@/app/(front)/blog/posts/components/blog-post-entry";

function renderPostCategory(posts: PostPreviewData[], showPreview?: boolean) {
  return posts.map((props) => <BlogPostEntry {...props} showPreview={showPreview} />);
}

export default async function Blog() {
  const allPostsData = getCategorizedPostPreviews();
  return (
    <>
      <main className="relative grid h-screen grid-cols-golden grid-rows-golden">
        <LayoutLines />
        <section className="pt-20">
          <h1 className="mb-28 pl-20 font-heading text-2xl leading-[1.18] tracking-display text-black 3xl:text-[clamp(6.854rem,6vw,11.09rem)]">
            LATEST & GREATEST
          </h1>
          {renderPostCategory(allPostsData.latest, true)}
        </section>
        <section className="col-span-2 col-start-2 px-20 pt-28">
          <h3 className="tracking-wide mb-12 font-heading text-base font-bold text-background-dark">
            NEUROTAP &<br />
            PRODUCTIVITY
          </h3>
          {renderPostCategory(allPostsData.productivity)}
        </section>
        <section className="col-span-2 col-start-2 row-start-2 mx-1 mt-3 bg-background-light px-20 pt-12">
          <h3 className="tracking-wide mb-12 font-heading text-base font-bold text-background-dark">
            SOFTWARE \\
            <br />
            CHANGELOGS
          </h3>
          {renderPostCategory(allPostsData.changelog)}
        </section>
      </main>
      <Footer />
    </>
  );
}
