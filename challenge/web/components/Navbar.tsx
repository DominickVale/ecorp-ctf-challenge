"use client";

import React, {useState} from "react";
import Image from "next/image";
import Link from "next/link";
import ecorpLogo from "@/assets/svg/ecorp-logo.svg";
import { usePageFromPathname } from "@/common/hooks";

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

export function Navbar(props: NavbarProps) {
  const page = usePageFromPathname();
  const [showMenu, setShowMenu] = useState(false);

  function closeMenu() {
    setShowMenu(false)
  }

  return (
    <nav
      className={cn(
        "relative z-20 col-start-2 col-end-15 mx-4 grid-cols-[8rem_repeat(13,1fr)] content-end text-xs md:mx-0 md:mt-0 md:grid md:pb-2",
        page === "home" ? "mt-[15vh]" : "mt-[5vh]"
      )}
    >
      {showMenu && <MobileMenu onPressLink={closeMenu} onPressClose={closeMenu} />}
      <div
          className="hamburger-menu fixed right-8 top-8 md:hidden"
          onClick={() => setShowMenu(true)}
      >
        <HamSvg />
      </div>
      <Line o="bottom" className="hidden md:block" />
      <div className="absolute left-0 top-0 z-[-1] flex h-full w-full items-center justify-center opacity-20 md:hidden">
        <Line o="bottom" className="" isBg={false} />
      </div>
      <ul
        className={cn(
          "hidden flex-row gap-[2vw] md:flex lg:gap-11",
          page === "blog-post" ? "col-span-3 col-start-6 mr-14 justify-end" : "col-start-2"
        )}
      >
        <li>
          <a href="/">HOME</a>
        </li>
        <li>
          <Link href={"/blog"}>BLOG</Link>
        </li>
      </ul>
      <div className="top-[1.25rem] z-20 mx-auto flex items-center justify-center md:absolute md:right-[calc(38.2%-2.4rem)]">
        <Link href="/">
          <Image src={ecorpLogo} alt="E-corp logo" />
        </Link>
      </div>
      <Line o="right" className="right-[38.2%] hidden md:block " />
      <ul className="col-span-5 col-start-9 hidden flex-row justify-start gap-[2vw] pl-8 md:flex lg:col-start-10 lg:gap-11 lg:pl-4">
        <li>
          <Link href="/">ABOUT</Link>
        </li>
        <li>
          <Link href="/#">SHOP</Link>
        </li>
        <li>
          <Link href={"/contact-us"}>CONTACTS</Link>
        </li>
      </ul>
    </nav>
  );
}
