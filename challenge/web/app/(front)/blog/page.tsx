import { getCategorizedPostPreviews, PostPreviewData } from "@/lib/posts";
import BlogScene from "@/components/3d/BlogScene";
import { Footer } from "@/components/Footer";
import { GoldenLayoutLines } from "@/components/golden-layout-lines";
import { H1 } from "@/components/typography";
import { BlogPostEntry } from "@/app/(front)/blog/posts/components/blog-post-entry";

function renderPostCategory(posts: PostPreviewData[], showPreview?: boolean) {
    return posts.map((props) => <BlogPostEntry {...props} showPreview={showPreview} />);
}

export default async function Blog() {
    const allPostsData = getCategorizedPostPreviews();
    return (
        <>
            <main className="relative flex min-h-screen grid-cols-2 grid-rows-[1fr_0.75fr_0.3fr] flex-col flex-wrap md:grid lg:grid-cols-golden lg:grid-rows-golden">
                <GoldenLayoutLines />
                <section className="col-span-2 px-4 pt-20 lg:col-span-1 lg:min-w-[20rem] xl:px-0">
                    <H1 className="mb-12 lg:ml-16 lg:text-[clamp(3rem,4.7vw,3.7rem)] xl:text-[clamp(4.1rem,6vw,6.7rem)]">
                        LATEST&nbsp;&
                        <br />
                        GREATEST
                    </H1>
                    {renderPostCategory(allPostsData.latest, true)}
                </section>
                <section className="row-start-2 mt-12 px-4 pt-12 md:mt-0 md:pt-28 lg:col-span-2 lg:col-start-2 lg:row-start-1 lg:px-12 xl:px-20">
                    <h3 className="mb-12 font-heading text-base font-bold tracking-wide text-background-dark">
                        NEUROTAP &<br />
                        PRODUCTIVITY
                    </h3>
                    {renderPostCategory(allPostsData.productivity)}
                </section>
                <section className="row-start-2 mx-1 mb-16 mt-3 bg-background-light px-4 pt-12 md:pt-28 lg:col-span-2 lg:col-start-2 lg:row-start-2 lg:mb-0 lg:px-12 lg:pt-0 xl:px-20">
                    <h3 className="mb-12 font-heading text-base font-bold tracking-wide text-background-dark">
                        SOFTWARE \\
                        <br />
                        CHANGELOGS
                    </h3>
                    {renderPostCategory(allPostsData.changelog)}
                </section>
            </main>
            <div className="row-start-3 relative">
                <Footer />
                <BlogScene />
            </div>
        </>
    );
}
