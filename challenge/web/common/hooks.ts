import { usePathname } from "next/navigation";

const pages = ["home", "blog", "contact-us", "blog-post"] as const;
export type Page = (typeof pages)[number];

export function usePageFromPathname() {
  const path = usePathname();
  if (path) {
    if(path === "/") return "home"
    const splitPath = path.split("/");
    if(splitPath.includes("posts")) return "blog-post"
    const page = splitPath.find((p) => pages.includes(p as Page));
    if (page) {
      return page as Page;
    }
  }
}
