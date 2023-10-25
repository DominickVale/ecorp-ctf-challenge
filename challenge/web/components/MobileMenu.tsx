"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

import { cn } from "@/lib/utils";
import { H1 } from "@/components/typography";

interface MobileMenuProps {}

const HamSvg = () => (
    <svg width="41" height="14" viewBox="0 0 41 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.38477 12H38.3848" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
        <path d="M38.7695 2L1.99998 2" stroke="#262626" strokeWidth="3" strokeLinecap="round" />
    </svg>
);

const MobileMenu = (props: MobileMenuProps) => {
    const [shown, setShown] = useState(false);
    const comp = useRef(null);
    const [ctx, setCtx] = useState(gsap.context(() => {}, comp));

    useLayoutEffect(() => {
        gsap.set(comp.current, { height: "0", pointerEvents: "none" });
        gsap.set(ctx.selector?.('[data-animate-opacity="true"]'), { opacity: 0 });
        ctx.add("show", () => {
            console.log("HIDING");
            gsap.timeline()
                .fromTo(
                    comp.current,
                    {
                        height: "0",
                    },
                    {
                        height: "84vh",
                        pointerEvents: "all",
                        duration: 0.5,
                        ease: "power4.in",
                        onComplete: () => setShown(true),
                    }
                )
                .to(ctx.selector?.('[data-animate-opacity="true"]'), {
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.2,
                    ease: "power4.in",
                });
        });
        ctx.add("hide", () => {
            console.log("HIDING");

            gsap.timeline()
                .to(ctx.selector?.('[data-animate-opacity="true"]'), {
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.2,
                    ease: "power4.in",
                })
                .to(comp.current, {
                    height: "0vh",
                    pointerEvents: "all",
                    duration: 0.5,
                    ease: "power4.in",
                    onComplete: () => {
                        setShown(false);
                        gsap.set(comp.current, { height: "0", pointerEvents: "none" });
                        gsap.set(ctx.selector?.('[data-animate-opacity="true"]'), { opacity: 0 });
                    },
                });
        });
        return () => ctx.revert();
    }, []);

    function hideMenu() {
        ctx.hide();
    }

    return (
        <div className="hamburger-menu fixed right-8 top-8 z-30 md:hidden">
            <div
                className="cursor-pointer"
                onClick={() => {
                    console.log("CLICKED SHOW");
                    ctx.show();
                }}
            >
                <HamSvg />
            </div>
            <div
                ref={comp}
                className={cn(
                    "fixed left-0 top-0 z-10 flex h-[84vh] w-full flex-col justify-between rounded-b-3xl bg-background-dark font-medium text-background-light"
                )}
            >
                <div className="" data-animate-opacity="true">
                    <div className="flex items-center justify-between p-6">
                        <h5>@ E-corp</h5>
                        <button
                            onClick={hideMenu}
                        >
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
                    <ul className="mt-12 space-y-3 px-6" data-animate-opacity="true">
                        <li>
                            <Link href="/" onClick={hideMenu}>
                                <H1 className="text-background-light">Home</H1>
                            </Link>
                        </li>
                        <li>
                            <Link href="/blog" onClick={hideMenu}>
                                <H1 className="text-background-light">Blog</H1>
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop" onClick={hideMenu}>
                                <H1 className="text-background-light">Shop</H1>
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact-us" onClick={hideMenu}>
                                <H1 className="text-background-light">Contact us </H1>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex items-center justify-between p-8" data-animate-opacity="true">
                    <p>English</p>
                    <p>GBP</p>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
