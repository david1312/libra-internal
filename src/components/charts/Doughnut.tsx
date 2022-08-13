import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const TotalHiredDoughnut = ({ data }: any) => {
  let dataLabels: string[] = [];
  let dataValues: number[] = [];

  data?.map((e: any) => {
    dataLabels.push(e.name);
    dataValues.push(e.count);
  });

  const dummy = {
    labels: dataLabels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: [
          "#4F77AA",
          "#AAC9DD",
          "#253DA1",
          "#33A9C4",
          "#48E9F1",
          "#63899E",
          "#C1E3ED",
          "#2F387B",
          "#1D2570",
          "#2F686F",
          "#33A9C4",
          "#B0DBF1",
          "#69A6D1",
          "#8C909C",
          "#02055A",
        ],
      },
    ],
  };

  return <Doughnut data={dummy} />;
};

export default TotalHiredDoughnut;
