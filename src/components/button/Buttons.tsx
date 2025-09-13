import botImage from "../../assets/bot_icon.png";
import close from "../../assets/close.png";
import send from "../../assets/send.png";
import personality from "../../assets/personality.png";

interface ButtonsProps {
  text: string;
  onClick: () => void;
  variant: "primary" | "secondary" | "personality" | "close";
  disabled: boolean;
  className?: string;
}

/*  
variant="primary" sarà il bottone con l'immagine del bot all'interno
variant="secondary" bottone per l'invio del messaggio 
variant="personality" bottone per lo switch della personality 
variant="close" bottone per chiudere la chat con il bot 
*/


const variants = {
    primary:"bg-transparent",
    secondary: "bg-transparent",
    personality:"bg-transparent",
    close:"bg-transparent",
}

const variantIcons = {
  primary: <img src={botImage} alt="bot" className="rounded-full "/>,
  secondary:<img src={send} alt="secondary" />,
  personality: <img src={personality} alt="personality" />,
  close: <img src={close} alt="close"/>,
}

export default function Buttons ({text, onClick, variant, disabled=false, className } : ButtonsProps) {

  return ( 
  <button 
  className={`${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : "hover:brightness-90"} ${className ?? ""}}`} 
      onClick={onClick} 
      disabled={disabled}>
      {variantIcons[variant]}
      {text}
  </button>
  );
}