import { ChangeEvent, useEffect } from "react";
import { useMonthContext } from "../../context/MonthContext";

const SelectMonth = () => {
  const { monthSelected, setMonthSelected, keysMonths } = useMonthContext();

  //Metodo para cambiar el mes
  const handleMonth = (e: ChangeEvent<HTMLSelectElement>) => {
    setMonthSelected(e.target.value);
  };

  //Si el array de fechas cambia (se elimina una fecha)
  //Y entonces la fecha seleccionada ya no forma parte del array,
  //Entonces se selecciona la primera fecha del array
  useEffect(() => {
    if (!keysMonths.includes(monthSelected)) {
      setMonthSelected(keysMonths[0]);
    }
  }, [keysMonths]);

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
