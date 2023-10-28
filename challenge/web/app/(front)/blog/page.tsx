import { getCategorizedPostPreviews, PostPreviewData } from "@/lib/posts";
import { Footer } from "@/components/Footer";
import { GoldenLayoutLines } from "@/components/golden-layout-lines";
import { BlogPostEntry } from "@/app/(front)/blog/posts/components/blog-post-entry";
import {H1} from "@/components/typography";
import BlogScene from "@/components/3d/BlogScene";

function renderPostCategory(posts: PostPreviewData[], showPreview?: boolean) {
  return posts.map((props) => <BlogPostEntry {...props} showPreview={showPreview} />);
}

export default async function Blog() {
  const allPostsData = getCategorizedPostPreviews();
  return (
    <>
      <main className="relative flex flex-wrap flex-col md:grid grid-cols-2 grid-rows-[1fr_0.75fr_0.3fr] min-h-screen lg:grid-cols-golden lg:grid-rows-golden">
        <GoldenLayoutLines />
        <section className="lg:min-w-[20rem] col-span-2 lg:col-span-1 px-4 xl:px-0 pt-20">
          <H1 className="mb-12 lg:ml-16 lg:text-[clamp(3rem,4.7vw,3.7rem)] xl:text-[clamp(4.1rem,6vw,6.7rem)]">
            LATEST&nbsp;&<br/>GREATEST
          </H1>
          {renderPostCategory(allPostsData.latest, true)}
        </section>
        <section className="mt-12 md:mt-0 row-start-2 lg:row-start-1 lg:col-span-2 lg:col-start-2 px-4 lg:px-12 xl:px-20 pt-12 md:pt-28">
          <h3 className="tracking-wide mb-12 font-heading text-base font-bold text-background-dark">
            NEUROTAP &<br />
            PRODUCTIVITY
          </h3>
          {renderPostCategory(allPostsData.productivity)}
        </section>
        <section className="row-start-2 mb-16 lg:mb-0 lg:col-span-2 lg:col-start-2 lg:row-start-2 mx-1 mt-3 bg-background-light px-4 lg:px-12 xl:px-20 pt-12 md:pt-28 lg:pt-0">
          <h3 className="tracking-wide mb-12 font-heading text-base font-bold text-background-dark">
            SOFTWARE \\
            <br />
            CHANGELOGS
          </h3>
          {renderPostCategory(allPostsData.changelog)}
        </section>
      </main>
      <div className="row-start-3">
        <Footer />
      </div>
      <BlogScene/>
    </>
  );
}
