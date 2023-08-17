import Image from "next/image";
import brainProto from "@/assets/images/brain-proto.jpg";
import photo1 from "@/assets/images/device1.png";
import photo2 from "@/assets/images/device2.png";

import Button from "@/components/buttons/button";
import { Footer } from "@/components/Footer";
import { LayoutLines } from "@/components/layout-lines";

export default function Home() {
  return (
    <>
      <main className="relative">
        <LayoutLines />
        <section className="h-screen grid grid-cols-golden grid-rows-golden">
          <div className="ml-32 mt-28">
            <h1 className="text-black text-2xl 3xl:text-[clamp(6.854rem,6vw,11.09rem)] font-heading tracking-display leading-[1.18]">
              TRANSCEND
              <br />
              ORDINARY&nbsp;\\
              <br />
              EVOLVE
            </h1>
            <p className="max-w-2xl text-base font-light leading-9 mt-20">
              E-Corp pioneers the convergence of mind and machine, unleashing the limitless
              potential within each individual. With Neurotap, we revolutionize human experiences,
              and shape a future beyond imagination.
            </p>
            <Button className="mt-14">
              ORDER NOW
            </Button>
          </div>
          <div className="relative col-start-2 col-span-2">
            <Image
              className="mix-blend-darken scale-150 absolute left-[-14.6%] bottom-[-23.6%]"
              src={brainProto}
              alt="brain-proto"
            />
          </div>
          <div className="col-start-2 row-start-2 flex justify-center place-items-center mt-16">
            <span className="">SCROLL</span>
          </div>
        </section>

        <section className="h-screen grid grid-cols-golden grid-rows-golden">
          <Image className="mix-blend-darken" src={brainProto} alt="brain-proto" />
          <Image
            className="opacity-30 col-start-2 row-start-2 h-[40%] object-cover object-right-top"
            src={photo2}
            alt="brain-proto"
          />
          <Image
            className="opacity-30 col-start-3 h-full object-cover"
            src={photo1}
            alt="brain-proto"
          />

          <div className="popups absolute">
            <div className="p-2 max-w-xl border-gray-500 border-1">
              <h3>// ELEGANCE & DURABILITY</h3>
              <p className="p-4">
                Embrace the future of human-machine symbiosis. Experience the elegance of Neurotap,
                the brain-machine implant designed to empower you in ways never thought possible and
                withstand the test of time.
              </p>
            </div>
            <div className="p-2 max-w-xl border-gray-500 border-1">
              <h3>// ELEGANCE & DURABILITY</h3>
              <p className="p-4">
                Embrace the future of human-machine symbiosis. Experience the elegance of Neurotap,
                the brain-machine implant designed to empower you in ways never thought possible and
                withstand the test of time.
              </p>
            </div>
            <div className="p-2 max-w-xl border-gray-500 border-1">
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
