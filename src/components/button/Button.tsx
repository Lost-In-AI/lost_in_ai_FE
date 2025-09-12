// l interface dei componenti meglio tenerla nel file del componente stesso
interface ButtonProps {
  handleClick: () => void;
  text: string;
  className?: string; // opzionale
}

export default function Button({ handleClick, text, className }: ButtonProps) {
  return (
    <button className={`px-4 py-2 ${className} text-white rounded`} onClick={() => handleClick()}>
      {text}
    </button>
  );
}
