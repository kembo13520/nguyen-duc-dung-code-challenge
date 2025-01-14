import ConverterCard from "./components/Card/ConverterCard";

import "./App.scss";

function App() {
  return (
    <div className="flex justify-center items-center h-full flex-col">
      <h1 className="text-3xl font-bold underline mb-[10px]">
        Money Converter
      </h1>
      <ConverterCard />
    </div>
  );
}

export default App;
