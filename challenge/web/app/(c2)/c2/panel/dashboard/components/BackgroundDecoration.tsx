import React, { forwardRef, Ref, SVGProps, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useInterval } from "react-use";

import { cn, random } from "@/lib/utils";

interface Props extends SVGProps<SVGSVGElement> {}

type BackgroundDecoLowerTextProps = {
    o: "left" | "right";
} & React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

const BackgroundDecoLowerText = ({ o, children, ...props }: BackgroundDecoLowerTextProps) => {
    const { className, ...rest } = props;
    return (
        <div
            className={cn(
                "absolute flex gap-2 align-middle",
                o === "right" && "flex-row-reverse",
                className
            )}
            {...rest}
        >
            <svg
                className={cn(o === "right" && "scale-x-[-1]")}
                width="15"
                height="30"
                viewBox="0 0 15 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M15 29C11.287 29 7.72601 27.525 5.1005 24.8995C2.475 22.274 1 18.713 1 15C1 11.287 2.475 7.72601 5.10051 5.1005C7.72601 2.475 11.287 1 15 1"
                    stroke="#666666"
                    strokeWidth="0.75"
                />
            </svg>
            <div className={cn("flex flex-col", o === "right" && "place-items-end")}>
                {children}
            </div>
        </div>
    );
};

const BackgroundDecoration = React.forwardRef<SVGSVGElement, Props>((props, ref) => {
    const linesRef = useRef<SVGGElement>(null);
    const diagonalLineRef = useRef<SVGLineElement>(null);
    const circleRef = useRef<SVGGElement>(null);
    const [fakeCoords, setFakeCoords] = useState({
        LAT: 40.1295392,
        LON: 20.4232412,
    });
    const [fakeGlobalData, setFakeGlobalData] = useState({
        socialInfluence: "424.7756",
        avgSatHealth: "35.322",
    });

    useInterval(() => {
        setFakeGlobalData({
            socialInfluence: (random(420.000, 430.000)).toFixed(4),
            avgSatHealth: (random(35, 36)).toFixed(3),
        });
    }, 3400);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                linesRef.current,
                {
                    rotate: "-25deg",
                    transformOrigin: "50% 50%",
                },
                {
                    transformOrigin: "50% 50%",
                    rotate: "25deg",
                    ease: CustomEase.create(
                        "custom",
                        "M0,0 C0.086,0.134 0.11,0.242 0.231,0.242 0.281,0.242 0.235,0.455 0.416,0.486 0.524,0.504 0.539,0.751 0.565,0.775 0.593,0.801 0.748,0.682 0.8,0.7 0.865,0.722 0.923,1 1,1 "
                    ),
                    duration: 10,
                    repeat: -1,
                    yoyo: true,
                }
            );
            gsap.fromTo(
                circleRef.current,
                {
                    rotate: "0",
                    transformOrigin: "50% 50%",
                },
                {
                    transformOrigin: "50% 50%",
                    rotate: "360deg",
                    ease: "power1.inOut",
                    duration: 40,
                    repeat: -1,
                    yoyo: true,
                }
            );
            const coordinatesObj = { LAT: 13.33333, LON: 6.66666 };
            gsap.to(coordinatesObj, {
                LAT: 90,
                LON: 180,
                duration: 40,
                ease: "steps(160)",
                repeat: -1,
                yoyo: true,
                onUpdate: () => {
                    setFakeCoords({
                        LAT: coordinatesObj.LAT,
                        LON: coordinatesObj.LON,
                    });
                },
            });

            gsap.fromTo(
                diagonalLineRef.current,
                {
                    rotate: "0",
                    transformOrigin: "50% 50%",
                },
                {
                    transformOrigin: "50% 50%",
                    rotate: "20deg",
                    ease: "sine.inOut",
                    duration: 10,
                    repeat: -1,
                    yoyo: true,
                }
            );
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="fixed left-0 top-24 flex h-screen w-screen justify-center align-middle">
            <div className="relative">
                <div className="absolute left-0 top-0 h-full w-full">
                    <div className="relative h-full w-full text-xs text-neutral-500">
                        <small className="absolute left-[22%] top-[24.4%]">
                            LAT: {fakeCoords.LAT}
                            <br />
                            LON: {fakeCoords.LON}
                        </small>
                        <small className="absolute right-[22%] top-[25%]">SATELLITES: 666</small>
                        <BackgroundDecoLowerText className="left-[18%] top-[71%]" o="left">
                            <small>SOCIAL INFLUENCE</small>
                            <small className="text-md font-bold tracking-[0.3em] neon--white">
                                {fakeGlobalData.socialInfluence}
                            </small>
                        </BackgroundDecoLowerText>
                        <BackgroundDecoLowerText className="right-[18%] top-[71%]" o="right">
                            <small>AVG. SAT. HEALTH</small>
                            <small className="mr-[-0.2rem] text-md font-bold tracking-[0.3em] neon--white">
                                {fakeGlobalData.avgSatHealth}%
                            </small>
                        </BackgroundDecoLowerText>
                    </div>
                </div>
                <svg
                    width="33vw"
                    height="100vh"
                    viewBox="0 0 698 759"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="BG_DECO overflow-visible"
                    ref={ref}
                    {...props}
                >
                    <g className="Group 212" ref={linesRef}>
                        <line
                            y1={-0.5}
                            x2={221.626}
                            y2={-0.5}
                            transform="matrix(-0.708628 0.705582 0.705582 0.708628 698 26)"
                            stroke="#666666"
                            className="Line 89"
                        />
                        <line
                            y1={-0.5}
                            x2={221.626}
                            y2={-0.5}
                            transform="matrix(0.708628 -0.705582 -0.705582 -0.708628 0 721)"
                            stroke="#666666"
                            className="Line 91"
                        />
                        <line
                            x1={697.647}
                            y1={721.354}
                            x2={540.597}
                            y2={564.979}
                            stroke="#666666"
                            className="Line 86"
                        />
                        <line
                            x1={0.352791}
                            y1={25.6457}
                            x2={157.403}
                            y2={182.021}
                            stroke="#666666"
                            className="Line 90"
                        />
                    </g>
                    <g className="Ellipse 84" ref={circleRef}>
                        <mask fill="white" className="path-5-inside-1_881_1590">
                            <path d="M286.37 29.6657C368.271 14.7255 452.815 29.555 524.742 71.4774C596.669 113.4 651.24 179.653 678.606 258.279C705.972 336.906 704.33 422.725 673.976 500.246C643.622 577.768 586.556 641.885 513.078 681.025C439.6 720.165 354.55 731.749 273.281 713.687C192.012 695.625 119.876 649.105 69.8945 582.526C19.913 515.946 -4.62173 433.693 0.718821 350.612C6.05937 267.531 40.9233 189.096 99.0179 129.464L186.512 214.701C148.75 253.462 126.089 304.445 122.617 358.448C119.146 412.45 135.093 465.915 167.581 509.192C200.069 552.468 246.958 582.706 299.783 594.447C352.608 606.187 407.89 598.657 455.651 573.216C503.411 547.775 540.504 506.099 560.234 455.71C579.965 405.321 581.032 349.539 563.244 298.432C545.456 247.325 509.985 204.26 463.232 177.01C416.48 149.761 361.526 140.122 308.29 149.833L286.37 29.6657Z" />
                        </mask>
                        <path
                            d="M286.37 29.6657C368.271 14.7255 452.815 29.555 524.742 71.4774C596.669 113.4 651.24 179.653 678.606 258.279C705.972 336.906 704.33 422.725 673.976 500.246C643.622 577.768 586.556 641.885 513.078 681.025C439.6 720.165 354.55 731.749 273.281 713.687C192.012 695.625 119.876 649.105 69.8945 582.526C19.913 515.946 -4.62173 433.693 0.718821 350.612C6.05937 267.531 40.9233 189.096 99.0179 129.464L186.512 214.701C148.75 253.462 126.089 304.445 122.617 358.448C119.146 412.45 135.093 465.915 167.581 509.192C200.069 552.468 246.958 582.706 299.783 594.447C352.608 606.187 407.89 598.657 455.651 573.216C503.411 547.775 540.504 506.099 560.234 455.71C579.965 405.321 581.032 349.539 563.244 298.432C545.456 247.325 509.985 204.26 463.232 177.01C416.48 149.761 361.526 140.122 308.29 149.833L286.37 29.6657Z"
                            stroke="#666666"
                            strokeWidth={2}
                            mask="url(#path-5-inside-1_881_1590)"
                        />
                    </g>
                    <line
                        ref={diagonalLineRef}
                        opacity={0.5}
                        x1={278.429}
                        y1={0.0923582}
                        x2={416.103}
                        y2={758.701}
                        stroke="#666666"
                        strokeDasharray="8 4"
                        className="diagonal_line"
                    />
                </svg>
            </div>
        </div>
    );
});

export default BackgroundDecoration;
