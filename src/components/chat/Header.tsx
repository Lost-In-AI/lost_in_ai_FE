import { useChatStatusStore } from "../../store/useChatStatusStore";
import Button from "../button/Button";

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
        <Button
          tabIndex={0}
          variant="personality"
          className="w-10 h-10 mr-1 text-end cursor-pointer hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-white rounded-lg"
          disabled={false}
        ></Button>
        <Button
          tabIndex={0}
          onClick={onClose}
          variant="close"
          className=" w-10 h-10 mr-1 text-end cursor-pointer hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-white rounded-lg"
          disabled={false}
        ></Button>
      </div>
    </section>
  );
}
