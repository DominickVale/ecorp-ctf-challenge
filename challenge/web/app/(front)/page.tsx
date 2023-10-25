import { Hero } from "@/sections/Hero";
import { Showcase } from "@/sections/Showcase";

import BrainBackground from "@/components/Brain";
import { FixedButton } from "@/components/FixedButton";
import { Footer } from "@/components/Footer";

export default function Home() {
    return (
        <div id="scrollContainer1">
            <main className="relative">
                <FixedButton />
                <Hero />
                <Showcase />
            </main>
            <Footer />
            <div className="pointer-events-none fixed bottom-0 left-0 right-0 top-0 h-full w-full z-[-1]">
                <BrainBackground />
            </div>
        </div>
    );
}
