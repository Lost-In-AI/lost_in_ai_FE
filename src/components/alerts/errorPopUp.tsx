import { useEffect, useState } from "react";

interface ErrorPopupProps {
  message: string;
  position?: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
  className?: string;
}

export default function ErrorPopup({ message, position = "top-right", className = "" }: ErrorPopupProps) {
  const [error, setError] = useState<string | null>(message);

  const positionClasses: Record<NonNullable<ErrorPopupProps["position"]>, string> = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
  };

  useEffect(() => {
    if (message) {
      setError(message);
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      {error && (
        <div
          className={`
            fixed z-100 ${positionClasses[position]}
            border border-red-200 bg-red-50 text-red-800 px-4 py-4 rounded-lg shadow-lg
            w-[90%] max-w-sm
            transition-all duration-300 ease-in-out
            ${className}
          `}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <img src="/icons/close.png" alt="error" className="bg-red-500/80 rounded-full w-7 h-7 " />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-semibold text-black">Oops! Si è verificato un errore</h3>
              <p className="mt-1 text-sm text-gray-600">{error}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
