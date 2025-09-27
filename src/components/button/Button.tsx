import close from "../../assets/close.png";
import send from "../../assets/send.png";
import personality from "../../assets/personality.png";
import stop from "../../assets/stop.png";
import { getAssistantAvatar } from "../../utils/utils";
import { useSessionStore } from "../../store/useSessionStore";

type ButtonVariants = "primary" | "secondary" | "personality" | "close" | "submit" | "stop";
interface ButtonProps {
  text?: string;
  onClick?: () => void;
  variant: ButtonVariants;
  disabled?: boolean;
  className?: string;
  iconClassName?: string;
  tabIndex: number;
}

export default function Button({
  text,
  onClick,
  variant,
  disabled = false,
  className,
  iconClassName,
  tabIndex,
}: Readonly<ButtonProps>) {
  const variants = {
    primary: "absolute bottom-4 right-4 md:absolute md:bottom-4 md:right-4 pointer-events-auto",
    secondary: "rounded-lg flex items-center justify-center w-13 h-13 ",
    personality: "rounded-full flex items-center justify-center h-10 w-10",
    close: "rounded-lg flex items-center justify-center w-10 h-10",
    stop: "rounded-lg flex items-center justify-center w-13 h-13",
    submit:
      "flex w-full text-white justify-center rounded-md bg-primary-500 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-primary-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-primary-600",
    cancel: "rounded-lg flex items-center justify-center w-13 h-13 bg-red-500 hover:bg-red-600",
  };
  const { lastMessagePersonality } = useSessionStore();

  function getVariantIcon(variant: ButtonVariants, iconClassName?: string) {
    switch (variant) {
      case "primary":
        return (
          <img
            src={getAssistantAvatar(lastMessagePersonality()).avatar}
            alt={getAssistantAvatar(lastMessagePersonality()).alt}
            className={`rounded-md shadow-lg ${iconClassName}`}
          />
        );
      case "secondary":
        return <img src={send} alt="send button" className={iconClassName} />;
      case "personality":
        return <img src={personality} alt="personality button" className={iconClassName} />;
      case "close":
        return <img src={close} alt="close icon" className={iconClassName} />;
      case "stop":
        return <img src={stop} alt="stop button" className={iconClassName} />;
      default:
        return null;
    }
  }
  return (
    <button
      type="submit"
      tabIndex={tabIndex}
      className={`${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-90 cursor-pointer"} ${className} }`}
      onClick={onClick}
      disabled={disabled}
    >
      {getVariantIcon(variant, iconClassName)}
      {text}
    </button>
  );
}
