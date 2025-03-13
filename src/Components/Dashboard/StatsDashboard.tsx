import GeneralCharts from "./GeneralCharts";
import MonthlyCharts from "./MonthlyCharts";
import "./style.css";

const StatsDashboard = () => {
  return (
    <div className="dashboard">
      <h1>Estadísticas Mensuales</h1>
      <MonthlyCharts />
      {/* <h1>Estadísticas Generales</h1> */}
      <GeneralCharts />
    </div>
  );
};

export default StatsDashboard;
