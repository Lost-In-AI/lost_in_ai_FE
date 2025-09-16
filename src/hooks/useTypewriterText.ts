import { useEffect, useState } from "react";
import { useSessionStore } from "../store/useSessionStore";

interface UseTypewriterTextProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

export default function useTypewriterText({ text, delay, onComplete }: UseTypewriterTextProps) {
  const { setShouldAnimateLastMessage } = useSessionStore();
  const [currentText, setCurrentText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else if (currentIndex === text.length && onComplete) {
      setShouldAnimateLastMessage(false);
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete, setShouldAnimateLastMessage]);

  return currentText;
}
