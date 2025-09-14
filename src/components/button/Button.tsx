import botImage from "../../assets/bot_icon.png";
import close from "../../assets/close.png";
import send from "../../assets/send.png";
import personality from "../../assets/personality.png";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  onClick?: () => void;
  variant: "primary" | "secondary" | "personality" | "close";
  disabled: boolean;
  className?: string;
  children?: React.ReactNode;
}

/*  
variant="primary" sarà il bottone con l'immagine del bot all'interno
variant="secondary" bottone per l'invio del messaggio 
variant="personality" bottone per lo switch della personality 
variant="close" bottone per chiudere la chat con il bot 
*/

const variants = {
  primary: "bg-transparent",
  secondary: "bg-transparent",
  personality: "bg-transparent",
  close: "bg-transparent",
};

function getVariantIcon(variant: "primary" | "secondary" | "personality" | "close") {
  switch (variant) {
    case "primary":
      return <img src={botImage} alt="bot icon" className="rounded-full" />;
    case "secondary":
      return <img src={send} alt="send button" />;
    case "personality":
      return <img src={personality} alt="personality button" />;
    case "close":
      return <img src={close} alt="close icon" />;
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
      {getVariantIcon(variant)}
      {text}
      {children}
    </button>
  );
}
