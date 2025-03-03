import ReactECharts from "echarts-for-react";

interface Props {
  array: { name: string; value: number }[];
  text: string;
}

const PieChart = ({ array, text }: Props) => {
  const options = {
    title: {
      text: text,
      subtext: "",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        type: "pie",
        radius: "50%",
        data: array,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  return (
    <ReactECharts
      option={options}
      style={{ height: "400px", width: "500px" }}
    />
  );
};

export default PieChart;
