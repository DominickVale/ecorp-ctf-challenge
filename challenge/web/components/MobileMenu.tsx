import React from "react";
import Image from "next/image";
import Link from "next/link";

import { H1 } from "@/components/typography";

interface MobileMenuProps {
  onPressClose: () => void;
  onPressLink: () => void;
}

const MobileMenu = (props: MobileMenuProps) => {
  return (
    <div className="fixed left-0 top-0 z-20 flex h-[84vh] w-full flex-col justify-between rounded-b-3xl bg-background-dark font-medium text-background-light">
      <div className="">
        <div className="flex items-center justify-between p-6">
          <h5>@ E-corp</h5>
          <button onClick={props.onPressClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ul className="space-y-3 px-6 mt-12">
          <li>
            <Link href="/" onClick={props.onPressLink}>
              <H1 className="text-background-light">Home</H1>
            </Link>
          </li>
          <li>
            <Link href="/blog" onClick={props.onPressLink}>
              <H1 className="text-background-light">Blog</H1>
            </Link>
          </li>
          <li>
            <Link href="/shop" onClick={props.onPressLink}>
              <H1 className="text-background-light">Shop</H1>
            </Link>
          </li>
          <li>
            <Link href="/contact-us" onClick={props.onPressLink}>
              <H1 className="text-background-light">Contact us </H1>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center justify-between p-8">
        <p>English</p>
        <p>GBP</p>
      </div>
    </div>
  );
};

export default MobileMenu;
