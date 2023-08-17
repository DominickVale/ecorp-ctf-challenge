import React from "react";
import Image from "next/image";
import brainProto from "@/assets/images/brain-proto.jpg";
import decorativeFooter from "@/assets/svg/decorative-footer-1.svg";

import Button from "@/components/buttons/button";
import { LayoutLines } from "@/components/layout-lines";

interface FooterProps {}

export function Footer(props: FooterProps) {
  return (
    <footer className="relative grid grid-cols-golden grid-rows-golden border-t-1 border-elements-light items-end h-screen justify-end place-content-end">
      <LayoutLines />
      <div className="relative bg-background-dark h-[80vh] rounded-[5%] pt-40 px-32 pb-20 flex flex-col row-span-2 justify-between">
        <section>
          <Image
            className="absolute left-14 top-14"
            src={decorativeFooter}
            alt="decorative element"
          />
          <Image
            className="absolute right-14 top-14"
            src={decorativeFooter}
            alt="decorative element"
          />
          <h2 className="text-background-light text-xl font-heading tracking-display leading-[1.18]">
            JOIN THE
            <br />
            R_EVOLUTION
          </h2>
          <p className="text-zinc-400 mt-10 text-sm font-normal tracking-wide">
            420.666 humans have already evolved.
            <br />
            Be the next.
          </p>
          <div className="w-96 flex flex-col place-items-center">
            <Button theme="light" className="mt-16">
              ORDER NOW
            </Button>
            <small className="mt-4 text-zinc-400">
              Lorem ipsum dolor sit amet consectetur. Tellus metus duis.
            </small>
          </div>
        </section>
        <section>
          <div className="text-zinc-400 flex flex-row justify-between">
            <ul>
              <li>
                <b className="text-background-light mr-2">Email:</b>info@neurotap.com
              </li>
              <li>
                <b className="text-background-light mr-2">Phone:</b>+1 (123) 456-7890
              </li>
              <li>123 Futuristic Street, New York</li>
            </ul>
            <ul>
              <li>
                <a href="#">Terms & Conditions</a>
              </li>
              <li>
                <a href="#">Privacy Polici</a>
              </li>
              <li>
                <a href="#">Security</a>
              </li>
            </ul>
            <ul>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Refund policy</a>
              </li>
              <li>
                <a href="#">Help Center</a>
              </li>
            </ul>
          </div>
        </section>
      </div>
      <Image
        className="mix-blend-darken scale-[0.8] absolute right-[-8%] top-12"
        src={brainProto}
        alt="brain-proto"
      />
    </footer>
  );
}
