"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import commitmentDeco from "@/assets/svg/commitment-decoration.svg";
import logo from "@/assets/svg/ecorp-logo-dark.svg";
import serverStatDeco from "@/assets/svg/server-status-decoration.svg";
import { extractIdFromUserAgent } from "@/prisma/seed.utils";
import { faker } from "@faker-js/faker";
import { Client, StaffUser } from "@prisma/client";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { useMount } from "react-use";

import { cn } from "@/lib/utils";
import Button from "@/components/buttons/button";
import { Line } from "@/components/decorations/line";
import { Input } from "@/components/inputs/input";
import { H1 } from "@/components/typography";
import { ClientPreview } from "@/app/(c2)/c2/panel/dashboard/components/ClientPreview";
import { MassCtrl } from "@/app/(c2)/c2/panel/dashboard/components/MassCtrl";
import { NewsPanel } from "@/app/(c2)/c2/panel/dashboard/components/NewsPanel";
import { SymmetricPanel } from "@/app/(c2)/c2/panel/dashboard/components/SymmetricPanel";
import { VIPSearch } from "@/app/(c2)/c2/panel/dashboard/components/VIPSearch";
import {
    _DevSetLevelDoc,
    DeleteStaffDoc,
    GetClientsDoc,
    GetStaffUserDoc,
} from "@/app/(c2)/c2/panel/gql-docs";

import Modal from "./components/Modal";
import BackgroundDecoration from "./components/BackgroundDecoration";
import C2Scene from "@/components/3d/C2Scene";

const Clock = dynamic(() => import("./components/Clock"), { ssr: false });
interface DashboardProps {}

const URL = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL!;

interface NavElementProps extends React.HTMLAttributes<HTMLDivElement> {}

const NavElement = ({ children, className, ...props }: NavElementProps) => (
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

const DiagonalStripesDecoration = () => <div className="stripes-decor h-8 w-24" />;

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
            request(URL, GetStaffUserDoc, {
                id: extractIdFromUserAgent(window.navigator.userAgent),
            }),
    });

    const [randomData, setRandomData] = useState({} as any);

    useMount(() => {
        setRandomData({
            currActive: faker.number.int({ min: 420666, max: 421000 }).toLocaleString("en-US"),
            overallDeceased: faker.number.int({ min: 420666, max: 421000 }).toLocaleString("en-US"),
            politicallyActive: faker.number
                .int({ min: 420666, max: 421000 })
                .toLocaleString("en-US"),
            pregnant: faker.number.int({ min: 5000, max: 15000 }).toLocaleString("en-US"),
            avgPoliticalPref: faker.helpers.arrayElement([
                "Liberal",
                "Conservative",
                "Neutral",
                "Centrist",
                "Socialist",
                "Communist",
                "Libertarian",
                "Anarchist",
            ]),
            avgSusceptibility: faker.helpers.arrayElement(["Low", "Medium", "High", "Very High"]),
            followers: faker.number.int({ min: 420666, max: 421000 }).toLocaleString("en-US"),
            emotionalIdx: faker.number.int({ min: 0, max: 10 }),
            cognitiveDissonance: faker.number.float({ min: 0, max: 100, precision: 2 }),
            disinformationAmplifier: faker.number.int({ min: 0, max: 10 }),
            alignmentIdx: faker.number.float({ min: 0, max: 1, precision: 3 }),
            dissentSuppressionRate: faker.number.float({ min: 0, max: 100, precision: 2 }),
            subliminalInfluence: faker.number.float({ min: 0, max: 100, precision: 2 }),
            neurotapInfectionRate: faker.number.float({ min: 0.0, max: 1.0, precision: 2 }),
        });
    });

    const deleteMutation = useMutation({
        mutationFn: (args: { i: string }) => {
            return request(URL, DeleteStaffDoc, args);
        },
    });

    const _devSetLvlMutation = useMutation({
        mutationFn: (args: { i: string; l: number }) => {
            return request(URL, _DevSetLevelDoc, args);
        },
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
        queryFn: async () => request(URL, GetClientsDoc),
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
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.5",
                "Accept-Encoding": "gzip, deflate, br",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
            },
        });
    };

    const onSetLvl = () => {
        const id = prompt("Enter staff user id to change");
        if (!id) return;
        const lvl = Number(prompt("Enter new level"));

        if (typeof lvl === "number") _devSetLvlMutation.mutate({ i: id, l: lvl });
    };

    const onSetPerms = () => {
        alert("WIP");
    };

    const onAddNew = () => {
        alert("WIP");
    };

    const onDelete = () => {
        const id = prompt("Enter staff user id to delete");
        if (id) deleteMutation.mutate({ i: id });
    };
    

    return (
        <div className="relative grid h-screen grid-cols-2 items-start gap-8 bg-background-dark px-14 py-8 text-background-light 3xl:flex 3xl:justify-between">
            <Head>
                <title>E-Corp C2 Dashboard</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BackgroundDecoration />

            <section className="relative flex h-full w-full flex-col content-between justify-between">
            <C2Scene />
                <nav className="mb-8 flex items-center">
                    <NavElement>
                        <Clock />
                    </NavElement>
                    <Line o="bottom" className="mx-2 h-1 w-8" light isBg={false} />
                    <NavElement>Q3</NavElement>
                    <Line o="bottom" className="mx-2 h-1 w-4" light isBg={false} />
                    <NavElement>03/12/2030</NavElement>
                    <Line o="bottom" className="mx-2 h-1 w-10" light isBg={false} />
                    <NavElement>
                        LVL {adminMode ? 0 : 1}&nbsp;&nbsp;
                        <small className="font-normal">(&nbsp;{adminMode ? "ADMIN" : "VIEW ONLY"}&nbsp;)</small>
                    </NavElement>
                </nav>
                {adminMode && (
                    <SymmetricPanel
                        title="GLOBAL ADMIN PANEL (WIP)"
                        className="mb-8 h-auto w-max px-3 pb-4"
                    >
                        <div className="flex">
                            <div className="flex flex-col items-end">
                                <span className="mb-3 mt-1 text-xs text-neutral-500">SYSTEM</span>
                                <DiagonalStripesDecoration />
                            </div>
                            <div className="mx-4 grid grid-cols-2 grid-rows-2 gap-3">
                                <Button size="sm" onClick={onSetLvl}>
                                    SET LVL
                                </Button>
                                <Button size="sm" onClick={onAddNew}>
                                    ADD NEW
                                </Button>
                                <Button size="sm" onClick={onSetPerms}>
                                    PERMS
                                </Button>
                                <Button destructive size="sm" onClick={onDelete}>
                                    DELETE
                                </Button>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="mb-3 mt-1 text-xs text-neutral-500">STAFF</span>
                                <DiagonalStripesDecoration />
                            </div>
                            <div className="ml-4 grid grid-rows-2 gap-3">
                                <Button size="sm" onClick={() => {}}>
                                    CONFIG
                                </Button>
                                <Button destructive size="sm" onClick={panic}>
                                    PANIC
                                </Button>
                            </div>
                        </div>
                    </SymmetricPanel>
                )}
                <VIPSearch
                    title="VIP CLIENT SEARCH"
                    className="mb-8 mt-[-1rem] h-max w-full text-neutral-500 3xl:w-max"
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
                            <MagnifyingGlass />
                        </div>
                    </Input>
                    <div className="mt-4 flex px-4">
                        <div className="flex gap-4">
                            <span className="mt-1 text-xs text-neutral-500">FILTERS</span>
                            <div className="flex max-w-xs flex-wrap gap-3">
                                {filters.map((f) => (
                                    <button
                                        key={f}
                                        onClick={() => alert("wip")}
                                        className="rounded-md bg-white px-4 py-1 text-xs uppercase text-background-dark hover:opacity-70"
                                    >
                                        {f}
                                    </button>
                                ))}
                                <button
                                    onClick={() => alert("wip")}
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
                                    onClick={() => alert("wip")}
                                    className="rounded-md bg-white px-4 py-1 text-xs uppercase text-background-dark hover:opacity-70"
                                >
                                    {orderBy}
                                </button>
                            </div>
                        </div>
                    </div>

                    {isLoading ? (
                        <p className="h-[28vh] mt-8">Loading...</p>
                    ) : isError ? (
                        <p className="text-red-500">Error fetching data.</p>
                    ) : (
                        <div className="mr-[-3rem] mt-8 overflow-hidden">
                            <div className="relative flex max-h-[28vh] flex-col gap-3 overflow-y-scroll">
                                {clientsData.getClientsList.map((client) => (
                                    <ClientPreview clientData={client} key={client.id} />
                                ))}
                            </div>
                        </div>
                    )}
                    <h3 className="mt-4 text-md font-bold tracking-display text-background-dark">
                        STATS
                    </h3>
                    <div className="mb-6 grid grid-cols-2">
                        <div className="grid grid-cols-2 grid-rows-3 text-xs text-neutral-400">
                            <b>OVERALL DECEASED: </b>
                            <span>{randomData.overallDeceased}</span>
                            <b>POLITICALLY ACTIVE: </b>
                            <span>{randomData.politicallyActive}</span>
                            <b>PREGNANT: </b>
                            <span>{randomData.pregnant}</span>
                        </div>
                        <div className="relative grid grid-cols-2 grid-rows-3 items-start text-xs text-neutral-400">
                            <b>AVG. POLITICAL PREF.: </b>
                            <span>{randomData.avgPoliticalPref}</span>
                            <b>AVG. SUSCEPTIBILITY: </b>
                            <span>{randomData.avgSusceptibility}</span>
                            <Line className="z-10" o="bottom" dark />
                        </div>
                    </div>
                </VIPSearch>
                <NewsPanel o="left" />
            </section>

            <header className="pointer-events-none fixed left-0 flex h-screen w-screen justify-center text-2xl">
                <div className="flex flex-col place-items-center justify-start">
                    <div className="relative mt-[-1.3rem] h-24 w-24">
                        <Image className="" src={logo} alt="logo" fill />
                    </div>
                    <H1 small className="neon--white text-background-light">
                        NEUROC
                    </H1>
                    <small className="text-center text-xs font-bold text-[#AAAAAA]">
                        COMMAND TO CONTROL — ACCESS LEVEL: {staffUserData?.getStaffUser?.level}
                    </small>
                </div>
            </header>

            <section className="flex h-full w-full flex-col content-between items-end justify-between">
                <div className="mb-8 flex gap-4">
                    <NavElement className="">
                        CURR ACTIVE CLIENTS: {randomData.currActive}
                    </NavElement>
                    <SymmetricPanel
                        title="AUTH. SERVERS STATUS"
                        className="mt-3 h-auto w-max px-4 pb-6 text-neutral-500"
                    >
                        <div className="relative mb-4 h-40 w-full">
                            <Image className="" src={serverStatDeco} alt="serverStatDeco" fill />
                        </div>
                        <div className="flex items-center justify-center gap-3">
                            <small className="text-xs">+ 24% / YESTERDAY </small>
                            <small> | </small>
                            <small className="text-xs"> 24/12/2030 SERVER MAINTENANCE</small>
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
                <div className="relative mb-8 w-[31.7rem]">
                    <MassCtrl randomData={randomData} />
                    <SymmetricPanel title="COMMITMENT" className="absolute right-4 top-5 pt-0">
                        <div className="relative m-4 mb-3 h-36 w-36">
                            <Image className="" src={commitmentDeco} alt="commitmentDeco" fill />
                        </div>
                    </SymmetricPanel>
                </div>

                <NewsPanel o="right" className="" />
            </section>

            {selectedClient && (
                <Modal isOpen={true} onClose={handleCloseModal} client={selectedClient} />
            )}
        </div>
    );
}

const MagnifyingGlass = () => (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="5" cy="5" r="4.5" stroke="#181818" />
        <rect x="9" y="6" width="8" height="2" transform="rotate(30 9 6)" fill="#181818" />
    </svg>
);

const queryClient = new QueryClient();

export default function DashboardPageWrapper() {
    return (
        <QueryClientProvider client={queryClient}>
            <Dashboard />
        </QueryClientProvider>
    );
}
