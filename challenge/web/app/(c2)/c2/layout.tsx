import "@/app/globals.css";

import { Chakra_Petch } from "next/font/google";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const fontSans = Chakra_Petch({
  subsets: ["latin"],
  variable: "--font-chakra",
  weight: ["300", "400", "500", "600", "700"],
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../../../assets/fonts/nulshock.woff2",
  variable: "--font-heading",
});

export const metadata = {
  title: {
    default: "Neuroc C2C",
    template: `%s | Neuroc C2C`,
  },
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",

    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          "relative mx-auto min-h-screen max-w-[160rem] bg-background-dark font-sans antialiased text-background-light",
          fontSans.variable,
          fontHeading.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
