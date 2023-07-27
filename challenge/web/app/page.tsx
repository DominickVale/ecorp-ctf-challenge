import Button from "@/components/buttons/button";

export default function Home() {
  return (
    <main>
      <section className="max-w-4xl h-screen">
        <h1 className="text-2xl leading-tight">TRANSCEND ORDINARY \\ EVOLVE</h1>
        <p className="max-w-xl text-base font-light">
          E-Corp pioneers the convergence of mind and machine, unleashing the limitless potential within each
          individual. With Neurotap, we revolutionize human experiences, and shape a future beyond imagination.
        </p>
        <Button className="mt-3">ORDER NOW</Button>
      </section>
      <section className="h-screen">
        <div className="p-2 max-w-xl border-gray-500 border-1">
          <h3>// ELEGANCE & DURABILITY</h3>
          <p className="p-4">
            Embrace the future of human-machine symbiosis. Experience the elegance of Neurotap, the brain-machine
            implant designed to empower you in ways never thought possible and withstand the test of time.
          </p>
        </div>
        <div className="p-2 max-w-xl border-gray-500 border-1">
          <h3>// ELEGANCE & DURABILITY</h3>
          <p className="p-4">
            Embrace the future of human-machine symbiosis. Experience the elegance of Neurotap, the brain-machine
            implant designed to empower you in ways never thought possible and withstand the test of time.
          </p>
        </div>
        <div className="p-2 max-w-xl border-gray-500 border-1">
          <h3>// ELEGANCE & DURABILITY</h3>
          <p className="p-4">
            Embrace the future of human-machine symbiosis. Experience the elegance of Neurotap, the brain-machine
            implant designed to empower you in ways never thought possible and withstand the test of time.
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
        <p className="col-start-2 col-span-2 flex flex-row gap-11">© 2030 Neurotap. All rights reserved.</p>
        <p className="col-start-9 pl-16 col-span-5 justify-start gap-11">By Dominick Vale — have fun :)</p>
      </div>
    </main>
  );
}
