import Image from "next/image";

import brainProto from "@/assets/images/brain-proto.jpg"
import Button from "@/components/buttons/button";

export default function Home() {
  return (
    <main>
      <section className="h-screen ml-32 mt-28">
        <h1 className="text-black text-2xl 3xl:text-[clamp(6.854rem,6vw,11.09rem)] font-heading tracking-display leading-[1.18]">
          TRANSCEND<br/>ORDINARY \\<br/>EVOLVE
        </h1>
        <p className="max-w-2xl text-base font-light leading-9 mt-20">
          E-Corp pioneers the convergence of mind and machine, unleashing the limitless potential
          within each individual. With Neurotap, we revolutionize human experiences, and shape a
          future beyond imagination.
        </p>
        <div className="brain-proto absolute right-0 top-0 mix-blend-darken w-[38.2%] mr-28 mt-20 scale-125">
          <Image src={brainProto} alt="brain-proto" />
        </div>
        <Button className="mt-14" variant="display">
          ORDER NOW
        </Button>
        <div className="absolute left-[61.8%] top-0 h-screen bg-red-200">
          <span className="">SCROLL</span>
        </div>
      </section>

      <section className="h-screen">
        <div className="p-2 max-w-xl border-gray-500 border-1">
          <h3>// ELEGANCE & DURABILITY</h3>
          <p className="p-4">
            Embrace the future of human-machine symbiosis. Experience the elegance of Neurotap, the
            brain-machine implant designed to empower you in ways never thought possible and
            withstand the test of time.
          </p>
        </div>
        <div className="p-2 max-w-xl border-gray-500 border-1">
          <h3>// ELEGANCE & DURABILITY</h3>
          <p className="p-4">
            Embrace the future of human-machine symbiosis. Experience the elegance of Neurotap, the
            brain-machine implant designed to empower you in ways never thought possible and
            withstand the test of time.
          </p>
        </div>
        <div className="p-2 max-w-xl border-gray-500 border-1">
          <h3>// ELEGANCE & DURABILITY</h3>
          <p className="p-4">
            Embrace the future of human-machine symbiosis. Experience the elegance of Neurotap, the
            brain-machine implant designed to empower you in ways never thought possible and
            withstand the test of time.
          </p>
        </div>
        <footer className="bg-black h-[90vh] flex flex-col">
          <section>
            <h2 className="text-xl">
              JOIN THE
              <br />
              R_EVOLUTION
            </h2>
            <Button className="mt-3">ORDER NOW</Button>
          </section>
          <section className="flex flex-row justify-between my-[10vh]">
            <ul>
              <li>123 Futuristic Street, New York</li>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Email: info@neurotap.com</li>
            </ul>
            <ul>
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
            <ul>
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
          </section>
        </footer>
      </section>
      <div className="col-start-2 col-end-15 grid grid-cols-[repeat(13,1fr)] content-end border-t-1 border-t-gray-500 pt-2 text-xs">
        <p className="col-start-2 col-span-2 flex flex-row gap-11">
          © 2030 Neurotap. All rights reserved.
        </p>
        <p className="col-start-9 pl-16 col-span-5 justify-start gap-11">
          By Dominick Vale — have fun :)
        </p>
      </div>
    </main>
  );
}
