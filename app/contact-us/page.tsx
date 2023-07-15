"use client";

import { useState } from "react";

import Button from "@/components/buttons/button";
import { Input } from "@/components/inputs/input";
import SelectBox from "@/components/inputs/selectbox";
import { Textarea } from "@/components/inputs/textarea";

export default function ContactUs() {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const formData = new FormData(target);
    console.log(formData);
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;

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
        name: name,
        message: message,
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
    }
    setErrors(_errors);
  };

  return (
    <main>
      <form className="max-w-4xl h-screen" onSubmit={onSubmit}>
        <h1 className="text-2xl leading-tight">Contacts</h1>
        <Input id="name" name="name" type="text" placeholder="Your full name" />
        <Textarea id="message" name="message" placeholder="Your message" />
        <SelectBox
          id="support-type"
          name="support-type"
          options={[
            { label: "Software support" },
            { label: "Hardware support" },
            { label: "Sales" },
          ]}
        />
        <Button type="submit" className="mt-3" disabled={isSending || isSent}>
          SEND
        </Button>
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
