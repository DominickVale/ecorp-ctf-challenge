"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import brainProto from "@/assets/images/brain-proto.jpg";
import { extractIdFromUserAgent } from "@/prisma/seed.utils";
import { StaffUser } from "@prisma/client";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

import Button from "@/components/buttons/button";
import { GetStaffUserDoc, LoginDoc } from "@/app/(c2)/c2/panel/gql-docs";
import {H1} from "@/components/typography";

// I've given up on using apollo client with nextjs. It's just too much of a hell for no reason.
// It's not worth it and i'm not getting paid so fuck this shit i'm out with fetch.

const URL = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL!;

function LoginPage() {
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: (args: { i: string; p: string }) => {
      return request(URL, LoginDoc, args);
    },
  });

  const {
    data: queryData,
    isLoading: queryLoading,
    isError: queryError,
    refetch: getData,
  } = useQuery<{ getStaffUser: StaffUser }>({
    queryKey: ["user"],
    queryFn: async () =>
      request(URL, GetStaffUserDoc, { id: extractIdFromUserAgent(window.navigator.userAgent) }),
    refetchOnWindowFocus: false,
    retry: false,
  });

  const handleNeurotapEvent = async (e: any) => {
    // Interaction with the fictional device API
    //@todo add the fake errors etc.
    const neurotapApi = e.api;
    const encodedMindReader = neurotapApi.initialize();

    let encodedWord = await encodedMindReader.ReadNeurocPassword();
    if (encodedWord) {
      loginMutation.mutate({
        p: encodedWord,
        i: window.navigator.userAgent,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("neurotap-hook-init", handleNeurotapEvent);

    return () => {
      window.removeEventListener("neurotap-hook-init", handleNeurotapEvent);
    };
  }, []);

  if (queryLoading) return <p>Loading...</p>;
  return (
    <main className="flex h-screen w-full flex-col py-[5vh] px-[5vw] justify-between">
      <section className="flex flex-col place-items-center justify-center">
        <H1 className="text-background-light">
          NEUROC
        </H1>
        <small className="text-xs">LOG-IN SYSTEM</small>
        <p className="mb-12 mt-16 max-w-xl text-center text-base font-light">
          With your Neurotap active, think of the answer to your security question:
        </p>
        <small className="mb-4 text-xs font-bold text-red-500">
          IF YOU'RE HAVING ISSUES, CONTACT LEVEL 0
        </small>
        <b className="text-center font-heading text-base leading-[1.18] tracking-display text-white">
          {queryData?.getStaffUser.securityQuestion}
        </b>
        <div className="relative h-96 w-96 bg-background-dark">
          <Image className="mix-blend-exclusion" fill src={brainProto} alt="brain-proto" />
        </div>
      </section>
      {process.env.NODE_ENV === "development" && (
        <Button
          className="fixed left-12 top-6"
          theme="light"
          onClick={() => {
            loginMutation.mutate({
              // prompt it
              p: prompt("Enter password") || "",
              i: extractIdFromUserAgent(window.navigator.userAgent),
            });
            router.push("/c2/panel/dashboard");
          }}
        >
          TEST LOGIN
        </Button>
      )}

      <section className="grid grid-cols-3 w-full place-items-center justify-between">
        <div className="flex flex-col justify-self-start">
          <small className="text-xs">CONNECTING TO NEUROTAP ...</small>
          <small className="text-xs">FAILED, RETRYING</small>
          <small className="text-xs text-red-500">
            CLIENT_ERR: NEUROTAP DEVICE NOT RECOGNIZED
            <br />
            \\ COULD NOT INSTANTIATE REQUIRED MODULES: OCCIPITAL, PREFRONTAL, TEMPORAL.
            <br />
            \\ REQUIRED MODULES NOT UP.
            <br />
            \\ GIVING UP.
            <br />
          </small>
        </div>
        <small className="text-xs">IDENTIFIER 123 @ Level 1 access</small>
        <small className="text-xs justify-self-end">NEUROC LOG-IN SYSTEM v0.2 // AUGUST REVISION // Q3</small>
      </section>
    </main>
  );
}

const queryClient = new QueryClient();

export default function LoginPageWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <LoginPage />
    </QueryClientProvider>
  );
}
