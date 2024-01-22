import { useState } from "react";
import styles from "./index.module.css";
import StatList from "./StatList";

export const pokemonTypes: {
  [key: string]: { [key: string]: number };
} = require("../data/pokemonType.json") || {};
export const elements: string[] = [];
for (const pokemonType in pokemonTypes) {
  elements.push(pokemonType);
}
export default function Home() {
  const [selectElements, setSelectElements] = useState<string[]>([]);
  const handleOnClick = (element: string) => {
    if (selectElements.includes(element)) {
      setSelectElements(
        selectElements.filter((selectElement) => selectElement != element)
      );
    } else {
      if (selectElements.length == 2)
        setSelectElements([...selectElements.slice(1), element]);
      else setSelectElements([...selectElements, element]);
    }
  };
  return (
    <>
      {elements.map((element, index) => (
        <button
          key={index}
          style={
            selectElements.includes(element)
              ? { color: "red" }
              : { color: "black" }
          }
          onClick={() => handleOnClick(element)}
        >
          {element}
        </button>
      ))}
      <StatList selectElements={selectElements} />
    </>
  );
}
