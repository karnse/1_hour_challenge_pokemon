import React, { useEffect, useState } from "react";
import { elements, pokemonTypes } from ".";
type StatListProps = {
  selectElements: string[];
};
type StatCard = {
  damageMul: number;
  elements: string[];
};
const StatList: React.FC<StatListProps> = ({ selectElements }) => {
  const [damageMulLists, setDamageMulLists] = useState<StatCard[]>([]);
  useEffect(() => {
    const newDamageMuls: Record<string, string[]> = {};
    elements.forEach((element) => {
      let calDamage = 1;
      selectElements.forEach((selectElement) => {
        calDamage *= pokemonTypes[selectElement]?.[element] ?? 1;
      });
      if (calDamage.toFixed(2) in newDamageMuls)
        newDamageMuls[calDamage.toFixed(2)]?.push(element);
      else newDamageMuls[calDamage.toFixed(2)] = [element];
    });
    const newForSetDamgeMul: StatCard[] = Object.keys(newDamageMuls).map(
      (newDamageMul) => ({
        damageMul: Number(newDamageMul),
        elements: newDamageMuls[newDamageMul] ?? [],
      })
    );
    setDamageMulLists(
      newForSetDamgeMul.sort((a, b) => b.damageMul - a.damageMul)
    );
  }, [selectElements]);
  return (
    <div className="StatList">
      {damageMulLists.map((damageMulList, index) => (
        <div key={index} style={{ width: `100%` }}>
          <div>{damageMulList.damageMul}</div>
          <div className="ElementList">
            {damageMulList.elements.map((element, index) => (
              <div key={index}>{element}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatList;
