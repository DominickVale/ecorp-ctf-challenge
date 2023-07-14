import "./globals.css";

import { siteConfig } from "@/config/site";
import Link from "next/link";

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  authors: [
    {
      name: "Dominick Vale",
      url: "https://domenicovale.netlify.app",
    },
  ],
  creator: "Dominick Vale",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",

    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen bg-background-light font-sans antialiased grid grid-cols-golden grid-rows-golden">
        <nav className="col-start-2 col-end-15 grid grid-cols-[repeat(13,1fr)] content-end border-b-1 border-b-gray-500 pb-2 text-xs">
          <ul className="col-start-2 flex flex-row gap-11">
            <li>
              <a href="/">HOME</a>
            </li>
            <li>
              <Link href={"/blog"}>BLOG</Link>
            </li>
          </ul>
          <ul className="flex flex-row col-start-9 pl-16 col-span-5 justify-start gap-11">
            <li>
              <a href="/contact-us">ABOUT</a>
            </li>
            <li>
              <a href="/contact-us">SHOP</a>
            </li>
            <li>
              <a href="/contact-us">CONTACTS</a>
            </li>
          </ul>
        </nav>
        <div className="col-start-2 col-end-[15] pt-24 row-auto">{children}</div>
      </body>
    </html>
  );
}
