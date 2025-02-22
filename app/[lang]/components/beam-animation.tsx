"use client";

import { AnimatedBeam, Circle } from "@/components/ui/beam";
import React, { useRef } from "react";
import { SiIconify, SiTypescript } from "react-icons/si";
import { RiNextjsFill, RiReactjsFill, RiTailwindCssFill } from "react-icons/ri";
import { FramerLogoIcon } from "@radix-ui/react-icons";
import { IoConstructOutline } from "react-icons/io5";
// import { Icons } from '@/components/home/home-animated-beam'

export default function Beams() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  //   const div8Ref = useRef<HTMLDivElement>(null);
  //   const div9Ref = useRef<HTMLDivElement>(null);

  return (
    <div className=" container absolute bottom-0 -translate-y-1/2  left-1/2 transform -translate-x-1/2  z-[-1]">
      <div
        className="relative flex w-full max-w-full mx-auto items-center justify-center overflow-hidden rounded-lg  bg-background p-10"
        ref={containerRef}
      >
        <div className="flex h-full w-full flex-col items-stretch justify-between gap-10">
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div1Ref}>
              <SiTypescript />
            </Circle>
            <Circle ref={div5Ref} className="p-2">
              <RiTailwindCssFill />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div2Ref} className="p-2">
              <FramerLogoIcon />
            </Circle>
            <Circle ref={div4Ref} className="h-16 w-16 p-3">
              <IoConstructOutline />
            </Circle>
            <Circle ref={div6Ref} className="p-2">
              <SiIconify />
            </Circle>
          </div>
          <div className="flex flex-row items-center justify-between">
            <Circle ref={div3Ref} className="p-2">
              <RiNextjsFill />
            </Circle>
            <Circle ref={div7Ref} className="p-2">
              <RiReactjsFill />
            </Circle>
          </div>
        </div>

        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
          dotted
          gradientStartColor="#00ac47"
          gradientStopColor="#ffba00"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div4Ref}
          dotted
          gradientStartColor="#d948ae"
          gradientStopColor="#5b60ff"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div4Ref}
          curvature={75}
          endYOffset={10}
          dotted
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div4Ref}
          curvature={-75}
          endYOffset={-10}
          reverse
          gradientStartColor="#48b0d9"
          gradientStopColor="#67aeff"
          dotted
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div4Ref}
          reverse
          dotted
          gradientStartColor="#00ac47"
          gradientStopColor="#4fcc5d"
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={div7Ref}
          toRef={div4Ref}
          curvature={75}
          endYOffset={10}
          reverse
          dotted
          gradientStartColor="#48b0d9"
          gradientStopColor="#67aeff"
        />
      </div>
    </div>
  );
}
