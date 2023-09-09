"use client";

import {useEffect, useState} from "react";
import Head from "next/head";
import Image from "next/image";
import commitmentDeco from "@/assets/svg/commitment-decoration.svg";
import logo from "@/assets/svg/ecorp-logo-dark.svg";
import serverStatDeco from "@/assets/svg/server-status-decoration.svg";
import {extractIdFromUserAgent} from "@/prisma/seed.utils";
import {Client, StaffUser} from "@prisma/client";
import {QueryClient, QueryClientProvider, useMutation, useQuery} from "@tanstack/react-query";
import request, {gql} from "graphql-request";

import {cn} from "@/lib/utils";
import Button from "@/components/buttons/button";
import {Line} from "@/components/decorations/line";
import {Input} from "@/components/inputs/input";
import {H1} from "@/components/typography";
import {ClientPreview} from "@/app/(c2)/c2/panel/dashboard/components/ClientPreview";
import {MassCtrl} from "@/app/(c2)/c2/panel/dashboard/components/MassCtrl";
import {NewsPanel} from "@/app/(c2)/c2/panel/dashboard/components/NewsPanel";
import {SymmetricPanel} from "@/app/(c2)/c2/panel/dashboard/components/SymmetricPanel";
import {VIPSearch} from "@/app/(c2)/c2/panel/dashboard/components/VIPSearch";
import {getClientsDoc, GetStaffUserDoc, LoginDoc} from "@/app/(c2)/c2/panel/gql-docs";

import Modal from "./components/Modal";
import dynamic from "next/dynamic";

const Clock = dynamic(() => import('./components/Clock'), {ssr: false})
interface DashboardProps {
}

const URL = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL!;

interface NavElementProps extends React.HTMLAttributes<HTMLDivElement> {
}

const NavElement = ({children, className, ...props}: NavElementProps) => (
    <div
        className={cn(
            "mb-auto max-h-max rounded-lg bg-background-light p-1 px-4 text-center text-xs font-bold text-background-dark",
            className
        )}
        {...props}
    >
        {children}
    </div>
);

const DiagonalStripesDecoration = () => <div className="stripes-decor h-8 w-24"/>;


function Dashboard(props: DashboardProps) {
    const {
        data: staffUserData,
        isLoading: queryLoading,
        isError: queryError,
        refetch: getData,
    } = useQuery<{
        getStaffUser: StaffUser;
    }>({
        queryKey: ["user"],
        retry: 1,
        retryDelay: 1000,
        refetchOnWindowFocus: false,
        queryFn: async () =>
            request(URL, GetStaffUserDoc, {id: extractIdFromUserAgent(window.navigator.userAgent)}),
    });

    const [adminMode, setAdminMode] = useState(staffUserData?.getStaffUser?.level === 0);
    const [filters, setFilters] = useState(["healthy", "anarchist", "high iq", "bad mood"]);
    const [orderBy, setOrderBy] = useState("wealth");

    useEffect(() => {
        setAdminMode(staffUserData?.getStaffUser?.level === 0);
    }, [staffUserData?.getStaffUser?.level]);

    const {
        data: clientsData,
        isLoading,
        isError,
        refetch,
    } = useQuery<{
        getClientsList: Client[];
    }>({
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
                Host: "localhost:3000",
                "User-Agent": "NEUROTAP-v0.2-BEG!---32FM01102030H1F2959294214553233!---",
                Accept:
                    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate, br",
                Referer: "http://localhost:3000/c2/panel/dashboard",
                Connection: "keep-alive",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
            },
        });
    };

    return (
        <div
            className="relative grid h-screen grid-cols-2 items-start gap-8 bg-background-dark px-14 py-8 text-background-light 3xl:flex 3xl:justify-between">
            <Head>
                <title>Futuristic Dashboard</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <section className="relative flex w-full flex-col h-full justify-between content-between">
                <nav className="flex items-center mb-8">
                    <NavElement>
                        <Clock/>
                    </NavElement>
                    <Line o="bottom" className="mx-2 h-1 w-8" light isBg={false}/>
                    <NavElement>Q3</NavElement>
                    <Line o="bottom" className="mx-2 h-1 w-4" light isBg={false}/>
                    <NavElement>03/12/2030</NavElement>
                    <Line o="bottom" className="mx-2 h-1 w-10" light isBg={false}/>
                    <NavElement>
                        LVL 1&nbsp;&nbsp;<small className="font-normal">(&nbsp;VIEW ONLY&nbsp;)</small>
                    </NavElement>
                </nav>
                <SymmetricPanel title="GLOBAL ADMIN PANEL" className="h-auto w-max px-3 pb-4 mb-8">
                    <div className="flex">
                        <div className="flex flex-col items-end">
                            <span className="mb-3 mt-1 text-xs text-neutral-500">SYSTEM</span>
                            <DiagonalStripesDecoration/>
                        </div>
                        <div className="mx-4 grid grid-cols-2 grid-rows-2 gap-3">
                            <Button size="sm" onClick={() => {
                            }}>
                                SET LVL
                            </Button>
                            <Button size="sm" onClick={() => {
                            }}>
                                ADD NEW
                            </Button>
                            <Button size="sm" onClick={() => {
                            }}>
                                PERMS
                            </Button>
                            <Button destructive size="sm" onClick={() => {
                            }}>
                                DELETE
                            </Button>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="mb-3 mt-1 text-xs text-neutral-500">STAFF</span>
                            <DiagonalStripesDecoration/>
                        </div>
                        <div className="ml-4 grid grid-rows-2 gap-3">
                            <Button size="sm" onClick={() => {
                            }}>
                                CONFIG
                            </Button>
                            <Button destructive size="sm" onClick={() => {
                            }}>
                                PANIC
                            </Button>
                        </div>
                    </div>
                </SymmetricPanel>

                <VIPSearch
                    title="VIP CLIENT SEARCH"
                    className="mt-[-1rem] h-max w-full text-neutral-500 3xl:w-max mb-8"
                >
                    <Input
                        theme="light"
                        className="h-10"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name Surname"
                    >
                        <div className="absolute left-0 top-0 flex h-full w-10 items-center justify-center">
                            <MagnifyingGlass/>
                        </div>
                    </Input>
                    <div className="mt-4 flex px-4">
                        <div className="flex gap-4">
                            <span className="mt-1 text-xs text-neutral-500">FILTERS</span>
                            <div className="flex max-w-xs flex-wrap gap-3">
                                {filters.map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => alert("out of scope, sorry, didn't have time to do this :)")}
                                        className="rounded-md bg-white px-4 py-1 text-xs uppercase text-background-dark hover:opacity-70"
                                    >
                                        {f}
                                    </button>
                                ))}
                                <button
                                    onClick={() => alert("out of scope, sorry, didn't have time to do this :)")}
                                    className="rounded-md bg-white px-4 py-1 text-xs uppercase text-background-dark hover:opacity-70"
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <span className="mt-1 text-xs text-neutral-500">ORDER&nbsp;BY</span>
                            <div className="flex flex-wrap items-start gap-4">
                                <button
                                    onClick={() => alert("out of scope, sorry, didn't have time to do this :)")}
                                    className="rounded-md bg-white px-4 py-1 text-xs uppercase text-background-dark hover:opacity-70"
                                >
                                    {orderBy}
                                </button>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <p>Loading...</p>
                    ) : isError ? (
                        <p className="text-red-500">Error fetching data.</p>
                    ) : (
                        <div className="mr-[-3rem] mt-8 overflow-hidden">
                            <div className="relative flex max-h-[28vh] flex-col gap-3 overflow-y-scroll">
                                {clientsData.getClientsList.map((client) => (
                                    <ClientPreview clientData={client} key={client.id}/>
                                ))}
                            </div>
                        </div>
                    )}
                    <h3 className="mt-4 text-md font-bold tracking-display text-background-dark">STATS</h3>
                    <div className="mb-6 grid grid-cols-2">
                        <div className="grid grid-cols-2 grid-rows-3 text-xs text-neutral-400">
                            <b>OVERALL DECEASED: </b>
                            <span>42.945</span>
                            <b>POLITICALLY ACTIVE: </b>
                            <span>933</span>
                            <b>PREGNANT: </b>
                            <span>249</span>
                        </div>
                        <div className="relative grid grid-cols-2 grid-rows-3 items-start text-xs text-neutral-400">
                            <b>AVG. POLITICAL PREF.: </b>
                            <span>LIBERAL</span>
                            <b>AVG. SUSCEPTIBILITY: </b>
                            <span>HIGH</span>
                            <Line className="z-10" o="bottom" dark/>
                        </div>
                    </div>
                </VIPSearch>
                <NewsPanel o="left"/>
            </section>

            <header className="fixed left-0 flex h-screen w-screen justify-center text-2xl pointer-events-none">
                <div className="flex flex-col place-items-center justify-start">
                    <div className="relative mt-[-1.3rem] h-24 w-24">
                        <Image className="" src={logo} alt="logo" fill/>
                    </div>
                    <H1 small className="text-background-light">
                        NEUROC
                    </H1>
                    <small className="text-center text-xs font-bold text-[#AAAAAA]">
                        COMMAND TO CONTROL — ACCESS LEVEL: {staffUserData?.getStaffUser?.level}
                    </small>
                </div>
            </header>

            <section className="flex w-full flex-col items-end h-full justify-between content-between">
                <div className="flex gap-4 mb-8">
                    <NavElement className="">CURR ACTIVE CLIENTS: 420,666</NavElement>
                    <SymmetricPanel
                        title="AUTH. SERVERS STATUS"
                        className="mt-3 h-auto w-max px-4 pb-6 text-neutral-500"
                    >
                        <div className="relative mb-4 h-40 w-full">
                            <Image className="" src={serverStatDeco} alt="serverStatDeco" fill/>
                        </div>
                        <div className="flex items-center justify-center">
                            <small className="text-xs">+ 24% / YESTERDAY</small>
                            <small className="text-xs">24/12/2030 SERVER MAINTENANCE</small>
                        </div>
                        <div className="relative mt-4 w-full">
                            <Line
                                o="bottom"
                                isBg={false}
                                className="mx-auto h-[2px] w-[50%] bg-background-light"
                            />
                        </div>
                    </SymmetricPanel>
                </div>
                <div className="relative w-[31.7rem] mb-8">
                    <MassCtrl/>
                    <SymmetricPanel title="COMMITMENT" className="absolute right-4 top-5 pt-0">
                        <div className="relative m-4 mb-3 h-36 w-36">
                            <Image className="" src={commitmentDeco} alt="commitmentDeco" fill/>
                        </div>
                    </SymmetricPanel>
                </div>

                <NewsPanel o="right" className=""/>
            </section>

            {/*{isLoading ? (*/}
            {/*  <p>Loading...</p>*/}
            {/*) : isError ? (*/}
            {/*  <p>Error fetching data.</p>*/}
            {/*) : (*/}
            {/*  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">*/}
            {/*    {clientsData.getClientsList.map((client) => (*/}
            {/*      <div*/}
            {/*        key={client.id}*/}
            {/*        className="cursor-pointer rounded bg-gray-800 p-4"*/}
            {/*        onClick={() => handleClientClick(client)}*/}
            {/*      >*/}
            {/*        <p className="text-lg font-bold">*/}
            {/*          {client.name} {client.surname}*/}
            {/*        </p>*/}
            {/*        <p>Age: {client.age}</p>*/}
            {/*        <p>Heart Rate: {client.heartrate}</p>*/}
            {/*        <p>O2 Level: {client.o2}</p>*/}
            {/*      </div>*/}
            {/*    ))}*/}
            {/*  </div>*/}
            {/*)}*/}
            {/*{adminMode && (*/}
            {/*  <section>*/}
            {/*    <Button onClick={panic}>PANIC</Button>*/}
            {/*    <Button*/}
            {/*      onClick={() =>*/}
            {/*        alert("WIP: migration registerNewStaff to graphql arch, ETA: low priority ~ Q4")*/}
            {/*      }*/}
            {/*    >*/}
            {/*      Register new staff*/}
            {/*    </Button>*/}
            {/*    <Button*/}
            {/*      onClick={() => alert("WIP: migration tmpSetStaffLevel to graphql arch, ETA: 1 week")}*/}
            {/*    >*/}
            {/*      Set staff level*/}
            {/*    </Button>*/}
            {/*    <Button>Delete staff user </Button>*/}
            {/*    <Button>UNSAFE SHUT DOWN ALL NEUROTAPS</Button>*/}
            {/*  </section>*/}
            {/*)}*/}
            {selectedClient && <Modal isOpen={true} onClose={handleCloseModal} client={selectedClient}/>}
        </div>
    );
}


const MagnifyingGlass = () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="4.5" stroke="#181818"/>
        <rect x="9" y="6" width="8" height="2" transform="rotate(30 9 6)" fill="#181818"/>
    </svg>
);

const queryClient = new QueryClient();

export default function DashboardPageWrapper() {
    return (
        <QueryClientProvider client={queryClient}>
            <Dashboard/>
        </QueryClientProvider>
    );
}


