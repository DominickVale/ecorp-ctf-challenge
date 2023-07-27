import { getCategorizedPostPreviews, getPostData, PostData, PostPreviewData } from "@/lib/posts";
import { BlogPostEntry } from "@/app/blog/posts/components/blog-post-entry";
import Date from "@/app/blog/posts/components/date";

type Params = {
  id: string;
};

type Props = {
  params: Params;
};

export async function generateMetadata({ params }: Props) {
  const postData: PostData = await getPostData(params.id);

  return {
    title: postData.title,
  };
}

function renderFurtherReadings(data: { [key: string]: PostPreviewData[] }, currPostId: string) {
  const flattened = Object.values(data).reduce((acc, val) => acc.concat(val), []);
  const filtered = flattened.filter((post) => post.id !== currPostId);
  return filtered.map((props) => <BlogPostEntry {...props} />);
}

export default async function Post({ params }: Props) {
  const { title, date, author, contentHtml, id }: PostData = await getPostData(params.id);
  const allPostsData = getCategorizedPostPreviews();

  return (
    <>
      <main>
        <h1 className="text-2xl mb-1">{title}</h1>

        <div className="text-gray-500 font-medium mb-5">
          <Date dateString={date} />
        </div>
        <small>{author}</small>

        {/* Post Content */}
        <div className="text-gray-600" dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </main>
      <section>
        <h3>
          FURTHER \\
          <br />
          READINGS
        </h3>
        {renderFurtherReadings(allPostsData, id)}
      </section>
    </>
  );
}
