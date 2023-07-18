"use client";

import React, { useEffect, useState } from "react";
import { StaffUser } from "@prisma/client";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";

// I've given up on using apollo client with nextjs. It's just too much of a hell for no reason.
// It's not worth it and i'm not getting paid so fuck this shit i'm out with fetch.

const URL = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL!;
// noinspection GraphQLUnresolvedReference
const queryDoc = gql`
  query GetStaffUser($id: String!) {
    getStaffUser(id: $id) {
      level
      username
      securityQuestion
      id
    }
  }
`;

// noinspection GraphQLUnresolvedReference
const mutationDoc = gql`
  mutation Login($password: String!, $id: String!) {
    c2NeurocLogin(password: $password, id: $id) {
      id
    }
  }
`;

function LoginPage() {
  const loginMutation = useMutation({
    mutationFn: (args: { id: string; password: string }) => {
      return request(URL, mutationDoc, args);
    },
  });

  const {
    data: queryData,
    isLoading: queryLoading,
    isError: queryError,
    refetch: getData,
  } = useQuery<{ getStaffUser: StaffUser }>({
    queryKey: ["user"],
    queryFn: async () => request(URL, queryDoc, { id: window.navigator.userAgent }),
  });

  const handleNeurotapEvent = async (e: any) => {
    // Interaction with the device API
    const neurotapApi = e.api;
    const encodedMindReader = neurotapApi.initialize();

    let encodedWord = await encodedMindReader.readNextEncodedThought();
    if (encodedWord) {
      loginMutation.mutate({
        password: encodedWord,
        id: window.navigator.userAgent,
      });
    }
  };

  useEffect(() => {
    console.log("queryData", queryData);
    console.log("mutation: ", loginMutation.data);
  }, [queryData, loginMutation]);

  useEffect(() => {
    console.log(
      "process.env.NEXT_PUBLIC_GRAPHQL_URL",
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL
    );
    window.addEventListener("neurotap-inserted", handleNeurotapEvent);

    // Detach event listener on cleanup
    return () => {
      window.removeEventListener("neurotap-inserted", handleNeurotapEvent);
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
