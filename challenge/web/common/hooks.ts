import { usePathname } from "next/navigation";
import { createContext, useContext } from "react";

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

export const GlobalContext = createContext<{ isLoaded: boolean }>({ isLoaded: false });
GlobalContext.displayName = "GlobalContext";

export function useIsLoaded() {
  const { isLoaded } = useContext(GlobalContext);

  return isLoaded;
}
