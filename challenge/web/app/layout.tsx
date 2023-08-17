import "./globals.css";

import { Chakra_Petch } from "next/font/google";
import localFont from "next/font/local";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Line } from "@/components/decorations/line";
import { Footer } from "@/components/Footer";
import { LayoutLines } from "@/components/layout-lines";
import { Navbar } from "@/components/Navbar";

const fontSans = Chakra_Petch({
  subsets: ["latin"],
  variable: "--font-chakra",
  weight: ["300", "400", "500", "600", "700"],
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/nulshock.woff2",
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
          "relative min-h-screen bg-background-light font-sans antialiased grid grid-cols-layout grid-rows-layout max-w-[160rem] outline outline-1 outline-gray-400 mx-auto",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        <section className="fixed left-0 top-14 h-screen w-20">
          <div className="relative h-[calc(100vh-57px)] overflow-hidden">
            <span className="absolute py-8 bottom-0 left-7 flex flex-col justify-around h-full">
              <p className="h-max rotate-marquee">
                ⋅&nbsp;&nbsp;14/02/2030 -30% DISCOUNT FOR KIDS UNDER 16
              </p>
              <p className="h-max rotate-marquee">
                ⋅&nbsp;&nbsp;CHECK OUT THE NEW NEUROTAP T-SHIRTS ON OUR SHOP
              </p>
            </span>
          </div>
        </section>
        <Navbar />
        <div className="col-start-1 col-end-1 row-start-1 row-end-1 relative">
          <Line o="bottom" />
          <Line o="right" />
        </div>
        <div className="col-start-1 col-span-1 row-start-2 row-span-full relative">
          <Line o="right" />
        </div>

        <div className="relative col-start-2 col-end-[15]">
          {children}
        </div>

        <div className="col-start-[15] col-span-1 row-start-1 row-end-1 relative flex justify-center place-items-center">
          <Line o="bottom" />
          <small className="text-stone-500 text-xs font-medium">420.666</small>
          <Line o="left" />
        </div>
        <div className="col-start-[15] col-span-1 row-start-2 row-span-full relative">
          <Line o="left" />
        </div>
        <div className="col-start-2 col-end-15 grid grid-cols-[repeat(13,1fr)] content-center border-t-1 border-t-gray-500 text-xs">
          <p className="col-start-2 col-span-2 flex flex-row gap-11">
            © 2030 Neurotap. All rights reserved.
          </p>
          <p className="col-start-9 pl-16 col-span-5 justify-start gap-11">
            By{" "}
            <a
              href="https://domenicovale.netlify.app"
              className="font-bold cursor-pointer"
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
