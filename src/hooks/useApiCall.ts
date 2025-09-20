import { Endpoint, type BackendResponse, type Message } from "../../types/type";
import { useSessionStore } from "../store/useSessionStore";
import { useErrorStore, AppError } from "../store/useErrorStore";

const addError = useErrorStore.getState().addError;

export function useApiCall() {
  const { sessionData, updateSession } = useSessionStore();

  async function sendMessage(message: Message): Promise<BackendResponse> {
    updateSession({ history: [...(sessionData.history || []), message] });

    const request = {
      ...sessionData,
      current_message: message.text,
    };

    const res = await fetch(Endpoint.SEND_MESSAGE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!res.ok) {
      addError(AppError.API_TIMEOUT);
    }

    const assistantResponse: BackendResponse = await res.json();
    return assistantResponse;
  }

  return { sendMessage };
}
