import { Hero } from "@/sections/Hero";
import { Showcase } from "@/sections/Showcase";

import Button from "@/components/buttons/button";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="relative">
        <div className="fixed bottom-0 left-0 h-[5.4rem] w-full px-6 pb-4 md:hidden">
          <Button size="fluid">ORDER NOW</Button>
        </div>
        <Hero />
        <Showcase />
      </main>
      <Footer />
    </>
  );
}
