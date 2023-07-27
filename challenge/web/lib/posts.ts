import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";


const postsDirectory = path.join(process.cwd(), 'posts')

export type PostData = {
    id: string
    date: string
    title: string
    author: string
    category: "latest" | "productivity" | "changelog"
    contentHtml: string
}

export type PostPreviewData = Omit<PostData, 'contentHtml'> & { preview: string}

export function getSortedPostPreviews() {
    const fileNames = fs.readdirSync(postsDirectory)

    const allPostsData = fileNames.map((filename) => {
        // Regex expression to match .md and .mdx files
        const id = filename.replace(/\.(md|mdx)$/, '')
        const fullPath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data
        } as PostPreviewData
    })

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getCategorizedPostPreviews() {
    const postsData = getSortedPostPreviews()
    return postsData.reduce((acc, post) => {
        const category = post.category
        if (acc[category]) {
            acc[category].push(post)
        } else {
            acc[category] = [post]
        }
        return acc
    }, {} as {
        latest: PostPreviewData[]
        productivity: PostPreviewData[]
        changelog: PostPreviewData[]
    })
}

export async function getPostData(id: string) {
    const mdFullPath = path.join(postsDirectory, `${id}.md`)
    const mdxFullPath = path.join(postsDirectory, `${id}.mdx`)

    // Check if .md or .mdx file exists
    const fullPath = fs.existsSync(mdFullPath) ? mdFullPath : mdxFullPath

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()
    return {
        id,
        contentHtml,
        ...matterResult.data,
    } as PostData
}
