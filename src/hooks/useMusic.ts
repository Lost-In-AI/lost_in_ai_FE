import { useCallback, useEffect, useRef, useState } from "react";

type PlayOptions = {
  duration?: number; // secondi
  loop?: boolean; // default true
};

type AudioContextCtor = new () => AudioContext;

const getAudioContextCtor = (): AudioContextCtor | undefined => {
  const g = globalThis as {
    AudioContext?: AudioContextCtor;
    webkitAudioContext?: AudioContextCtor;
  };
  return g.AudioContext ?? g.webkitAudioContext;
};

export function useMusic(defaultDuration?: number) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const stopTimerRef = useRef<number | null>(null);
  const currentBufferRef = useRef<AudioBuffer | null>(null);

  const ensureContext = useCallback(async (): Promise<AudioContext> => {
    let ctx = audioCtxRef.current;
    if (!ctx) {
      const Ctx = getAudioContextCtor();
      if (!Ctx) {
        throw new Error("Web Audio API not supported in this browser");
      }
      ctx = new Ctx();
      audioCtxRef.current = ctx;
      gainRef.current = ctx.createGain();
      gainRef.current.connect(ctx.destination);
      gainRef.current.gain.value = isMuted ? 0 : 1;
    }
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
    return ctx;
  }, [isMuted]);

  const clearTimer = () => {
    if (stopTimerRef.current != null) {
      window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
  };

  const disconnectSource = () => {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop(0);
      } catch (err) {
        if (import.meta.env.DEV) console.debug(err);
      }
      try {
        sourceRef.current.disconnect();
      } catch (err) {
        if (import.meta.env.DEV) console.debug(err);
      }
      sourceRef.current.onended = null;
      sourceRef.current = null;
    }
    currentBufferRef.current = null;
    setIsPlaying(false);
  };

  const stop = useCallback(async () => {
    clearTimer();
    disconnectSource();
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      try {
        await audioCtxRef.current.suspend();
      } catch (err) {
        if (import.meta.env.DEV) console.debug(err);
      }
    }
  }, []);

  const pause = useCallback(async () => {
    clearTimer();
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      try {
        await audioCtxRef.current.suspend();
        setIsPlaying(false);
      } catch (err) {
        if (import.meta.env.DEV) console.debug(err);
      }
    }
  }, []);

  const resume = useCallback(async () => {
    if (!audioCtxRef.current) return;
    if (audioCtxRef.current.state !== "running") {
      try {
        await audioCtxRef.current.resume();
        setIsPlaying(Boolean(sourceRef.current));
      } catch (err) {
        if (import.meta.env.DEV) console.debug(err);
      }
    }
  }, []);

  const mute = useCallback(
    (muted?: boolean) => {
      const next = typeof muted === "boolean" ? muted : !isMuted;
      setIsMuted(next);
      if (gainRef.current) {
        gainRef.current.gain.value = next ? 0 : 1;
      }
    },
    [isMuted],
  );

  const loadBuffer = useCallback(
    async (src: string) => {
      const ctx = await ensureContext();
      if (currentSrc !== src || !currentBufferRef.current) {
        const res = await fetch(src);
        const arrayBuf = await res.arrayBuffer();
        const audioBuf = await ctx.decodeAudioData(arrayBuf.slice(0));
        currentBufferRef.current = audioBuf;
      }
      setCurrentSrc(src);
      const buf = currentBufferRef.current;
      if (!buf) {
        throw new Error("AudioBuffer not loaded");
      }
      return buf;
    },
    [ensureContext, currentSrc],
  );

  const scheduleAutoStop = useCallback(
    (ms: number | undefined) => {
      clearTimer();
      if (ms && ms > 0) {
        stopTimerRef.current = window.setTimeout(() => {
          stop();
        }, ms);
      }
    },
    [stop],
  );

  const play = useCallback(
    async (src: string, options?: PlayOptions) => {
      const durationMs =
        (options?.duration ?? defaultDuration)
          ? Math.max(0, (options?.duration ?? defaultDuration)!) * 1000
          : undefined;

      await stop(); // stop audio precedente
      const ctx = await ensureContext();
      const buffer = await loadBuffer(src);

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = options?.loop ?? true;
      if (!gainRef.current) {
        throw new Error("Gain node not initialized");
      }
      source.connect(gainRef.current);
      source.onended = () => setIsPlaying(false);

      sourceRef.current = source;
      setIsPlaying(true);
      source.start(0);

      scheduleAutoStop(durationMs);
    },
    [defaultDuration, ensureContext, loadBuffer, stop, scheduleAutoStop],
  );

  useEffect(() => {
    return () => {
      clearTimer();
      disconnectSource();
      if (audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        const p = ctx.close();
        p.catch((err) => {
          if (import.meta.env.DEV) console.debug(err);
        });
        audioCtxRef.current = null;
      }
    };
  }, []);

  return {
    // stati
    isPlaying,
    currentSrc,
    isMuted,
    // azioni
    play,
    stop,
    pause,
    resume,
    mute,
  };
}
