import { ChangeEvent } from "react";
import { useMonthContext } from "../../context/MonthContext";

const SelectMonth = () => {
  const { monthSelected, setMonthSelected, keysMonths } = useMonthContext();

  //Metodo para cambiar el mes
  const handleMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    setMonthSelected(e.target.value);
  };

  return (
    <>
      {keysMonths.length !== 0 && (
        <select
          name="monthSelected"
          onChange={handleMonth}
          value={monthSelected}
        >
          {keysMonths.map((item, index) => (
            <option key={index}>{item}</option>
          ))}
        </select>
      )}
    </>
  );
};

export default SelectMonth;
