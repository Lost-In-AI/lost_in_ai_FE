interface MessageProps {
  text: string;
  isUser: boolean;
  timestamp?: string | null;
}

export default function Message({ text, isUser, timestamp }: MessageProps) {
  return (
    <div className={`flex mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg text-left border border-gray-300 ${
          isUser ? "bg-blue-500 text-white rounded-br-none" : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}
      >
        <p className="text-sm">{text}</p>
        {timestamp && (
          <p className={`text-xs  mt-1 ${isUser ? "text-blue-100 text-left" : "text-gray-500 text-end"}`}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
