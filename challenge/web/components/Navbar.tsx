"use client";

import React, { AnchorHTMLAttributes, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ecorpLogo from "@/assets/svg/ecorp-logo.svg";
import { usePageFromPathname } from "@/common/hooks";
import gsap from "gsap";

import { cn } from "@/lib/utils";
import { Line } from "@/components/decorations/line";
import MobileMenu from "@/components/MobileMenu";

interface NavbarProps {}

const NavLink = (props: React.ComponentProps<typeof Link>) => (
  <li>
    <Link className="inline-block px-[.8vw] pb-1" {...props} />
  </li>
);

export function Navbar(props: NavbarProps) {
  const page = usePageFromPathname();
  const comp = useRef<HTMLDivElement>(null);
  const underline = useRef<HTMLDivElement>(null);
  const leftNav = useRef(null);

  useLayoutEffect(() => {
      // position the underline under the active link element
      let activeLink;
      if (page === "blog-post") {
        activeLink = comp.current?.querySelector(`ul.desktop a[href="/blog"]`);
      } else {
        activeLink = comp.current?.querySelector(`ul.desktop a[href="${window.location.pathname}"]`);
      }

      if (activeLink) {
        gsap.to(underline.current, {
          duration: 0.5,
          ease: "power2.out",
          x: (activeLink as HTMLAnchorElement).offsetLeft,
          width: activeLink.clientWidth,
        });
      }
  }, [page])

  return (
    <nav ref={comp}
      className={cn(
        "relative z-20 col-start-2 col-end-15 mx-4 grid-cols-[8rem_repeat(13,1fr)] content-end text-xs md:mx-0 md:mt-0 md:grid md:pb-1",
        page === "home" ? "pt-[6.2vh]" : "pt-[5vh]"
      )}
    >
      <div
        ref={underline}
        className="absolute bottom-[1px] left-0 h-[2px] w-10 rounded-full bg-background-dark"
      />
      <MobileMenu />
      <div className="absolute left-0 top-0 z-[-1] flex h-full w-full items-center justify-center opacity-80 md:hidden">
        <Line o="bottom" isBg={false} />
      </div>
      <ul
        ref={leftNav}
        className={cn(
          "desktop hidden flex-row font-medium md:flex lg:gap-4",
          page === "blog-post" ? "col-span-3 col-start-6 mr-14 justify-end" : "col-start-2"
        )}
      >
        <NavLink href="/">HOME</NavLink>
        <NavLink href="/blog">BLOG</NavLink>
      </ul>
      <div className="relative top-[-1.57rem] lg:top-[1.2rem] z-20 mx-auto flex items-center justify-center md:absolute md:right-[calc(38.2%-2.35rem)]">
        <Link href="/">
          <Image src={ecorpLogo} alt="E-corp logo" />
        </Link>
      </div>
      <Line o="right" className="right-[38.15%] hidden md:inline-block" />
      <ul className="desktop col-span-5 col-start-9 hidden flex-row justify-start gap-[2vw] pl-8 font-medium md:flex lg:col-start-10 lg:gap-11 lg:pl-4">
        <NavLink href="/">ABOUT</NavLink>
        <NavLink href="/#">SHOP</NavLink>
        <NavLink href="/contact-us">CONTACTS</NavLink>
      </ul>
    </nav>
  );
}
