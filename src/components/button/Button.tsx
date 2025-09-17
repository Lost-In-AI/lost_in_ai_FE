import botImage from "../../assets/bot_icon.png";
import close from "../../assets/close.png";
import send from "../../assets/send.png";
import personality from "../../assets/personality.png";

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
    submit:
      "flex w-full text-white justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-indigo-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
    stop: "rounded-lg flex items-center justify-center w-13 h-13",
  };

  function getVariantIcon(variant: ButtonVariants, iconClassName?: string) {
    switch (variant) {
      case "primary":
        return <img src={botImage} alt="bot icon" className={`rounded-md shadow-lg ${iconClassName}`} />;
      case "secondary":
        return <img src={send} alt="send button" className={iconClassName} />;
      case "personality":
        return <img src={personality} alt="personality button" className={iconClassName} />;
      case "close":
        return <img src={close} alt="close icon" className={iconClassName} />;
      case "stop":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={iconClassName}>
            <rect x="6" y="6" width="12" height="12" />
          </svg>
        );
      default:
        return null;
    }
  }
  return (
    <button
      type={variant === "stop" ? "button" : "submit"}
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