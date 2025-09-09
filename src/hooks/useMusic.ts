import { useEffect, useState } from "react";

/**
 * AudioContext e sorgente condivisi a livello di modulo.
 */
let audioContext: AudioContext | null = null;
let audioSource: AudioBufferSourceNode | null = null;

type AudioContextConstructor = new (contextOptions?: AudioContextOptions) => AudioContext;

/**
 * Hook semplice per gestire musica di attesa con Web Audio API.
 */
export function useMusic(defaultDurationSec?: number) {
  // Stato che indica se la musica sta suonando
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * Avvia la musica
   */
  async function play(src: string, durationSec?: number) {
    // Se c'è una sorgente in corso, si può interrompere senza chiudere il context
    if (audioSource) {
      try {
        audioSource.onended = null;
        audioSource.stop(0);
        audioSource.disconnect();
      } catch {
        // ignora errori di stop/disconnect
      }
      audioSource = null;
    }

    try {
      // Crea un AudioContext compatibile anche con Safari (webkitAudioContext)
      const g = globalThis as unknown as {
        AudioContext?: AudioContextConstructor;
        webkitAudioContext?: AudioContextConstructor;
      };
      const Ctx = g.AudioContext ?? g.webkitAudioContext;
      if (!Ctx) {
        if (import.meta.env.DEV) console.log("Web Audio API non supportata");
        return;
      }

      // Istanzia e usa un riferimento non nullo
      const ctx = (audioContext ??= new Ctx());

      // In caso il context sia sospeso, riprende
      if (ctx.state === "suspended") {
        await ctx.resume();
      }

      // Carica e decodifica l'audio
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer.slice(0));

      // Crea la sorgente, la collega e la mette in loop
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;
      source.connect(ctx.destination);
      source.onended = () => setIsPlaying(false);

      audioSource = source;

      // Avvio
      source.start(0);
      setIsPlaying(true);

      // Programma auto-stop solo se è stata passata una durata
      const timeSec = durationSec ?? defaultDurationSec;
      if (timeSec && timeSec > 0) {
        const current = audioSource;
        window.setTimeout(() => {
          // Evita che un timeout "vecchio" fermi una riproduzione "nuova"
          if (audioSource === current) {
            stop();
          }
        }, timeSec * 1000);
      }
    } catch (err) {
      if (import.meta.env.DEV) console.error("Errore durante il play:", err);
      // In caso di errore, riportiamo il sistema in stato pulito
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
   * Ferma la riproduzione e rilascia la sorgente/context.
   */
  function stop() {
    if (audioSource) {
      try {
        audioSource.onended = null;
        audioSource.stop(0);
        audioSource.disconnect();
      } catch {
        // Ignora eventuali errori di stop/disconnect
      }
      audioSource = null;
    }

    if (audioContext) {
      void audioContext.close().catch(() => {});
      audioContext = null;
    }

    setIsPlaying(false);
  }

  // Cleanup quando il componente che usa l'hook viene smontato
  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return {
    isPlaying,
    play,
    pause,
    resume,
    stop,
  };
}
