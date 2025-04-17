"use-client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Conversation } from "../shared";

const URL = process.env.NEXT_PUBLIC_BASE_URL;

export const MESSAGE_EVENT = "message";
export const CONNECTION_EVENT = "connection";
export const DISCONNECTION_EVENT = "disconnection";
export const SENT_MESSAGE_EVENT = "sent_message";
export const JOIN_ROOM_EVENT = "join_room";
export const LEAVE_ROOM_EVENT = "leave_room";

export const socket = io(URL, {
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  autoConnect: true,
  timeout: 10000,
});

export function useSocket() {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  useEffect(() => {
    function handleConnect() {
      setIsConnected(true);
    }

    function handleDisconnect() {
      setIsConnected(false);
    }

    function onError() {
      setIsConnected(false);
    }

    socket.on(CONNECTION_EVENT, handleConnect);
    socket.on(DISCONNECTION_EVENT, handleDisconnect);
    socket.on("connect_error", onError);

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off(CONNECTION_EVENT, handleConnect);
      socket.off(DISCONNECTION_EVENT, handleDisconnect);
      socket.off("connect_error", onError);
    };
  }, []);

  return {
    socket,
    isConnected,
  };
}

export function joinRoom(conversation: Conversation) {
  socket.emit(
    JOIN_ROOM_EVENT,
    conversation,
    ({ message }: { message: string }) => {
      console.log(`${JOIN_ROOM_EVENT} callback: ${message}`);
    }
  );
}
