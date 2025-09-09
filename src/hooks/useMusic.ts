import { useState } from "react";

/**
 * AudioContext e sorgente condivisi a livello di modulo.
 */
let audioContext: AudioContext | null = null;
let audioSource: AudioBufferSourceNode | null = null;

type AudioContextConstructor = new (contextOptions?: AudioContextOptions) => AudioContext;

// Interfaccia per tipizzare globalThis con le proprietà AudioContext
interface GlobalWithAudioContext {
  AudioContext?: AudioContextConstructor;
  webkitAudioContext?: AudioContextConstructor;
}

/**
 * Hook semplice per gestire musica di attesa con Web Audio API.
 */
export function useMusic(defaultDurationSec?: number) {
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * Inizializza l'AudioContext se non esiste
   */
  function initAudioContext() {
    if (!audioContext) {
      const globalWithAudio = globalThis as unknown as GlobalWithAudioContext;
      const AudioContextCtor = (globalWithAudio.AudioContext ||
        globalWithAudio.webkitAudioContext) as AudioContextConstructor;
      audioContext = new AudioContextCtor();
    }
    return audioContext;
  }

  /**
   * Avvia la musica
   */
  async function play(src: string, durationSec?: number) {
    // Se c'è una sorgente in corso, fermala
    if (audioSource) {
      audioSource.onended = null;
      audioSource.stop(0);
      audioSource.disconnect();
      audioSource = null;
    }

    try {
      // Usa o crea l'AudioContext condiviso
      const context = initAudioContext();

      // In caso il context sia sospeso, riprende
      if (context.state === "suspended") {
        await context.resume();
      }

      // Carica e decodifica l'audio
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await context.decodeAudioData(arrayBuffer);

      // Crea la sorgente, la collega e la mette in loop
      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;
      source.connect(context.destination);
      source.onended = () => setIsPlaying(false);

      audioSource = source;

      // Avvio
      source.start(0);
      setIsPlaying(true);

      // Programma auto-stop solo se è stata passata una durata
      const timeSec = durationSec || defaultDurationSec;
      if (timeSec && timeSec > 0) {
        const current = audioSource;
        window.setTimeout(() => {
          if (audioSource === current) {
            stop();
          }
        }, timeSec * 1000);
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error("Errore durante il play:", err);
      stop();
    }
  }

  /**
   * Mette in pausa la riproduzione sospendendo l'AudioContext.
   */
  async function pause() {
    if (audioContext && audioContext.state === "running") {
      try {
        await audioContext.suspend();
        setIsPlaying(false);
      } catch (err) {
        if (import.meta.env.DEV) console.debug(err);
      }
    }
  }

  /**
   * Riprende la riproduzione se c'è una sorgente attiva e l'AudioContext è sospeso.
   */
  async function resume() {
    if (audioContext && audioContext.state !== "running" && audioSource) {
      try {
        await audioContext.resume();
        setIsPlaying(true);
      } catch (err) {
        if (import.meta.env.DEV) console.debug(err);
      }
    }
  }

  /**
   * Ferma la riproduzione e rilascia la sorgente.
   */
  function stop() {
    if (audioSource) {
      try {
        audioSource.stop();
        audioSource.disconnect();
      } catch {
        // Ignora eventuali errori di stop/disconnect
      }
      audioSource = null;
    }
    setIsPlaying(false);
  }

  return {
    isPlaying,
    play,
    pause,
    resume,
    stop,
  };
}
