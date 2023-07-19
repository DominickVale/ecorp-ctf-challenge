"use client";

import React, {useEffect, useState} from "react";
import Head from "next/head";
import {Client, StaffUser} from "@prisma/client";
import {QueryClient, QueryClientProvider, useMutation, useQuery} from "@tanstack/react-query";
import request, { gql } from "graphql-request";

import Modal from "./components/Modal";
import { GetStaffUserDoc, LoginDoc} from "@/app/c2/panel/gql-docs";

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

export function Dashboard(props: DashboardProps) {

  const {
    data: staffUserData,
    isLoading: queryLoading,
    isError: queryError,
    refetch: getData,
  } = useQuery<{ getStaffUser: StaffUser }>({
    queryKey: ["user"],
    queryFn: async () => request(URL, GetStaffUserDoc, { id: window.navigator.userAgent }),
  });

  const [devMode, setDevMode] = useState(staffUserData?.getStaffUser?.level === -1 || true);

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

  const resetDbDev = async () => {
    await fetch(`/api/v1/dev/purge`, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ testApiKey: process.env.NEXT_PUBLIC_TEST_API_KEY! }),
    });
  }

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <Head>
        <title>Futuristic Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="text-2xl mb-8">Evil Corporation C2 Dashboard</header>

      <h2>ACCESS LEVEL: {devMode ? "DEV-TESTING" : staffUserData?.getStaffUser?.level}</h2>
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
      {devMode && (
          <section>
            <button onClick={resetDbDev}>Reset dev db</button>
            <button>Register new staff </button>
            <button>Delete staff user </button>
            <button>UNSAFE SHUT DOWN ALL NEUROTAPS</button>
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
