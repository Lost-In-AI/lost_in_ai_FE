import { useChatStatusStore } from "../../store/useChatStatusStore";
import { useSessionStore } from "../../store/useSessionStore";
import { getAssistantAvatar } from "../../utils/utils";
import Button from "../button/Button";

interface HeaderProps {
  onClose: () => void;
}

export default function Header({ onClose }: HeaderProps) {
  const { loading } = useChatStatusStore();
  const { lastMessagePersonality } = useSessionStore();
  return (
    <section className="rounded-lg h-[68px]   flex items-center place-content-between  top-0 isolate sticky ">
      <div className="absolute  size-full rounded-lg inset-0 bg-primary-700/85 -z-10 "></div>
      <div className="flex gap-2 items-center">
        <div className="w-13 h-13 rounded-lg ml-2">
          <img
            src={getAssistantAvatar(lastMessagePersonality()).avatar}
            alt={getAssistantAvatar(lastMessagePersonality()).alt}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          {/* TODO: Mettere nome dinamico se vogliamo cambiare operatore */}
          <h2 className="text-lg text-white font-semibold ">Bankly</h2>
          <h3 className=" text-white text-sm font-light">{loading === "idle" ? "Online" : "Sto scrivendo.."}</h3>
        </div>
      </div>

      <div className="mr-1 flex">
        <Button
          tabIndex={0}
          variant="personality"
          className="focus:outline-none focus:ring-2 focus:ring-white h-10 hover:brightness-90 hover:opacity-70 mr-4 text-end"
        />
        <Button
          tabIndex={0}
          onClick={onClose}
          variant="close"
          className="focus:outline-none focus:ring-2 focus:ring-white h-10 hover:brightness-90 hover:opacity-70 mr-4 text-end"
        />
      </div>
    </section>
  );
}
