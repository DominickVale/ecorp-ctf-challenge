"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { extractIdFromUserAgent } from "@/prisma/seed.utils";
import { StaffUser } from "@prisma/client";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

import { GetStaffUserDoc, LoginDoc } from "@/app/c2/panel/gql-docs";

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
    <main>
      <h1 className="text-2xl leading-tight">NEUROC</h1>
      <small className="text-xs">LOG-IN SYSTEM</small>
      <p className="max-w-xl text-base font-light">
        With your Neurotap active, think of the answer to your security question:
      </p>
      <b className="text-base font-bold">{queryData?.getStaffUser.securityQuestion}</b>
      {process.env.NODE_ENV === "development" && (
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          onClick={() => {
            loginMutation.mutate({
              // prompt it
              p: prompt("Enter password") || "",
              i: extractIdFromUserAgent(window.navigator.userAgent),
            });
            router.push("/c2/panel/dashboard");
          }}
        >
          login test
        </button>
      )}
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
