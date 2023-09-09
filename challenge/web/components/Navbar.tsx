"use client";

import React, { AnchorHTMLAttributes, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ecorpLogo from "@/assets/svg/ecorp-logo.svg";
import { usePageFromPathname } from "@/common/hooks";
import gsap from "gsap";
import { first } from "rxjs";

import { cn } from "@/lib/utils";
import { Line } from "@/components/decorations/line";
import MobileMenu from "@/components/MobileMenu";

interface NavbarProps {}

const HamSvg = () => (
  <svg width="41" height="14" viewBox="0 0 41 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.38477 12H38.3848" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
    <path d="M38.7695 2L1.99998 2" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const NavLink = (props: React.ComponentProps<typeof Link>) => (
  <li>
    <Link className="inline-block px-[.8vw] pb-1" {...props} />
  </li>
);

export function Navbar(props: NavbarProps) {
  const page = usePageFromPathname();
  const [showMenu, setShowMenu] = useState(false);
  const comp = useRef<HTMLDivElement>(null);
  const underline = useRef<HTMLDivElement>(null);
  const leftNav = useRef(null);

  useLayoutEffect(() => {}, [page]);

  useLayoutEffect(() => {
      // position the underline under the active link element
      let activeLink;
      if (page === "blog-post") {
        activeLink = comp.current?.querySelector(`a[href="/blog"]`);
      } else {
        activeLink = comp.current?.querySelector(`a[href="${window.location.pathname}"]`);
      }

      if (activeLink) {
        // animate with gsap
        gsap.to(underline.current, {
          duration: 0.5,
          ease: "power2.out",
          x: (activeLink as HTMLAnchorElement).offsetLeft,
          width: activeLink.clientWidth,
        });
      }
  }, [page]);

  function closeMenu() {
    setShowMenu(false);
  }

  return (
    <nav
      ref={comp}
      className={cn(
        "relative z-20 col-start-2 col-end-15 mx-4 grid-cols-[8rem_repeat(13,1fr)] content-end text-xs md:mx-0 md:mt-0 md:grid md:pb-2",
        page === "home" ? "mt-[15vh]" : "mt-[5vh]"
      )}
    >
      <div
        ref={underline}
        className="absolute bottom-1 left-0 h-1 w-10 rounded-full bg-background-dark"
      />

      {showMenu && <MobileMenu onPressLink={closeMenu} onPressClose={closeMenu} />}
      <div
        className="hamburger-menu fixed right-8 top-8 md:hidden"
        onClick={() => setShowMenu(true)}
      >
        <HamSvg />
      </div>
      <div className="absolute left-0 top-0 z-[-1] flex h-full w-full items-center justify-center opacity-20 md:hidden">
        <Line o="bottom" isBg={false} />
      </div>
      <ul
        ref={leftNav}
        className={cn(
          "hidden flex-row font-medium md:flex lg:gap-4",
          page === "blog-post" ? "col-span-3 col-start-6 mr-14 justify-end" : "col-start-2"
        )}
      >
        <NavLink href="/">HOME</NavLink>
        <NavLink href="/blog">BLOG</NavLink>
      </ul>
      <div className="top-[1.25rem] z-20 mx-auto flex items-center justify-center md:absolute md:right-[calc(38.2%-2.4rem)]">
        <Link href="/">
          <Image src={ecorpLogo} alt="E-corp logo" />
        </Link>
      </div>
      <Line o="right" className="right-[38.2%] hidden md:inline-block" />
      <ul className="col-span-5 col-start-9 hidden flex-row justify-start gap-[2vw] pl-8 font-medium md:flex lg:col-start-10 lg:gap-11 lg:pl-4">
        <NavLink href="/">ABOUT</NavLink>
        <NavLink href="/#">SHOP</NavLink>
        <NavLink href="/contact-us">CONTACTS</NavLink>
      </ul>
    </nav>
  );
}
