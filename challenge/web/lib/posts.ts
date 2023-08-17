import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from 'next-mdx-remote/serialize'
import {MDXRemoteSerializeResult} from "next-mdx-remote";


const postsDirectory = path.join(process.cwd(), 'posts')

export type PostCategory = 'latest' | 'productivity' | 'changelog'
export type PostData = {
    id: string
    mdxSource: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
    // frontmatter
    data: {
        date: string
        title: string
        author: string
        category: PostCategory
        preview: string
        previewImg: string
    }
}

export type PostPreviewData = Omit<PostData, 'mdxSource'>

export function getSortedPostPreviews(): PostPreviewData[]{
    const fileNames = fs.readdirSync(postsDirectory)

    const allPostsData = fileNames.map((filename) => {
        // Regex expression to match .md and .mdx files
        const id = filename.replace(/\.(md|mdx)$/, '')
        const fullPath = path.join(postsDirectory, filename)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)

        return {
            id,
            data: matterResult.data as PostData['data']
        }
    })

    return allPostsData.sort((a, b) => {
        if (a.data.date < b.data.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getCategorizedPostPreviews() {
    const postsData = getSortedPostPreviews()
    return postsData.reduce((acc, post) => {
        const category = post.data.category
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
    const { data, content} = matter(fileContents)
    const mdxSource = await serialize(content)

    return {
        id,
        mdxSource,
        data,
    } as PostData
}
