import { useEffect, useState } from "react";

interface UseTypewriterTextProps {
  text: string;
  delay?: number;
  onComplete?: () => unknown;
}

export default function useTypewriterText({ text, delay, onComplete }: UseTypewriterTextProps) {
  const [currentText, setCurrentText] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);

        return () => clearTimeout(timeout);
      }, delay);
    } else if (currentIndex === text.length && onComplete) {
      onComplete();
    }
  }, [currentIndex, delay, text, onComplete]);

  return currentText;
}
