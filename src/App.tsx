import { useBearStore } from "./store/useBearStore";

function App() {
  const bears = useBearStore((state) => state.bears);
  const increasePopulation = useBearStore((state) => state.increasePopulation);
  const removeAllBears = useBearStore((state) => state.removeAllBears);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Zustand test</h1>
      <p className="mt-2 text-gray-700">Number of bears: {bears}</p>
      <div className="mt-4 flex gap-4">
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={increasePopulation}>
          Add bear
        </button>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={removeAllBears}>
          Remove all
        </button>
      </div>
    </div>
  );
}

export default App;
