import { Hero } from "@/sections/Hero";
import { Showcase } from "@/sections/Showcase";

import Button from "@/components/buttons/button";
import { FixedButton } from "@/components/FixedButton";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main className="relative">
        <FixedButton />
        <Hero />
        <Showcase />
      </main>
      <Footer />
    </>
  );
}
