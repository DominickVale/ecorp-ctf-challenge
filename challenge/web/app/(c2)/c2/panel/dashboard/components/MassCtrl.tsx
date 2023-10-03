import React from "react";
import Image from "next/image";
import massCtrlDeco from "@/assets/svg/mass-ctrl-decoration.svg";
import politicalSpectrum from "@/assets/svg/political-spectrum.svg";

import { cn } from "@/lib/utils";
import { Line } from "@/components/decorations/line";

interface MassCtrlProps extends React.HTMLAttributes<HTMLDivElement> { randomData: any }

interface FrameProps extends React.HTMLAttributes<SVGSVGElement> {}
const Frame = (props: FrameProps) => (
    <svg className="h-[34rem] w-[31rem] absolute left-0 top-0" viewBox="0 0 469 522" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 0H259C270.046 0 279 8.95431 279 20V191.553C279 202.578 287.922 211.523 298.947 211.552L449.053 211.948C460.078 211.977 469 220.922 469 231.947V501.479C469 512.533 460.033 521.49 448.979 521.479L19.9787 521.021C8.94131 521.01 0 512.059 0 501.021V460.784C0 455.48 2.10714 450.393 5.85787 446.642L17.6421 434.858C21.3929 431.107 23.5 426.02 23.5 420.716V127.284C23.5 121.98 21.3929 116.893 17.6421 113.142L5.85786 101.358C2.10714 97.6071 0 92.5201 0 87.2157V20C0 8.9543 8.95431 0 20 0Z" fill="#E2E0E0"/>
    </svg>
)

export function MassCtrl(props: MassCtrlProps) {
const { randomData } = props
  return (
    <div
      className={cn(
        "relative h-[34rem] rounded-3xl px-8 flex flex-col",
        props.className
      )}
    >
      {/*<div className="bg absolute left-0 top-0 z-0 h-full w-full">*/}
      {/*  <div className="relative h-full w-full">*/}
      {/*    <Image className="" src={frame} alt={"frame"} fill />*/}
      {/*  </div>*/}
      {/*</div>*/}
      <Frame />
      <div className="relative z-10 flex w-[56%] items-center justify-between rounded-2xl pt-4 pb-1">
        <h4 className="text-md font-bold tracking-display text-background-dark">MASS CONTROL</h4>
        <div className="h-[0.35rem] w-[0.35rem] rounded-full bg-elements-light" />
      </div>
      <div className="relative z-10 w-[23rem]">
        <div className="relative">
          <p className="max-w-[55%] text-xs text-neutral-500">
            These statistics are not perfectly reliable as of yet. Jitter factor is ~ 1.5%.
          </p>
          <div className="relative mt-2 max-w-[50%]">
            <div className="h-1 w-1 rounded-full bg-elements-light" />
            <Line className="left-4 z-10 w-1/2" o="bottom" dark />
          </div>
          <div className="relative ml-5 mt-6 grid max-w-[70%] grid-flow-row grid-cols-2 gap-x-4 text-neutral-500">
            <b className="tracking-tight text-xs">FOLLOWERS</b>
            <span className="text-xs font-medium">{randomData.followers}</span>
            <b className="tracking-tight text-xs">EMOTIONAL M. IDX</b>
            <span className="text-xs font-medium">{randomData.emotionalIdx}</span>
            <b className="tracking-tight text-xs">COGNITIVE DISSONANCE</b>
            <span className="text-xs font-medium">{randomData.cognitiveDissonance}%</span>
            <b className="tracking-tight text-xs">DISINF. AMPLIFIER</b>
            <span className="text-xs font-medium">x{randomData.disinformationAmplifier}</span>
            <b className="tracking-tight text-xs">ALIGNMENT IDX</b>
            <span className="text-xs font-medium">{randomData.alignmentIdx}</span>
            <b className="tracking-tight text-xs">DISSENT SUPPR. RATE</b>
            <span className="text-xs font-medium">{randomData.dissentSuppressionRate}%</span>
            <b className="tracking-tight text-xs">SUBLIMINAL INFLUENCE</b>
            <span className="text-xs font-medium">{randomData.subliminalInfluence}%</span>
            <b className="tracking-tight text-xs">NEUROTAP INF. RATE</b>
            <span className="text-xs font-medium">{randomData.neurotapInfectionRate}%</span>
          </div>
        </div>
        <div className="relative mt-12 flex w-full flex-col justify-between mx-6">
          <b className="text-xs text-neutral-500">MANIP EASE</b>
          <div className="relative h-16 w-32">
            <Image className="" src={massCtrlDeco} alt="" fill />
          </div>
          <div className="absolute right-[-2rem] top-[-120%]">
            <div className="relative h-56 w-56">
              <Image className="" src={politicalSpectrum} alt="politicalSpectrum" fill />
            </div>
          </div>
        </div>
      </div>
      <div className="relative mt-auto mb-5 grid grid-cols-3 grid-rows-2 gap-y-1 gap-x-4 items-center">
        <Line className="row-span-2" o="bottom" isBg={false} />
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 bg-red-700 bg-opacity-30 rounded-full" />
          <span className="text-xs text-neutral-500">MITCHELL O. (US)</span>
        </div>
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 bg-[#097300] bg-opacity-30 rounded-full" />
          <span className="text-xs text-neutral-500">PETROV O. (RU)</span>
        </div>
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 bg-[#00B7C2] bg-opacity-30 rounded-full" />
          <span className="text-xs text-neutral-500">RODRIGUEZ C. (BR)</span>
        </div>
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 bg-[#02006F] bg-opacity-30 rounded-full" />
          <span className="text-xs text-neutral-500">CHEN XI (CN)</span>
        </div>
      </div>
    </div>
  );
}
