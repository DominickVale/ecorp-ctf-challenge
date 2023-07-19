import React from "react";
import {Client} from "@prisma/client";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client
}

function Modal(props: ModalProps) {
  const { isOpen, onClose, client } = props;
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-70"></div>
          <div className="bg-gray-800 rounded p-8 z-10">
            <button
              className="absolute top-2 right-2 text-white text-xl cursor-pointer"
              onClick={onClose}
            >
              &times;
            </button>
            <p className="text-lg font-bold mb-4">
              {client.name} {client.surname}
            </p>
            <p>Age: {client.age}</p>
            <p>Heart Rate: {client.heartrate}</p>
            <p>O2 Level: {client.o2}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
