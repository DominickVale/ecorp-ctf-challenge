import Image from "next/image";
import brainProto from "@/assets/images/brain-proto.jpg";
import photo1 from "@/assets/images/device1.png";
import photo2 from "@/assets/images/device2.png";

import Button from "@/components/buttons/button";
import { Footer } from "@/components/Footer";
import { LayoutLines } from "@/components/layout-lines";
import { H1 } from "@/components/typography";

export default function Home() {
  return (
    <>
      <main className="relative">
        <LayoutLines />
        <div className="md:hidden fixed bottom-0 left-0 h-[5.4rem] w-full px-6 pb-4">
          <Button size="fluid">ORDER NOW</Button>
        </div>
        <section className="px-6 min-h-screen grid-cols-golden grid-rows-golden lg:grid">
          <div className="mt-14 md:px-14 xl:ml-32 md:mt-28 sm:max-w-[80vw] mx-auto">
            <H1>
              TRANSCEND
              <br />
              ORDINARY&nbsp;\\
              <br />
              EVOLVE
            </H1>
            <p className="mt-12 md:mt-20 max-w-2xl text-sm font-light leading-tight sm:text-base md:leading-9">
              E-Corp pioneers the convergence of mind and machine, unleashing the limitless
              potential within each individual. With Neurotap, we revolutionize human experiences,
              and shape a future beyond imagination.
            </p>
            <Button className="mt-14 hidden md:block">ORDER NOW</Button>
          </div>
          <div className="absolute pointer-events-none right-0 top-0 h-full w-full md:relative col-span-2 col-start-2">
            <Image
                className="absolute hidden lg:scale-150 mix-blend-darken top-[15vh] right-0 lg:top-8 lg:right-0 xl:bottom-[-23.6%] xl:left-[-14.6%] md:block"
                src={brainProto}
                alt="brain-proto"
            />
            <div className="fixed left-0 top-0 flex h-[25vh] w-screen justify-center mix-blend-darken md:hidden">
              <div className="relative h-full w-full">
                <Image className="object-contain" fill src={brainProto} alt="brain-proto" />
              </div>
            </div>
          </div>
          <div className="col-start-2 row-start-2 mt-16 flex place-items-center justify-center">
            <span className="">SCROLL</span>
          </div>
        </section>

        <section className="grid h-screen grid-cols-golden grid-rows-golden">
          <Image className="mix-blend-darken" src={brainProto} alt="brain-proto" />
          <Image
            className="col-start-2 row-start-2 h-[40%] object-cover object-right-top opacity-30"
            src={photo2}
            alt="brain-proto"
          />
          <Image
            className="col-start-3 h-full object-cover opacity-30"
            src={photo1}
            alt="brain-proto"
          />

          <div className="popups absolute">
            <div className="max-w-xl border-1 border-gray-500 p-2">
              <h3>// ELEGANCE & DURABILITY</h3>
              <p className="p-4">
                Embrace the future of human-machine symbiosis. Experience the elegance of Neurotap,
                the brain-machine implant designed to empower you in ways never thought possible and
                withstand the test of time.
              </p>
            </div>
            <div className="max-w-xl border-1 border-gray-500 p-2">
              <h3>// ELEGANCE & DURABILITY</h3>
              <p className="p-4">
                Embrace the future of human-machine symbiosis. Experience the elegance of Neurotap,
                the brain-machine implant designed to empower you in ways never thought possible and
                withstand the test of time.
              </p>
            </div>
            <div className="max-w-xl border-1 border-gray-500 p-2">
              <h3>// ELEGANCE & DURABILITY</h3>
              <p className="p-4">
                Embrace the future of human-machine symbiosis. Experience the elegance of Neurotap,
                the brain-machine implant designed to empower you in ways never thought possible and
                withstand the test of time.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
