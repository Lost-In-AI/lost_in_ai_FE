import { useState, useEffect } from "react";
import type { SessionData } from "../../types/type";
import { generateSessionID } from "../utils/utils";

export default function useSessionStorage() {
  const [sessionData, setSessionData] = useState<SessionData>(() => {
    const storedData = sessionStorage.getItem("session"); // cerco session
    if (storedData) {
      //console.log("recupero");
      return JSON.parse(storedData);
    } else {
      //console.log("genero");
      return {
        sessionID: generateSessionID(),
      };
    }
  });
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem("session");
  });

  useEffect(() => {
    const loadMockData = async () => {
      if (sessionData) {
        try {
          console.log("fetch");
          const response = await fetch("/mocks/chatbot.json");
          if (!response.ok) {
            throw new Error(`Error has occured ${response.status}`);
          }
          const mockData: SessionData = await response.json();
          sessionStorage.setItem("session", JSON.stringify(mockData));
          setSessionData(mockData);
        } catch (error) {
          console.error("Failed to load mock data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadMockData();
  }, []);

  function saveToStorage(data: SessionData) {
    sessionStorage.setItem("session", JSON.stringify(data));
    setSessionData(data);
  }

  function updateSession(updates: Partial<SessionData>) {
    const updated = { ...sessionData, ...updates };
    saveToStorage(updated);
  }

  return { sessionData, updateSession, isLoading };
}
