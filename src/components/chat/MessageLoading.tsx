import { useSessionStore } from "../../store/useSessionStore";
import { getAssistantAvatar } from "../../utils/utils";
import LoadingIcon from "../icons/LoadingIcon";

export default function MessageLoading() {
  const { currentPersonality } = useSessionStore();

  return (
    <div className="flex items-start gap-2 mb-4">
      <div className="w-14 h-14 mt-auto flex-shrink-0">
        <img
          src={getAssistantAvatar(currentPersonality).avatar}
          alt={getAssistantAvatar(currentPersonality).alt}
          className="w-14 h-14 rounded-full shadow-md shadow-black/20"
        />
      </div>
      <div className="max-w-md lg:max-w-md px-4 py-2 my-auto rounded-lg bg-primary-300/60  ">
        <div className="w-16 h-12 flex items-center justify-center">
          <LoadingIcon color="bg-primary-200" />
        </div>
      </div>
    </div>
  );
}
