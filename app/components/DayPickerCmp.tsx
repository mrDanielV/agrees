
//import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

type DayPickerCmpProps = {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
};

export function DayPickerCmp({ selected, onSelect }: DayPickerCmpProps) {
  //const [selected, setSelected] = useState<Date>();

  return (
    <DayPicker
      mode="single"          // Режим выбора одного дня
      selected={selected}   
      onSelect={onSelect}   
     //footer={selected ? `Выбрано: ${selected.toLocaleDateString()}` : "Выберите день."}
    />
  );
}