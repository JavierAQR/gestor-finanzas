import ReactECharts from "echarts-for-react";
const StatsDashboard = () => {
  const options = {
    title: {
      text: "Ejemplo de Gráfico con ECharts",
    },
    tooltip: {},
    xAxis: {
      data: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"],
    },
    yAxis: {},
    series: [
      {
        name: "Ventas",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
  };
  return <ReactECharts option={options} />;
};

export default StatsDashboard;
