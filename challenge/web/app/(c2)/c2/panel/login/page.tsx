"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import brainProto from "@/assets/images/brain-proto.jpg";
import { extractIdFromUserAgent } from "@/prisma/seed.utils";
import { StaffUser } from "@prisma/client";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import Typewriter from "typewriter-effect";

import Button from "@/components/buttons/button";
import { H1 } from "@/components/typography";
import { GetStaffUserDoc, LoginDoc } from "@/app/(c2)/c2/panel/gql-docs";
import LoginScene from "@/components/3d/LoginScene";

// I've given up on using apollo client with nextjs. It's just too much of a hell for no reason.
// It's not worth it and i'm not getting paid so fuck this shit i'm out with fetch.

const URL = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_URL!;

type LoginPageProps = {
    params: { debug: boolean };
};

function LoginPage(props: LoginPageProps) {
    const params = useSearchParams();

    const router = useRouter();
    const [showWarning, setShowWarning] = useState(false);
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
            request(URL, GetStaffUserDoc, {
                id: extractIdFromUserAgent(window.navigator.userAgent),
            }),
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
        <main className="flex h-screen w-full flex-col justify-between bg-background-dark px-[5vw] py-[5vh]">
                <LoginScene error={showWarning} />
            <section className="flex flex-col place-items-center justify-center z-30">
                <H1 className="neon--white">NEUROC</H1>
                <small className="text-xs text-neutral-400">LOG-IN SYSTEM</small>
                <p className="mb-8 mt-16 max-w-xl text-center text-md font-light">
                    With your Neurotap active, think of the answer to your security&nbsp;question:
                </p>
                <b className="text-center text-md font-bold uppercase text-white">
                    {queryData?.getStaffUser.securityQuestion}
                </b>
                {showWarning && (
                    <small className="mb-4 animate-pulse text-xs font-bold neon--red">
                        IF YOU'RE HAVING ISSUES, CONTACT LEVEL 0
                    </small>
                )}
                {/* <b className="text-center font-heading text-base leading-[1.18] tracking-display text-white"> */}
                {/*     {queryData?.getStaffUser.securityQuestion} */}
                {/* </b> */}
            </section>
            {params?.get("debug") && (
                <Button
                    className="fixed left-12 top-6 max-w-[5rem]"
                    theme="light"
                    size="sm"
                    onClick={() => {
                        const pass = prompt("Enter password") || "";
                        const id = extractIdFromUserAgent(window.navigator.userAgent);
                        loginMutation.mutate({
                            p: pass,
                            i: id,
                        });
                        router.push("/c2/panel/dashboard");
                    }}
                >
                    TEST LOGIN
                </Button>
            )}

            <section className="grid w-full grid-cols-3 place-items-end justify-between gap-3 text-neutral-400">
                <div className="flex min-h-[8rem] flex-col justify-end justify-self-start align-bottom">
                    <small className="text-xs">
                        <Typewriter
                            options={{ delay: 30, cursor: "" }}
                            onInit={(typewriter) => {
                                typewriter
                                    .typeString("CONNECTING TO NEUROTAP")
                                    .pauseFor(1000)
                                    .typeString(".")
                                    .pauseFor(800)
                                    .typeString(".")
                                    .pauseFor(600)
                                    .typeString(".")
                                    .start();
                            }}
                        />
                    </small>
                    <small className="text-xs">
                        <Typewriter
                            options={{ delay: 30, cursor: "" }}
                            onInit={(typewriter) => {
                                typewriter
                                    .pauseFor(4200)
                                    .typeString("FAILED, RETRYING")
                                    .pauseFor(1000)
                                    .typeString(".")
                                    .pauseFor(1000)
                                    .typeString(".")
                                    .pauseFor(1000)
                                    .typeString(".")
                                    .start();
                            }}
                        />
                    </small>
                    <small className="text-xs neon--red">
                        <Typewriter
                            options={{
                                delay: 1,
                                cursor: "",
                            }}
                            onInit={(typewriter) => {
                                typewriter
                                    .pauseFor(12000)
                                    .typeString("CLIENT_ERR: NEUROTAP DEVICE NOT RECOGNIZED<br/>")
                                    .pauseFor(200)
                                    .typeString(
                                        "\\\\&nbsp; &nbsp;COULD NOT INSTANTIATE REQUIRED MODULES: OCCIPITAL, PREFRONTAL, TEMPORAL.<br/>"
                                    )
                                    .pauseFor(200)
                                    .typeString("\\\\&nbsp; &nbsp;REQUIRED MODULES NOT UP.<br/>")
                                    .pauseFor(200)
                                    .typeString("\\\\&nbsp; &nbsp;GIVING UP.<span/>")
                                    .callFunction(() => {
                                        setShowWarning(true);
                                    })
                                    .start();
                            }}
                        />
                    </small>
                </div>
                <small className="justify-self-center text-xs">
                    IDENTIFIER {queryData?.getStaffUser.id} @ Level {queryData?.getStaffUser.level}{" "}
                    access
                </small>
                <small className="justify-self-end text-xs">
                    NEUROC LOG-IN SYSTEM v0.2 // AUGUST REVISION // Q3
                </small>
            </section>
        </main>
    );
}

const queryClient = new QueryClient();

export default function LoginPageWrapper(props: any) {
    return (
        <QueryClientProvider client={queryClient}>
            <LoginPage {...props} />
        </QueryClientProvider>
    );
}
