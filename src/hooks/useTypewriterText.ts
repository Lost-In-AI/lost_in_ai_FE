import { useEffect, useState, useCallback } from "react";
import { useChatStatusStore } from "../store/useChatStatusStore";

interface UseTypewriterTextProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

export default function useTypewriterText({ text, delay = 20, onComplete }: UseTypewriterTextProps) {
  const { setShouldAnimateLastMessage, completeAnimation } = useChatStatusStore();
  const [currentText, setCurrentText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handleComplete = useCallback(() => {
    completeAnimation();
    setShouldAnimateLastMessage(false);
    if (onComplete) onComplete();
  }, [completeAnimation, setShouldAnimateLastMessage, onComplete]);

  useEffect(() => {
    setCurrentText("");
    setCurrentIndex(0);
  }, [text]);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && text.length > 0) {
      handleComplete();
    }
  }, [currentIndex, delay, text, handleComplete]);

  const skipAnimation = useCallback(() => {
    setCurrentText(text);
    setCurrentIndex(text.length);
    handleComplete();
  }, [text, handleComplete]);

  return { animatedText: currentText, skipAnimation };
}
