import { ref, onUnmounted } from "vue";

export function useWebSocket(url) {
  const socket = ref(null);
  const messages = ref(null);
  const isConnected = ref(false);

  const connect = () => {
    socket.value = new WebSocket(url);

    socket.value.onopen = () => {
      isConnected.value = true;
      console.log("WebSocket connected");
    };

    socket.value.onmessage = (event) => {
      messages.value = JSON.parse(event.data);
      console.log("WebSocket message", messages);
    };

    socket.value.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.value.onclose = () => {
      isConnected.value = false;
      console.log("WebSocket disconnected");
    };
  };

  const send = (data) => {
    if (socket.value && isConnected.value) {
      socket.value.send(JSON.stringify(data));
    }
  };

  const disconnect = () => {
    socket.value?.close();
  };

  onUnmounted(() => {
    disconnect();
  });

  return {
    connect,
    send,
    disconnect,
    messages,
    socket,
    isConnected,
  };
}
