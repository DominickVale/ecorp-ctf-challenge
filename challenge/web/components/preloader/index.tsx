"use client"

import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import gsap from 'gsap'
import React, { PropsWithChildren, useLayoutEffect, useRef } from 'react'
import { usePreloaderState } from './preloader.hooks'

type PreloaderSideProps = {
  o: "left" | "right"
  // 0 - 100
  progress: number
} & PropsWithChildren

const PreloaderSide = (props: PreloaderSideProps) => {
  const { o, children, progress } = props

  return (
    <div className={cn('flex gap-2 items-center', o === 'left' && "flex-row-reverse")}>
      <div className='w-1.5 h-1.5 rounded-full bg-background-dark' />
      <div className='relative bar w-[25vw] bg-stone-300 rounded-full h-1'>
        <div className={cn('inner-bar w-[20%] h-full bg-background-dark rounded-full', o === "left" && "ml-auto")} style={{ width: progress + "%" }} />
        <div className={cn('absolute top-[-1.5rem] left-3 uppercase font-bold text-xs', o === "left" && "right-3 left-auto")}>
          {children}
        </div>
      </div>
      <div className='h-3.5 w-1 bg-background-dark' />
    </div>
  )
}

type PreloaderProps = {}

export const Preloader = (props: PreloaderProps) => {
  const pathname = usePathname()
  const { setLoaded } = usePreloaderState()
  const [loading, setLoading] = React.useState(true)
  const [progress, setProgress] = React.useState(0)
  const comp = useRef(null)


  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const localProgress = { number: 0 };
      gsap.to(localProgress, {
        duration: 1,
        ease: "power1.inOut",
        number: 100,
        onUpdate: () => {
          setProgress(localProgress.number);
        },
        onComplete: () => {
          setLoaded(true)
          gsap.to(comp.current, {
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.5,
            onComplete: () => {
              setLoading(false)
            }
          })
        }
      })
    });

    return () => ctx.revert();
  }, []);

  return loading ? (
    <div className='bg-background-light w-full h-full fixed z-50 flex items-center justify-center place-items-center gap-3' ref={comp}>
      <PreloaderSide o="right" progress={progress}>
        Loading ...
      </PreloaderSide>

      <svg width="58" height="57" viewBox="0 0 58 57" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2.4064" y="28.3301" width="38.0661" height="38.0661" rx="5" transform="rotate(-45 2.4064 28.3301)" fill="white" stroke="#262626" strokeWidth="2" />
        <path d="M29.7131 40.1414L17.3415 27.7698L28.5591 16.5523L30.9859 18.9791L22.9248 27.0401L25.4704 29.5857L32.4623 22.5938L34.7024 24.8339L27.7105 31.8258L30.4428 34.558L38.4699 26.531L40.8967 28.9578L29.7131 40.1414Z" fill="#262626" />
      </svg>

      <PreloaderSide o="left" progress={progress}>
        {Math.round(progress)}%
      </PreloaderSide>
    </div>
  ) : null
}
