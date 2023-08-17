"use client";

import { useState } from "react";
import Image from "next/image";
import brainProto from "@/assets/images/brain-proto.jpg";
import decorativeFooter from "@/assets/svg/decorative-footer-1.svg";

import Button from "@/components/buttons/button";
import { Input } from "@/components/inputs/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/inputs/selectbox";
import { Textarea } from "@/components/inputs/textarea";
import { LayoutLines } from "@/components/layout-lines";
import { SupportType } from "@/app/api/contact/route";

export default function ContactUs() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isDirty, setDirty] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;
    const supportType = formData.get("support-type") as SupportType;

    let _errors: string[] = [];
    if (name.length < 2) _errors.push("Name must be at least 2 characters long");
    if (message.length < 26) _errors.push("Message must be at least 26 characters long");

    if (_errors.length > 0) {
      setErrors(_errors);
      return;
    }

    setIsSending(true);

    const response = await fetch(`/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        message,
        supportType,
      }),
    });

    if (!response?.ok) {
      _errors.push("Something went wrong, please try again later");
      setIsSending(false);
    } else {
      _errors = [];
      setIsSending(false);
      setIsSent(true);
      target.reset();
      setDirty(false);
    }
    setErrors(_errors);
  };

  function onFormChange() {
    if (!isDirty) setDirty(true);
  }

  return (
    <main className="relative grid grid-cols-golden grid-rows-golden border-t-1 border-elements-light items-end h-[calc(100vh-114px)] justify-end place-content-end">
      <LayoutLines />
      <div className="relative bg-background-dark h-full rounded-[5%] pt-40 px-32 pb-20 flex flex-col row-span-2 justify-between">
        <section>
          <Image
            className="absolute left-14 top-14"
            src={decorativeFooter}
            alt="decorative element"
          />
          <Image
            className="absolute right-14 top-14"
            src={decorativeFooter}
            alt="decorative element"
          />
          <h2 className="text-background-light text-xl font-heading tracking-display leading-[1.18]">
            CONTACT US
          </h2>
          <p className="text-zinc-400 mt-8 text-sm font-normal tracking-wide max-w-xl">
            We deeply care about our customers, so please don't hesitate to contact us for any
            questions, feedback, or in the rare event that you encounter any issues.
          </p>

          <form className="max-w-4xl" onSubmit={onSubmit} onChange={onFormChange}>
            <div className="flex flex-col gap-6 mt-12">
              <div className="flex gap-6">
                <Input id="name" name="name" type="text" placeholder="Your full name" />
                <Input id="name" name="name" type="text" placeholder="Your full name" />
              </div>
              <Textarea id="message" name="message" placeholder="Your message" />
              <div className="flex gap-6">
                <Button
                  type="submit"
                  theme="neon"
                  size="fluid"
                  disabled={isSending || isSent || !isDirty}
                >
                  SEND
                </Button>
                <Select>
                  <SelectTrigger className="h-auto">
                    <SelectValue placeholder="Choose support type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software support">Software support</SelectItem>
                    <SelectItem value="Hardware support">Hardware support</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {errors.length > 0 && (
              <div className="mt-3">
                {errors.map((error) => (
                  <p className="text-red-500">{error}</p>
                ))}
              </div>
            )}
            {isSent && (
              <div className="mt-3">
                <p className="text-green-500">Message sent. Will be reviewed shortly.</p>
              </div>
            )}
          </form>
        </section>
        <section>
          <div className="text-zinc-400 flex flex-row justify-between text-sm">
            <ul>
              <li>
                <b className="text-background-light mr-2">Email:</b>info@neurotap.com
              </li>
              <li>
                <b className="text-background-light mr-2">Phone:</b>+1 (123) 456-7890
              </li>
              <li>123 Futuristic Street, New York</li>
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
          </div>
        </section>
      </div>
      <Image
        className="mix-blend-darken scale-[0.8] absolute right-[-8%] top-12"
        src={brainProto}
        alt="brain-proto"
      />
    </main>
  );
}
