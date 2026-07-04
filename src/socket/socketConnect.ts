import { io } from "socket.io-client";

export const socket = io("https://go-place.cenedypalma.com", {
  autoConnect: false,
  withCredentials: true,
  transports: ["websocket"],
});