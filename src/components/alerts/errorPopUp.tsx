interface ErrorPopupProps {
  message: string;
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  className?: string; 
}

const positionClasses: Record<NonNullable<ErrorPopupProps["position"]>, string> = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
};

export default function ErrorPopup({
  message,
  position = "top-right",
  className = "",
}: ErrorPopupProps) {
  return (
    <div
      className={`
        fixed z-50 ${positionClasses[position]}
        bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg
        w-[90%] max-w-sm text-center sm:text-left
        transition-opacity duration-300
        ${className}
      `}
    >
      {message}
    </div>
  );
}
