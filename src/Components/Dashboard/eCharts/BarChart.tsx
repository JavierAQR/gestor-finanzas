import ReactECharts from "echarts-for-react";

interface Props {
  ingreso: number;
  egreso: number;
}

const BarChart = ({ ingreso, egreso }: Props) => {
  const options = {
    title: {
      text: "Ingresos vs Egresos",
      left: "center",
    },
    xAxis: {
      type: "category",
      data: ["Ingresos", "Egresos"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [
          ingreso,
          {
            value: egreso,
            itemStyle: {
              color: "#a90000",
            },
          },
        ],
        type: "bar",
      },
    ],
  };

  return (
    <ReactECharts option={options} style={{ height: "400px", width: "100%" }} />
  );
};

export default BarChart;
