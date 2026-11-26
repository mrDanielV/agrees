
//import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

type DayPickerCmpProps = {
  selected?: Date | undefined;
  onSelect: (date: Date | undefined) => void;
};

const isValidDate = (date) => {
  return (date instanceof Date) && !Number.isNaN(date.getTime())
}

export function DayPickerCmp({ selected, onSelect }: DayPickerCmpProps) {
  //const [selected, setSelected] = useState<Date>();
  const current = isValidDate(selected)?selected:new Date();

  return (
    <DayPicker
      mode="single"          // Режим выбора одного дня
      selected={selected}
      month={current}   
      onSelect={onSelect}   
     //footer={selected ? `Выбрано: ${selected.toLocaleDateString()}` : "Выберите день."}
    />
  );
}