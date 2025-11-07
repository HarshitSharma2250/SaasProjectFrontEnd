import { io, Socket } from "socket.io-client";
import { useAuthStore } from "@/config/zustand/loginStore";

let socket: Socket | null = null;

export const connectSocket = (): void => {
  const { token, userId } = useAuthStore.getState();

  if (!token || !userId || socket) return; // Already connected or missing creds

  socket = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4500" || "https://saasprojectrivisionbackend.onrender.com", {
    query: { userId },
    transports: ["websocket"],
    autoConnect: true,
  });

  socket.on("connect", () => {
    console.log(" Socket connected with userId:", userId);
  });

  socket.on("disconnect", (reason) => {
    console.log("Socket disconnected:", reason);
  });

  // 💓 Heartbeat every 15 seconds
  setInterval(() => {
    if (socket?.connected) {
      socket.emit("heartbeat", { userId });
    }
  }, 15000);
};

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🔌 Socket manually disconnected");
  }
};
