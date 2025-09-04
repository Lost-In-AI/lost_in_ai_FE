// mock dati da utilizzare

export type ChatStage =
  | "greetings"
  | "confused"
  | "useless"
  | "operators"
  | "errors"
  | "stalling"
  | "offline"
  | "rate_limit"
  | "long";

export interface ChatMessage {
  from: "user" | "bot";
  text: string;
}

export interface ChatbotResponses {
  greetings: string[];
  confused: string[];
  useless: string[];
  operators: string[];
  errors: string[];
  errors_offline?: string[];
  errors_rate_limit?: string[];
  stalling: string[];
  longMessages: string[];
  conversations: ChatMessage[][];
}

// Fallback inline (in caso di fetch fallito)
const fallbackData: ChatbotResponses = {
  greetings: ["Ciao! Come posso aiutarti?", "Salve! Sono qui per assisterti", "Buongiorno! Di cosa hai bisogno?"],
  confused: [
    "Non ho capito bene...",
    "Potresti riformulare?",
    "Mmm, non sono sicuro di aver compreso",
    "Scusa ma non ti seguo",
  ],
  useless: [
    "Interessante domanda...",
    "Ci sto pensando...",
    "È una bella giornata oggi, vero?",
    "Hai mai provato a spegnere e riaccendere?",
    "Il mio collega robot sa rispondere meglio",
  ],
  operators: ["Adesso ti passo l'operatore...", "Non lo so, chiedi a qualcun altro"],
  errors: ["Ops, qualcosa è andato storto", "Sistema temporaneamente non disponibile", "Riprova tra 5 minuti"],
  errors_offline: [
    "Il sistema è offline al momento. Riprova più tardi.",
    "Connessione al server persa. Stiamo tentando di riconnetterci.",
  ],
  errors_rate_limit: [
    "Hai superato il limite di richieste. Attendi prima di riprovare.",
    "Troppe richieste ravvicinate, riprova tra poco.",
  ],
  stalling: ["Dammi un secondo...", "Sto controllando...", "Lasciami verificare...", "Un momento, per favore..."],
  longMessages: [
    "Grazie per averci contattato. Stiamo analizzando la tua richiesta con la massima attenzione. Nel frattempo, ti ricordiamo che i tempi di attesa potrebbero variare a seconda del volume di richieste in corso. Se desideri parlare con un operatore, rimani in linea, faremo il possibile per metterti in contatto con il primo agente disponibile. Ti preghiamo di non chiudere questa chat per non perdere la priorità acquisita.",
    "Stiamo verificando i dettagli del tuo account e controllando la tua pratica all'interno del nostro sistema. Questo processo può richiedere alcuni minuti. Ti ringraziamo per la pazienza. Se dovessimo riscontrare anomalie, ti informeremo immediatamente con ulteriori istruzioni per procedere. Nel frattempo, non esitare a inviare ulteriori dettagli se pensi possano essere utili alla risoluzione.",
  ],
  conversations: [
    [
      { from: "user", text: "Ciao, mi aiuti con la bolletta?" },
      { from: "bot", text: "Certamente! Prima però ho bisogno del tuo codice cliente." },
      { from: "user", text: "È 12345." },
      { from: "bot", text: "Grazie! Verifico... potrebbe volerci un momento." },
      { from: "bot", text: "Ops, sistema non disponibile. Riprova tra 5 minuti." },
    ],
    [
      { from: "user", text: "Vorrei parlare con un operatore." },
      { from: "bot", text: "Adesso ti passo l'operatore..." },
      { from: "bot", text: "L'operatore è occupato. Resto in attesa con te." },
      { from: "bot", text: "Mmm, non sono sicuro di aver compreso" },
    ],
    [
      { from: "user", text: "Non funziona la mia connessione." },
      { from: "bot", text: "Capito. Sto effettuando dei controlli sulla linea..." },
      { from: "bot", text: "Dammi un secondo..." },
      { from: "bot", text: "Troppe richieste ravvicinate, riprova tra poco." },
    ],
  ],
};

let cache: ChatbotResponses | null = null;

async function loadResponses(): Promise<ChatbotResponses> {
  if (cache) return cache;
  try {
    const res = await fetch("/mock/chatbot_responses.json", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load mock responses");
    const data = (await res.json()) as ChatbotResponses;
    cache = data;
    return data;
  } catch {
    cache = fallbackData;
    return fallbackData;
  }
}

function randomPick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Ritorna una risposta randomica per stage (greetings, confused, etc.)
 * preferLong: forza il ritorno di un messaggio “lungo” per test di scrolling.
 */
export async function getRandomResponse(stage: ChatStage, opts?: { preferLong?: boolean }): Promise<string> {
  const data = await loadResponses();

  if (opts?.preferLong && data.longMessages?.length) {
    return randomPick(data.longMessages);
  }

  switch (stage) {
    case "offline":
      return randomPick(data.errors_offline?.length ? data.errors_offline : data.errors);
    case "rate_limit":
      return randomPick(data.errors_rate_limit?.length ? data.errors_rate_limit : data.errors);
    case "long":
      return randomPick(data.longMessages?.length ? data.longMessages : data.stalling);
    case "greetings":
      return randomPick(data.greetings);
    case "confused":
      return randomPick(data.confused);
    case "useless":
      return randomPick(data.useless);
    case "operators":
      return randomPick(data.operators);
    case "errors":
      return randomPick(data.errors);
    case "stalling":
      return randomPick(data.stalling);
    default:
      return randomPick(data.useless);
  }
}

/**
 * Ritorna una conversazione multi-turno randomica (array di messaggi).
 */
export async function getRandomConversation(): Promise<ChatMessage[]> {
  const data = await loadResponses();
  if (!data.conversations || data.conversations.length === 0) return [];
  return randomPick(data.conversations);
}
