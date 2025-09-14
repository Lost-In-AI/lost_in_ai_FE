import botImage from "../../assets/bot_icon.png";
import close from "../../assets/close.png";
import send from "../../assets/send.png";
import personality from "../../assets/personality.png";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  onClick?: () => void;
  variant: "primary" | "secondary" | "personality" | "close";
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  iconClassName?: string;
}

/*  
variant="primary" sarà il bottone con l'immagine del bot all'interno
variant="secondary" bottone per l'invio del messaggio 
variant="personality" bottone per lo switch della personality 
variant="close" bottone per chiudere la chat con il bot 
*/

const variants = {
  primary: "bg-transparent flex items-center justify-center",
  secondary: "rounded-lg flex items-center justify-center w-13 h-13",
  personality: "rounded-full flex items-center justify-center h-10 w-10",
  close: "rounded-lg flex items-center justify-center w-10 h-10",
};

function getVariantIcon(variant: "primary" | "secondary" | "personality" | "close", iconClassName?: string) {
  switch (variant) {
    case "primary":
      return <img src={botImage} alt="bot icon" className={`rounded-full ${iconClassName ?? ""}`} />;
    case "secondary":
      return <img src={send} alt="send button" className={iconClassName} />;
    case "personality":
      return <img src={personality} alt="personality button" className={iconClassName} />;
    case "close":
      return <img src={close} alt="close icon" className={iconClassName} />;
    default:
      return null;
  }
}

export default function Button({
  text,
  onClick,
  variant,
  disabled = false,
  className,
  iconClassName,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="submit"
      className={`${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-90"} ${className ?? ""}}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {getVariantIcon(variant, iconClassName)}
      {text}
      {children}
    </button>
  );
}
