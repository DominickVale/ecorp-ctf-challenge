import React from "react";
import Image from "next/image";
import { Client } from "@prisma/client";

interface ClientPreviewProps {
  clientData: Client;
}

export function ClientPreview(props: ClientPreviewProps) {
  const { clientData } = props;
  const fullName = clientData.name + " " + clientData.surname;
  return (
    <div className="relative grid grid-cols-[theme(spacing.14)_1fr_1fr_1fr]">
      <div className="relative h-11 w-11">
        <Image
          className="rounded-xl grayscale filter transition-all duration-700 hover:grayscale-0"
          src={clientData.photo}
          alt={fullName}
          fill
        />
      </div>
      <div>
        <h4 className="text-smaller font-bold uppercase tracking-action">{fullName}</h4>
        <div className="grid grid-cols-2 grid-rows-2 text-xs text-neutral-400 w-32">
          <b>AGE: </b>
          <span>{clientData.age}</span>
          <b>GENDER: </b>
          <span>{clientData.gender}</span>
        </div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 text-xs text-neutral-400">
        <b>BANK$: </b>
        <span>{clientData.bank}</span>
        <b>FRIENDS: </b>
        <span>{clientData.friends}</span>
        <b>BANK$$: </b>
        <span>{clientData.bank}</span>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 text-xs text-neutral-400">
        <b>STATUS$: </b>
        <span>{clientData.status}</span>
        <b>HEALTHY: </b>
        <span>{clientData.healthy ? "YES" : "NO"}</span>
        <b>MOOD: </b>
        <span>{clientData.mood}</span>
      </div>
    </div>
  );
}
