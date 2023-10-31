"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import decorativeFooter from "@/assets/svg/decorative-footer-1.svg";
import { Canvas } from "@react-three/fiber";

import Button from "@/components/buttons/button";
import { GoldenLayoutLines } from "@/components/golden-layout-lines";
import { H2 } from "@/components/typography";

import Earth from "./3d/Earth";
import GlobeNetwork from "./3d/GlobeNetwork";

interface FooterProps {}

export const FooterLinks = () => (
    <section>
        <div className="flex flex-row flex-wrap justify-between gap-4 text-xs text-stone-400">
            <ul className="flex min-w-max flex-col gap-2 leading-6 lg:leading-normal">
                <li>
                    <b className="mr-2 text-background-light">Email:</b>info@neurotap.com
                </li>
                <li>
                    <b className="mr-2 text-background-light">Phone:</b>+1 (123) 456-7890
                </li>
                <li>123 Futuristic Street, New York</li>
            </ul>
            <ul className="flex min-w-max flex-col gap-2 leading-6 lg:leading-normal">
                <li>
                    <a href="#">Terms & Conditions</a>
                </li>
                <li>
                    <a href="#">Privacy Policy</a>
                </li>
                <li>
                    <a href="#">Security</a>
                </li>
            </ul>
            <ul className="flex min-w-max flex-col gap-2 leading-6 lg:leading-normal">
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
);

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>((props, ref) => {
    return (
        <footer
            className="relative my-12 mb-6 h-max grid-cols-golden grid-rows-golden place-content-end items-end justify-end border-elements-lightest lg:my-0 lg:grid lg:min-h-screen lg:border-t-1"
            ref={ref}
        >
            <GoldenLayoutLines forceShowAll />
            <div className="relative row-span-2 flex h-max flex-col justify-between rounded-[3.168rem] bg-background-dark px-4 pb-20 pt-40 md:px-16 lg:min-h-[80vh] lg:rounded-[5%] lg:px-12 2xl:px-28">
                <div
                    id="footerGlobe"
                    className="pointer-events-none absolute right-[10%] top-[16%] z-10 h-[16rem] w-[16rem] opacity-30 lg:opacity-100"
                >
                    <Canvas
                        camera={{
                            fov: 60,
                            position: [0, 0, 25],
                        }}
                    >
                        <Suspense fallback={null}>
                            <GlobeNetwork position={[0.35, 0, 0]} />
                            <Earth position={[0.35, 0, 0]} />
                        </Suspense>
                    </Canvas>
                </div>
                <section className="z-30 mb-16 lg:mb-12">
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
                    <p className="mt-10 text-sm font-normal tracking-wide text-stone-400">
                        420.666 humans have already evolved.
                        <br />
                        Be the next.
                    </p>
                    <div className="flex w-full flex-col place-items-center lg:w-96">
                        <Button theme="light" className="mt-16 hidden lg:block">
                            ORDER NOW
                        </Button>
                        <Button theme="light" size="fluid" className="mt-16 h-20 lg:hidden">
                            ORDER NOW
                        </Button>
                        <small className="mt-4 text-stone-400">
                            Ordering indicates acceptance of Neurotap's T&Cs
                        </small>
                    </div>
                </section>
                <FooterLinks />
            </div>
        </footer>
    );
});
