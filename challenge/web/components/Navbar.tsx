import React from "react";
import Image from "next/image";
import Link from "next/link";
import ecorpLogo from "@/assets/svg/ecorp-logo.svg";

import { Line } from "@/components/decorations/line";

interface NavbarProps {}

export function Navbar(props: NavbarProps) {
  return (
    <nav className="relative col-start-2 col-end-15 grid grid-cols-[8rem_repeat(13,1fr)] content-end pb-2 text-xs">
      <Line o="bottom" />
      <ul className="col-start-2 flex flex-row gap-11">
        <li>
          <a href="/">HOME</a>
        </li>
        <li>
          <Link href={"/blog"}>BLOG</Link>
        </li>
      </ul>
      <Image className="absolute right-[36%] top-[32.4%] z-10" src={ecorpLogo} alt="E-corp logo" />
      <Line o="right" className="right-[38.2%]" />
      <ul className="col-span-5 col-start-10 flex flex-row justify-start gap-11 pl-4">
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
