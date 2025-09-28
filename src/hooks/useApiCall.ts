import { Endpoint, type BackendResponse, type Message } from "../../types/type";
import { useSessionStore } from "../store/useSessionStore";
import { useErrorStore, AppError } from "../store/useErrorStore";
import useAuthenticatedFetch from "./useAuthenticatedFetch";

const addError = useErrorStore.getState().addError;

export function useApiCall() {
  const { sessionData, updateSession } = useSessionStore();
  const { authenticatedFetch } = useAuthenticatedFetch();

  async function getSession(session_id?: string) {
    console.log(`GET request - session_id: ${session_id}`);
    const res = await fetch(`${Endpoint.GET_SESSION}${session_id && `?session_id=${session_id}`}`, {
      method: "GET",
    });
    if (!res.ok) {
      addError(AppError.API_TIMEOUT);
    }
    const getResponse: Promise<BackendResponse> = await res.json();
    return getResponse;
  }

  async function sendMessage(message: Message, abortSignal?: AbortSignal): Promise<BackendResponse> {
    updateSession({ history: [...(sessionData.history || []), message] });
    const request = {
      ...sessionData,
      current_message: message.text,
    };
    const res = await authenticatedFetch(Endpoint.SEND_MESSAGE, {
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

  async function patchSession(session_id: string, history: Array<Message>) {
    console.log(`PATCH request - session_id: ${session_id} | history: ${history}`);
    // const request: Partial<BackendResponse> = {
    //   session_id: session_id,
    //   history: history,
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
    // const patchResponse: Promise<BackendResponse> = await res.json();
    // return patchResponse;
  }

  return { getSession, sendMessage, patchSession };
}
