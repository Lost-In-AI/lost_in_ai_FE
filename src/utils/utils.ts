import { BotPersonalities, type Placeholders } from "../../types/type";

// funzioni di utility tipo questa
export function UpperCase(text: string) {
  if (!text || text.trim().length === 0) return "";
  const trimmed = text.trim();
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function formatTimestap(timestamp?: string) {
  if (!timestamp) return null;
  return new Date(timestamp).toLocaleTimeString("it-IT", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// funzione del modulo per generare una durata casuale tra 10 e 15 secondi
export function randomDurationMs() {
  return Math.floor(10 + Math.random() * 6) * 1000;
}
export function parsePrompt(prompt: string, placeHolders: Placeholders) {
  const matches = prompt.match(/{{(.*?)}}/g); // trova tutti i placeholder in caps dentro "{{...}}"
  if (!matches) return prompt;
  let result = prompt;
  for (const match of matches) {
    // per ogni match
    const key = match.slice(2, -2).trim(); // tolgo le parentesi
    if (key in placeHolders) {
      const replacement = placeHolders[key as keyof Placeholders];
      result = result.replace(match, replacement);
    }
  }
  return result; // ritorno il prompt pulito
}

export function getAssistantAvatar(personality?: BotPersonalities | undefined): { avatar: string; alt: string } {
  switch (personality) {
    case BotPersonalities.WITTY:
      return { avatar: "/assets/avatar/avatar-witty.png", alt: "Bot Witty" };
    case BotPersonalities.INEPT:
      return { avatar: "/assets/avatar/avatar-inept.png", alt: "Bot Inept" };
    default:
      return { avatar: "/assets/avatar/avatar-witty.png", alt: "Bot Witty" };
  }
}
