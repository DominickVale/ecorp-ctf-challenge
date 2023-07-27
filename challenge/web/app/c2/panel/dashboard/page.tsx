"use client";

import React, {useEffect, useState} from "react";
import Head from "next/head";
import {Client, StaffUser} from "@prisma/client";
import {QueryClient, QueryClientProvider, useMutation, useQuery} from "@tanstack/react-query";
import request, { gql } from "graphql-request";

import Modal from "./components/Modal";
import { GetStaffUserDoc, LoginDoc} from "@/app/c2/panel/gql-docs";
import Button from "@/components/buttons/button";
import {extractIdFromUserAgent} from "@/prisma/seed.utils";

interface DashboardProps {}

const URL = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL!;
// noinspection GraphQLUnresolvedReference
const getClientsDoc = gql`
  query GetClientsList {
    getClientsList {
      age
      heartrate
      id
      name
      o2
      surname
    }
  }
`;

function Dashboard(props: DashboardProps) {

  const {
    data: staffUserData,
    isLoading: queryLoading,
    isError: queryError,
    refetch: getData,
  } = useQuery<{ getStaffUser: StaffUser }>({
    queryKey: ["user"],
    retry: 1,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
    queryFn: async () => request(URL, GetStaffUserDoc, { id: extractIdFromUserAgent(window.navigator.userAgent) }),
  });

  const [adminMode, setAdminMode] = useState(staffUserData?.getStaffUser?.level === 0);

  console.log("adminMode", adminMode, "level: ", staffUserData?.getStaffUser?.level)
  useEffect(() => {
    setAdminMode(staffUserData?.getStaffUser?.level === 0);
  }, [staffUserData?.getStaffUser?.level])

  const { data: clientsData, isLoading, isError, refetch } = useQuery<{ getClientsList: Client[] }>({
    queryKey: ["clients"],
    queryFn: async () => request(URL, getClientsDoc),
  });
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleClientClick = (client: Client) => {
    setSelectedClient(client);
  };

  const handleCloseModal = () => {
    setSelectedClient(null);
  };

  const panic = async () => {
    await fetch(`/api/v1/dev/panic`, {
      method: "POST",
      credentials: "same-origin",
      mode: "same-origin",
      cache: "no-cache",
      referrerPolicy: "origin",
      headers: {
        "Content-Type": "application/json",
        "Host": "localhost:3000",
        "User-Agent": "NEUROTAP-v0.2-BEG!---32FM01102030H1F2959294214553233!---",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate, br",
        "Referer": "http://localhost:3000/c2/panel/dashboard",
        "Connection": "keep-alive",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-origin"
      },
    });
  }

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <Head>
        <title>Futuristic Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="text-2xl mb-8">Evil Corporation C2 Dashboard</header>

      <h2>ACCESS LEVEL: {staffUserData?.getStaffUser?.level}</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Error fetching data.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clientsData.getClientsList.map((client) => (
            <div
              key={client.id}
              className="bg-gray-800 rounded p-4 cursor-pointer"
              onClick={() => handleClientClick(client)}
            >
              <p className="text-lg font-bold">
                {client.name} {client.surname}
              </p>
              <p>Age: {client.age}</p>
              <p>Heart Rate: {client.heartrate}</p>
              <p>O2 Level: {client.o2}</p>
            </div>
          ))}
        </div>
      )}
      {adminMode && (
          <section>
            <Button onClick={panic}>PANIC</Button>
            <Button onClick={() => alert("WIP: migration registerNewStaff to graphql arch, ETA: low priority ~ Q4")}>Register new staff</Button>
            <Button onClick={() => alert("WIP: migration tmpSetStaffLevel to graphql arch, ETA: 1 week")}>Set staff level</Button>
            <Button>Delete staff user </Button>
            <Button>UNSAFE SHUT DOWN ALL NEUROTAPS</Button>
          </section>
      )}
      {selectedClient && <Modal isOpen={true} onClose={handleCloseModal} client={selectedClient} />}
    </div>
  );
}

const queryClient = new QueryClient();

export default function DashboardPageWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}
