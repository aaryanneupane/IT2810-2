import React from "react";

/* 
This is the component for displaying a year picker, used in the filterbar
*/

interface YearPickerProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  startYear?: number;
  endYear?: number;
  dataTestId?: string;
}

const YearPicker: React.FC<YearPickerProps> = ({
  value,
  onChange,
  startYear = 1900,
  endYear = 2030,
  dataTestId,
}) => {
  const years = [
    "Choose a year...",
    ...Array.from({ length: endYear - startYear + 1 }, (_, i) => endYear - i),
    "",
  ];

  return (
    <select
      value={value || "Choose a year..."}
      onChange={(e) =>
        onChange(
          e.target.value === "Choose a year..."
            ? undefined
            : Number(e.target.value),
        )
      }
      data-testid={dataTestId}
    >
      {years.map((year, i) => (
        <option key={i} value={year} data-testid={`year-${year}`}>
          {" "}
          {year}{" "}
        </option>
      ))}
    </select>
  );
};

export default YearPicker;
