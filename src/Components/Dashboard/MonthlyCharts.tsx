import { useMonthContext } from "../../context/MonthContext";
import { useTransactionStore } from "../../store/transaction";
import BarChart from "./eCharts/BarChart";
import PieChart from "./eCharts/PieChart";

const MonthlyCharts = () => {
  const { transaccionesDelMes } = useMonthContext();
  const getTotalAmountByType = useTransactionStore(
    (state) => state.totalAmountByType
  );

  //Metodo para obtener array de objetos con el nombre de la categoría y su valor total...
  const getAmountByCategory = (type: string) => {
    const objetoSuma = transaccionesDelMes.reduce<{ [key: string]: number }>(
      (acc, item) => {
        if (item.type === type) {
          acc[item.category] = (acc[item.category] || 0) + item.amount;
        }
        return acc;
      },
      {}
    );

    return Object.keys(objetoSuma).map((category) => ({
      name: category,
      value: objetoSuma[category],
    }));
  };

  const totalCategoriesEgreso = getAmountByCategory("egreso");
  const totalCategoriesIngreso = getAmountByCategory("ingreso");

  const { ingresos, egresos } = getTotalAmountByType(transaccionesDelMes);

  return (
    <div className="dashboard-mensual">
      <div className="chart ingresos">
        <PieChart
          array={totalCategoriesIngreso}
          text={"Ingresos Por Categoría"}
        />
      </div>
      <div className="chart egresos">
        <PieChart
          array={totalCategoriesEgreso}
          text={"Egresos Por Categoría"}
        />
      </div>
      <div className="chart bar">
        <BarChart ingreso={ingresos} egreso={egresos} />
      </div>
    </div>
  );
};

export default MonthlyCharts;
