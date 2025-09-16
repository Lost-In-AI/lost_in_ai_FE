import useTypewriterText from "../../hooks/useTypewriterText";

interface MessageProps {
  text: string;
  isUser: boolean;
  timestamp?: string | null;
  animate?: boolean;
}

export default function Message({ text, isUser, timestamp, animate }: MessageProps) {
  const animatedText = useTypewriterText({
    text: text,
    delay: 20,
  });
  const userVariant = "bg-gray-100 text-primary-900 rounded-md";
  const assistantVariant = "bg-primary-300/60 text-gray-800 rounded-md";

  return (
    <div className={`flex items-start  gap-2 mb-4  ${isUser ? "flex-row-reverse" : ""}`} role="presentation">
      <div className={`w-14 h-14 mt-auto  flex-shrink-0 `}>
        {!isUser ? (
          <img src="/icons/avatar.png" alt="1" className="w-14 h-14 rounded-full shadow-md shadow-black/20" />
        ) : (
          //TODO: icona user?
          <div className="w-14 h-14 rounded-full bg-gray-200 text-center place-content-center shadow-md shadow-black/20">
            User
          </div>
        )}
      </div>

      <div
        className={`w-md px-4 py-2 my-auto rounded-lg text-left ${isUser ? userVariant : assistantVariant}`}
      >
        <p className="text-sm">{!isUser && animate ? animatedText : text}</p>
        {timestamp && (
          <p className={`text-xs mt-1 text-primary-900 ${isUser ? " text-left" : "text-end"}`}>{timestamp}</p>
        )}
      </div>
    </div>
  );
}
