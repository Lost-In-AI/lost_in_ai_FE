import { useEffect, useState, useCallback, useRef } from "react";
import { useChatStatusStore } from "../store/useChatStatusStore";

interface UseTypewriterTextProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

export default function useTypewriterText({ text, delay = 20, onComplete }: UseTypewriterTextProps) {
  const { shouldAnimateLastMessage, setShouldAnimateLastMessage, completeAnimation } = useChatStatusStore();
  const [currentText, setCurrentText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleComplete = useCallback(() => {
    completeAnimation();
    setShouldAnimateLastMessage(false);
    if (onComplete) onComplete();
  }, [completeAnimation, setShouldAnimateLastMessage, onComplete]);

  const skipAnimation = useCallback(() => {
    setCurrentText(text);
    setCurrentIndex(text.length);
    handleComplete();
  }, [text, handleComplete]);

  // If the text changes, reset the animation
  useEffect(() => {
    setCurrentText("");
    setCurrentIndex(0);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [text]);

  // Text animation
  useEffect(() => {
    if (currentIndex < text.length) {
      timeoutRef.current = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      };
    } else if (currentIndex === text.length && text.length > 0) {
      handleComplete();
    }
  }, [currentIndex, delay, text, handleComplete]);

  // If shouldAnimateLastMessage is false, skip the animation
  useEffect(() => {
    if (!shouldAnimateLastMessage && currentIndex < text.length && currentIndex > 0) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      skipAnimation();
    }
  }, [shouldAnimateLastMessage, currentIndex, text, skipAnimation]);

  return { animatedText: currentText };
}
