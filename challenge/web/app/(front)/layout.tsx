import "../globals.css";

import { Chakra_Petch } from "next/font/google";
import localFont from "next/font/local";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { OuterLayoutLines } from "@/components/outer-layout-lines";
import SmoothScroll from "@/components/SmoothScroll";

const fontSans = Chakra_Petch({
  subsets: ["latin"],
  variable: "--font-chakra",
  weight: ["300", "400", "500", "600", "700"],
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../../assets/fonts/nulshock.woff2",
  variable: "--font-heading",
});

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
        <body
          className={cn(
            "relative mx-auto min-h-screen max-w-[160rem] grid-cols-layout grid-rows-layout bg-background-light font-sans antialiased md:grid md:px-0",
            fontSans.variable,
            fontHeading.variable
          )}
        >
        <SmoothScroll />
          <section className="absolute left-0 top-0 hidden h-full w-20 md:block">
            <div className="sticky top-0 h-[calc(100vh-57px)] overflow-hidden">
              <span className="flex h-full flex-col place-items-center justify-around py-8 pt-16 text-[1.2vh] taller:text-xs taller:2xl:text-smaller">
                <p className="rotate-marquee h-max tracking-display">
                  ⋅&nbsp;&nbsp;14/02/2030 -30% DISCOUNT FOR KIDS UNDER 16
                </p>
                <p className="rotate-marquee h-max tracking-display">
                  ⋅&nbsp;&nbsp;CHECK OUT THE NEW NEUROTAP T-SHIRTS ON OUR SHOP
                </p>
              </span>
            </div>
          </section>
          <Navbar />
          <OuterLayoutLines />
          <div className="relative col-start-2 col-end-[15]">{children}</div>

          <div className="relative col-span-1 col-start-[15] row-start-1 row-end-1 hidden place-items-center justify-center md:flex">
            <small className="text-xs font-medium text-stone-500">420.666</small>
          </div>
          <div className="col-start-2 col-end-15 mb-12 flex grid-cols-[repeat(13,1fr)] flex-col content-center items-center justify-center border-t-gray-500 text-xs md:mb-0 md:grid md:border-t-1">
            <p className="col-span-2 col-start-2 flex min-w-max flex-row gap-11">
              © 2030 Neurotap. All rights reserved.
            </p>
            <p className="col-span-5 col-start-9 justify-start gap-11 md:pl-16">
              By{" "}
              <a
                href="https://domenicovale.netlify.app"
                className="cursor-pointer font-bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dominick Vale
              </a>{" "}
              — have fun :)
            </p>
          </div>
        </body>
    </html>
  );
}
