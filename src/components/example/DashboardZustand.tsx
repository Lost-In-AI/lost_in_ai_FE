import type { ExampleBtn } from "../../../types/type";
import { useBearStore } from "../../store/useBearStore";
import Button from "../button/Button";

// React è fatto di componenti, componentizza il più possibile
export default function DashboardZustand() {
  const { bears, increasePopulation, removeAllBears, doublePopulation } = useBearStore(); // utilizzo global state
  // const { isDarkmode, toggleTheme } = useTheme() esempio di utilizzo di un custom hook

  const exampleBtn: ExampleBtn[] = [
    {
      handleClick: () => increasePopulation(),
      text: "Increase bears",
      className: "px-4 py-2 bg-blue-500 text-white rounded",
    },
    {
      handleClick: () => doublePopulation(),
      text: "Double bears",
      className: "px-4 py-2 bg-purple-500 text-white rounded",
    },
    {
      handleClick: () => removeAllBears(),
      text: "Reset",
      className: "px-4 py-2 bg-red-500 text-white rounded",
    },
  ];
  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600">Zustand test</h1>
      <p className="mt-2 text-gray-700 ">Number of bears: {bears}</p>
      <div className="mt-4  flex gap-4 justify-center">
        {exampleBtn &&
          exampleBtn.length > 0 &&
          exampleBtn.map((item, index) => (
            <Button key={index} text={item.text} handleClick={item.handleClick} className={item.className} />
          ))}
      </div>
    </div>
  );
}
