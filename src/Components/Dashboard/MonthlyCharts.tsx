import { useMonthContext } from "../../context/MonthContext";
import PieChart from "./PieChart";

const MonthlyCharts = () => {
  const { transaccionesDelMes } = useMonthContext();

  //Objeto con los nombres de las categorias y el gasto total correspondiente
  const sumaDeGastosPorCategoría = transaccionesDelMes
    .filter((item) => item.type === "expense")
    .reduce<{ [key: string]: number }>((acc, item) => {
      if (acc[item.category]) {
        acc[item.category] += Number(item.amount);
      } else {
        acc[item.category] = Number(item.amount);
      }
      return acc;
    }, {});

  // Convertir el objeto en un array y aplicar map
  const arrayGastosCategoria = Object.entries(sumaDeGastosPorCategoría).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  //Objeto con los nombres de las categorias y el gasto total correspondiente
  const sumaDeIngresosPorCategoría = transaccionesDelMes
    .filter((item) => item.type === "income")
    .reduce<{ [key: string]: number }>((acc, item) => {
      if (acc[item.category]) {
        acc[item.category] += Number(item.amount);
      } else {
        acc[item.category] = Number(item.amount);
      }
      return acc;
    }, {});

  // Convertir el objeto en un array y aplicar map
  const arrayIngresosCategoria = Object.entries(sumaDeIngresosPorCategoría).map(
    ([category, amount]) => ({
      name: category,
      value: amount,
    })
  );

  return (
    <>
      <div className="chart">
        <PieChart
          array={arrayGastosCategoria}
          text={"Egresos Totales Por Categoría"}
        />
      </div>
      <div className="chart">
        <PieChart
          array={arrayIngresosCategoria}
          text={"Ingresos Totales Por Categoría"}
        />
      </div>
    </>
  );
};

export default MonthlyCharts;
