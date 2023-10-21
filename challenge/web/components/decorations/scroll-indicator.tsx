"use client";

import React, { forwardRef, Ref, SVGProps, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

interface Props extends SVGProps<SVGSVGElement> {}

const circleTargets = "circle[data-animate=true]";
const ScrollIndicator = (props: Props) => {
const [visible, setVisible] = useState(false);
    const svgRef = useRef<SVGSVGElement>(null);

    useLayoutEffect(() => {
    setVisible(true)
        const ctx = gsap.context(() => {
            gsap.timeline({
                repeat: -1,
            })
                .fromTo(
                    circleTargets,
                    {
                        autoAlpha: 0,
                        y: -50,
                    },
                    {
                        autoAlpha: (i) => 1 - i * 0.3,
                        stagger: 0.15,
                        y: 0,
                        duration: 3,
                        ease: "power3.inOut",
                    }
                )
                .to(
                    circleTargets,
                    {
                        scaleY: 2,
                        duration: 1.5,
                        stagger: 0.15,
                        ease: "power2.in",
                    },
                    "<"
                )
                .to(
                    circleTargets,
                    {
                        scaleY: 1,
                        duration: 1.5,
                        stagger: 0.15,
                        ease: "power2.out",
                    },
                    "<50%"
                )
                .to(circleTargets, {
                    duration: 1,
                    autoAlpha: 0,
                    ease: "power1.inOut",
                });
        });

        return () => ctx.revert();
    }, []);

    return (
        <svg
            className={visible ? "blink__appear" : "" }
            width={37}
            height={75}
            viewBox="0 0 37 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="scroll__indicator"
            ref={svgRef}
            {...props}
        >
            <circle cx={18.5} cy={48.5} r={4.5} fill="#A0A0A0" data-animate="true" />
            <circle cx={18.5} cy={48.5} r={4.5} fill="#A0A0A0" data-animate="true" />
            <circle cx={18.5} cy={48.5} r={4.5} fill="#A0A0A0" data-animate="true" />
            <circle cx={18.5} cy={43.5} r={12.25} stroke="#B0B0B0" strokeWidth={0.5} />
            <line
                x1={18.75}
                y1={40}
                x2={18.75}
                y2={1.09279e-8}
                stroke="#B0B0B0"
                strokeWidth={0.5}
            />
        </svg>
    );
};

export default ScrollIndicator;
