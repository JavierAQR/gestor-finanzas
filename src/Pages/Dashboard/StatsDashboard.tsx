import GeneralCharts from "../../Components/Dashboard/GeneralCharts";
import MonthlyCharts from "../../Components/Dashboard/MonthlyCharts";
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
