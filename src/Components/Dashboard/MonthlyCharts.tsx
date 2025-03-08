import { useMonthContext } from "../../context/MonthContext";
import BarChart from "./eCharts/BarChart";
import PieChart from "./eCharts/PieChart";

const MonthlyCharts = () => {
  const { transaccionesDelMes } = useMonthContext();
  console.log(transaccionesDelMes);

  //Metodo para obtener array de objetos con el nombre de la categoría y su valor total...
  //---- PUEDO USAR ESTE METODO PARA AGREGAR OTRO CAMPO LLAMADO PRESUPUESTO ----
  // ---- DECLARAR OTRA VARIABLE DE ESTADO EN MONTH CONTEXT PARA LOS PRESUPUESTOS ----
  // ---- ASIGNAR LOS VALORES DESDE LA VISTA TABLA...
  // --- Y ASI TENER EN UN SOLO OBJETO LA CATEGORIA, EL MONTO TOTAL Y EL PRESUPUESTO ...
  const sumaMontoPorCategoría = (categoria: string) => {
    const objetoSuma = transaccionesDelMes
      .filter((item) => item.type === categoria)
      .reduce<{ [key: string]: number }>((acc, item) => {
        if (acc[item.category]) {
          acc[item.category] += Number(item.amount);
        } else {
          acc[item.category] = Number(item.amount);
        }
        return acc;
      }, {});

    return Object.entries(objetoSuma).map(([category, amount]) => ({
      name: category,
      value: amount,
    }));
  };

  //
  const arrayEgresosCategoría = sumaMontoPorCategoría("egreso");

  const arrayIngresosCategoria = sumaMontoPorCategoría("ingreso");

  //Metodo para obtener ingresos y egresos totales
  const totalType = (arrayType: { name: string; value: number }[]) => {
    return arrayType.reduce<number>((acc, item) => {
      acc += item.value;
      return acc;
    }, 0);
  };

  //Info para el grafico de barras Egresos vs Ingresos
  const sumaIngresosTotales = totalType(arrayIngresosCategoria);
  const sumaEgresosTotales = totalType(arrayEgresosCategoría);

  return (
    <>
      <div className="chart">
        <PieChart
          array={arrayEgresosCategoría}
          text={"Egresos Por Categoría"}
        />
      </div>
      <div className="chart">
        <PieChart
          array={arrayIngresosCategoria}
          text={"Ingresos Por Categoría"}
        />
      </div>
      <div className="chart">
        <BarChart ingreso={sumaIngresosTotales} egreso={sumaEgresosTotales} />
      </div>
    </>
  );
};

export default MonthlyCharts;
