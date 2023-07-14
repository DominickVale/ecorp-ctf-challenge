import Button from "@/components/buttons/button";
import {Input} from "@/components/inputs/input";
import {Textarea} from "@/components/inputs/textarea";

export default function ContactUs() {
  return (
    <main>
      <section className="max-w-4xl h-screen">
        <h1 className="text-2xl leading-tight">Contacts</h1>
          <Input type="text" placeholder="Your full name" />
          <Textarea placeholder="Your message" />
        <Button className="mt-3">ORDER NOW</Button>
      </section>
      <div className="col-start-2 col-end-15 grid grid-cols-[repeat(13,1fr)] content-end border-t-1 border-t-gray-500 pt-2 text-xs">
        <p className="col-start-2 col-span-2 flex flex-row gap-11">© 2030 Neurotap. All rights reserved.</p>
        <p className="col-start-9 pl-16 col-span-5 justify-start gap-11">By Dominick Vale — have fun :)</p>
      </div>
    </main>
  );
}
