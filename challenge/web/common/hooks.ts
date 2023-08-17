import { usePathname } from "next/navigation";

const pages = ["home", "blog", "contact-us"] as const;
export type Page = (typeof pages)[number];

export function usePageFromPathname() {
  const path = usePathname();
  if (path) {
    if(path === "/") return "home"
    const splitPath = path.split("/");
    const page = splitPath.find((p) => pages.includes(p as Page));
    if (page) {
      return page as Page;
    }
  }
}
