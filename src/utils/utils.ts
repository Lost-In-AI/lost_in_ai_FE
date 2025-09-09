// funzioni di utility tipo questa
export function UpperCase(text: string) {
  if (!text || text.trim().length === 0) return "";
  const trimmed = text.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function generateSessionID() {
  return "session-" + Math.random().toString(36).slice(2, 9);
}

export function formatTimestap(timestamp?: string) {
  if (!timestamp) return null;
  return new Date(timestamp).toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// funzione del modulo per generare una durata casuale tra 5 e 10 secondi
export function randomDurationSec() {
  return Math.floor(5 + Math.random() * 6);
}
