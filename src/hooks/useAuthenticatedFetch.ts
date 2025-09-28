import { useAuth } from "@clerk/clerk-react";

export default function useAuthenticatedFetch() {
  const { getToken } = useAuth();

  async function authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    try {
      const token = await getToken();
      console.log(token);
      const defaultHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      };
      const headers = {
        ...defaultHeaders,
        ...options.headers,
      };
      return fetch(url, {
        ...options,
        headers,
      });
    } catch (error) {
      throw new Error(`Authentication failed: ${error}`);
    }
  }

  return { authenticatedFetch };
}
