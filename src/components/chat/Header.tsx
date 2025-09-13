import { useChatStatusStore } from "../../store/useChatStatusStore";

interface HeaderProps {
  onClose: () => void;
}

export default function Header({ onClose }: HeaderProps) {
  const { loading } = useChatStatusStore();
  return (
    <section className="rounded-lg h-[68px]   flex items-center place-content-between  top-0 isolate sticky ">
      <div className="absolute  size-full rounded-lg inset-0 bg-primary-700/85 -z-10 "></div>
      <div className="flex gap-2 items-center">
        <div className="w-13 h-13 rounded-lg ml-2">
          <img src="/icons/avatar.png" alt="avatar assistant" className="rounded-lg" />
        </div>
        <div className="flex flex-col">
           {/* TODO: Mettere nome dinamico se vogliamo cambiare operatore */}
          <h2 className="text-lg text-white font-semibold ">Bankly</h2>
          <h3 className=" text-white text-sm font-light">{loading === "idle" ? "Online" : "Sto scrivendo.."}</h3>
        </div>
      </div>

      <div className="mr-1 flex">
        {/* TODO: cambiare i bottoni */}
        <button
          tabIndex={0}
          className="w-10 h-10 text-end cursor-pointer hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-white rounded-lg"
        >
          <img src="/icons/btn-personality.png" alt="Personality Button" className="w-10 h-10" />
        </button>
        <button
          onClick={onClose}
          tabIndex={0}
          className="w-10 h-10 text-end cursor-pointer hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-white rounded-lg"
        >
          <img src="/icons/close.png" alt="Close Button" className="w-10 h-10" />
        </button>
      </div>
    </section>
  );
}
