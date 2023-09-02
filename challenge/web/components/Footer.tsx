import React from "react";
import Image from "next/image";
import brainProto from "@/assets/images/brain-proto.jpg";
import decorativeFooter from "@/assets/svg/decorative-footer-1.svg";

import Button from "@/components/buttons/button";
import { LayoutLines } from "@/components/layout-lines";
import {H2} from "@/components/typography";

interface FooterProps {}

export const FooterLinks = () => (
    <section>
      <div className="text-zinc-400 flex gap-4 flex-row flex-wrap justify-between text-xs">
        <ul className="min-w-max leading-6 lg:leading-normal">
          <li>
            <b className="text-background-light mr-2">Email:</b>info@neurotap.com
          </li>
          <li>
            <b className="text-background-light mr-2">Phone:</b>+1 (123) 456-7890
          </li>
          <li>123 Futuristic Street, New York</li>
        </ul>
        <ul className="min-w-max leading-6 lg:leading-normal">
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
        <ul className="min-w-max leading-6 lg:leading-normal">
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
)

export function Footer(props: FooterProps) {
  return (
    <footer className="my-12 lg:my-0 h-max relative lg:grid grid-cols-golden grid-rows-golden lg:border-t-1 border-elements-light items-end min-h-screen justify-end place-content-end">
      <LayoutLines />
      <div className="relative bg-background-dark h-max md:px-16 lg:min-h-[80vh] rounded-[3.168rem] lg:rounded-[5%] pt-40 px-4 lg:px-12 2xl:px-32 pb-20 flex flex-col row-span-2 justify-between">
        <section className="mb-16 lg:mb-12 ">
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
          <H2>
            JOIN THE
            <br />
            R_EVOLUTION
          </H2>
          <p className="text-zinc-400 mt-10 text-sm font-normal tracking-wide">
            420.666 humans have already evolved.
            <br />
            Be the next.
          </p>
          <div className="w-full lg:w-96 flex flex-col place-items-center">
            <Button theme="light" className="mt-16 hidden lg:block">
              ORDER NOW
            </Button>
            <Button theme="light" size="fluid" className="mt-16 h-20 lg:hidden">
              ORDER NOW
            </Button>
            <small className="mt-4 text-zinc-400">
              Lorem ipsum dolor sit amet consectetur. Tellus metus duis.
            </small>
          </div>
        </section>
        <FooterLinks />
      </div>
      <Image
        className="hidden lg:block absolute mix-blend-darken scale-[0.8] right-[-8%] top-12"
        src={brainProto}
        alt="brain-proto"
      />
    </footer>
  );
}
