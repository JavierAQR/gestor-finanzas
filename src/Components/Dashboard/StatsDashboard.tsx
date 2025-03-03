import GeneralCharts from "./GeneralCharts";
import MonthlyCharts from "./MonthlyCharts";
import "./style.css";

const StatsDashboard = () => {
  return (
    <div className="dashboard">
      <MonthlyCharts />
      <GeneralCharts />
    </div>
  );
};

export default StatsDashboard;
