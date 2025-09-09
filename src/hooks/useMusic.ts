import { useEffect, useRef, useState } from "react";

/**
 * Hook semplice per gestire musica di attesa con Web Audio API.
 */
export function useMusic(defaultDurationSec?: number) {
  // Stato che indica se la musica sta suonando
  const [isPlaying, setIsPlaying] = useState(false);
  // Stato di mute (true = muto)
  const [isMuted, setIsMuted] = useState(false);

  // Riferimenti al grafo audio
  const audioCtxRef = useRef<AudioContext | null>(null); // AudioContext condiviso
  const gainRef = useRef<GainNode | null>(null); // Nodo volume (per mute/unmute)
  const sourceRef = useRef<AudioBufferSourceNode | null>(null); // Sorgente della traccia corrente
  const stopTimerRef = useRef<number | null>(null); // Timer per auto-stop

  // Annulla il timer di auto-stop
  function clearTimer() {
    if (stopTimerRef.current != null) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
  }

  /**
   * Avvia la musica
   */
  async function play(src: string, durationSec?: number) {
    // Ferma la riproduzione in corso
    stop();

    try {
      // Crea un AudioContext compatibile anche con Safari (webkitAudioContext)
      if (!audioCtxRef.current) {
        const g = globalThis as unknown as {
          AudioContext?: new () => AudioContext;
          webkitAudioContext?: new () => AudioContext;
        };
        const Ctx = g.AudioContext ?? g.webkitAudioContext;
        if (!Ctx) throw new Error("Web Audio API non supportata");
        audioCtxRef.current = new Ctx();
      }

      const audioContext = audioCtxRef.current;
      if (!audioContext) {
        throw new Error("AudioContext non inizializzato");
      }

      // Crea/recupera il GainNode per gestire mute/unmute
      if (!gainRef.current) {
        gainRef.current = audioContext.createGain();
        gainRef.current.gain.value = isMuted ? 0 : 1;
        gainRef.current.connect(audioContext.destination);
      }

      // Carica e decodifica l'audio
      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer.slice(0));

      // Crea la sorgente, la collega e la mette in loop
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;
      source.connect(gainRef.current);
      source.onended = () => setIsPlaying(false);

      sourceRef.current = source;

      // In caso il context sia sospeso, riprende
      if (audioContext.state === "suspended") {
        await audioContext.resume();
      }

      // Avvio
      source.start(0);
      setIsPlaying(true);

      // Programma auto-stop
      const ms =
        (durationSec ?? defaultDurationSec) && (durationSec ?? defaultDurationSec)! > 0
          ? (durationSec ?? defaultDurationSec)! * 1000
          : undefined;

      clearTimer();
      if (ms !== undefined) {
        stopTimerRef.current = window.setTimeout(() => {
          stop();
        }, ms);
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
    clearTimer();
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state === "running") {
      try {
        await ctx.suspend();
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
    const ctx = audioCtxRef.current;
    if (ctx && ctx.state !== "running" && sourceRef.current) {
      try {
        await ctx.resume();
        setIsPlaying(true);
      } catch (err) {
        if (import.meta.env.DEV) console.debug(err);
      }
    }
  }

  /**
   * Ferma la riproduzione e rilascia la sorgente (evita memory leak).
   */
  function stop() {
    clearTimer();

    const source = sourceRef.current;
    if (source) {
      try {
        source.onended = null;
        source.stop(0);
        source.disconnect();
      } catch {
        // Ignora eventuali errori di stop/disconnect
      }
      sourceRef.current = null;
    }

    setIsPlaying(false);
  }

  /**
   * Attiva/disattiva il mute. Se `next` non è passato, inverte lo stato corrente.
   */
  function mute(next?: boolean) {
    const value = typeof next === "boolean" ? next : !isMuted;
    setIsMuted(value);
    if (gainRef.current) {
      gainRef.current.gain.value = value ? 0 : 1;
    }
  }

  // Cleanup quando il componente che usa l'hook viene smontato
  useEffect(() => {
    return () => {
      clearTimer();
      stop();
      const ctx = audioCtxRef.current;
      if (ctx) {
        ctx.close().catch(() => {});
        audioCtxRef.current = null;
      }
      gainRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isPlaying,
    isMuted,
    play,
    pause,
    resume,
    stop,
    mute,
  };
}
