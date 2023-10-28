import { Hero } from "@/sections/Hero";
import { Showcase } from "@/sections/Showcase";

import FrontPageScene from "@/components/3d/FrontPageScene";
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
            <FrontPageScene />
        </div>
    );
}
