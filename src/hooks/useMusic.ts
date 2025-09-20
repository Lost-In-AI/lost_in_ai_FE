type AudioContextConstructor = new (contextOptions?: AudioContextOptions) => AudioContext;
interface GlobalWithAudioContext {
  AudioContext?: AudioContextConstructor;
  webkitAudioContext?: AudioContextConstructor;
}

import { useErrorStore, AppError } from "../store/useErrorStore";

const addError = useErrorStore.getState().addError;

export function useMusic() {
  let audioContext: AudioContext | null = null;
  let audioSource: AudioBufferSourceNode | null = null;
  let gainNode: GainNode | null = null;

  function initAudioContext() {
    if (!audioContext) {
      const globalWithAudio = globalThis as unknown as GlobalWithAudioContext;
      const AudioContextCtor = (globalWithAudio.AudioContext ||
        globalWithAudio.webkitAudioContext) as AudioContextConstructor;
      audioContext = new AudioContextCtor();
    }
    return audioContext;
  }

  async function playMusic() {
    // Se c'è una sorgente in corso, fermala
    if (audioSource) {
      audioSource.onended = null;
      audioSource.stop(0);
      audioSource.disconnect();
      audioSource = null;
    }
    try {
      const context = initAudioContext(); // context condiviso
      if (context.state === "suspended") {
        await context.resume();
      }
      // Carica e decodifica l'audio
      const response = await fetch("/assets/audio/creepy.mp3");
      if (!response.ok) {
        addError(AppError.AUDIO_PLAYBACK_ERROR);
        return;
      }
      const arrayBuffer = await response.arrayBuffer();
      // Create a copy of the buffer before attempting decode to avoid detachment issues
      const bufferCopy = arrayBuffer.slice(0);

      // Try to decode audio data with error handling
      let audioBuffer: AudioBuffer;
      try {
        audioBuffer = await context.decodeAudioData(bufferCopy);
      } catch {
        addError(AppError.AUDIO_PLAYBACK_ERROR);
        return;
      }

      const source = context.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = true;
      gainNode = context.createGain();
      gainNode.gain.value = 0.3; // Volume al 30%

      // Collega: source -> gainNode -> destination
      source.connect(gainNode);
      gainNode.connect(context.destination);
      audioSource = source;
      source.start(0);
    } catch {
      addError(AppError.AUDIO_PLAYBACK_ERROR);
      //console.error("Audio playback error:", err);
    }
  }

  async function pauseMusic() {
    if (audioContext && audioContext.state === "running") {
      await audioContext.suspend();
    }
  }

  function stopMusic() {
    if (audioSource) {
      audioSource.stop();
      audioSource.disconnect();
      audioSource = null;
    }
    if (gainNode) {
      gainNode.disconnect();
      gainNode = null;
    }
  }

  return {
    playMusic,
    pauseMusic,
    stopMusic,
  };
}
