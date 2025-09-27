import { Endpoint, type BackendResponse, type Message } from "../../types/type";
import { useSessionStore } from "../store/useSessionStore";
import { useErrorStore, AppError } from "../store/useErrorStore";

const addError = useErrorStore.getState().addError;

export function useApiCall() {
  const { sessionData, updateSession } = useSessionStore();

  async function sendMessage(message: Message, abortSignal?: AbortSignal): Promise<BackendResponse> {
    updateSession({ history: [...(sessionData.history || []), message] });
    const request = {
      ...sessionData,
      current_message: message.text,
    };
    const res = await fetch(Endpoint.SEND_MESSAGE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
      signal: abortSignal, // per stoppare la richiesta in caso la promise non fosse stata ancora risolta
    });
    if (!res.ok) {
      addError(AppError.API_TIMEOUT);
    }
    const assistantResponse: BackendResponse = await res.json();
    return assistantResponse;
  }

  async function sendPatch(): Promise<void> {
    console.log("PATCH!");
    // const request = {
    //   ...sessionData,
    // };
    // const res = await fetch(Endpoint.PATCH_SESSION, {
    //   method: "PATCH",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(request),
    // });

    // if (!res.ok) {
    //   addError(AppError.API_TIMEOUT);
    //   throw new Error(`HTTP error! status: ${res.status}`);
    // }
  }

  return { sendMessage, sendPatch };
}
