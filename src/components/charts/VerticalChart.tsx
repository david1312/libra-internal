import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const colors = [
  "#A70000",
  "#CA2253",
  "#9C5464",
  "#E95302",
  "#BC6470",
  "#E22030",
  "#A41444",
  "#ED978D",
  "#D8210B",
  "#E55640",
  "#F29F83",
  "#ED6464",
  "#8C0D07",
  "#FFC496",
  "#752929",
];

const VerticalChart = ({ data }: any) => {
  let dataLabels: string[] = [];
  let dataValues: number[] = [];

  data?.map((e: any) => {
    dataLabels.push(e.name);
    dataValues.push(e.count);
  });

  const options: any = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          title: (context: any) => {
            return context[0].label.replaceAll(",", " ");
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  const adjustedLabels = dataLabels.map((label) => label.split(" "));

  const chartData = {
    labels: adjustedLabels,
    datasets: [
      {
        label: "Total Data",
        data: dataValues,
        backgroundColor: colors,
      },
    ],
  };

  return <Bar options={options} data={chartData} />;
};

export default VerticalChart;
