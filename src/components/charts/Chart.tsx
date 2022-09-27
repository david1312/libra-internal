import { Radio } from "antd";
import { useState, useEffect, useRef, memo } from "react";

interface Props {
  options: any;
  width: string;
  height: string;
}

let chartjs: any = null;

const ChartEl = memo((props: Props) => {
  const ref = useRef(null);
  const [type, setType] = useState("line");
  useEffect(() => {
    if (chartjs) {
      chartjs.destroy();
    }

    const thisWindow: any = window;
    chartjs = new thisWindow.Chart(ref.current);

    chartjs.options.scales = {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Date",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      yAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
            labelString: "Value",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    };

    chartjs.config = {
      type: type,
      data: {
        labels: props.options?.date,
        datasets: [
          {
            label: "Success",
            backgroundColor: "#73d13d",
            borderColor: "#3f8600",
            data: props.options?.success,
            fill: false,
          },
          {
            label: "Failed",
            fill: false,
            backgroundColor: "#cf1322",
            borderColor: "#cf1322",
            data: props.options?.failed,
          },
          {
            label: "On Going",
            fill: false,
            backgroundColor: "#ffa500",
            borderColor: "#ffa500",
            data: props.options?.onGoing,
          },
        ],
      },
      options: {
        responsive: true,
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
      },
    };
    chartjs.update();
  }, [props.options, type]);

  return (
    <div
      style={{
        position: "relative",
        height: props.height,
        width: props.width,
      }}
    >
      <Radio.Group
        options={[
          { label: "Line", value: "line" },
          { label: "Bar", value: "bar" },
        ]}
        onChange={(e) => {
          setType(e.target.value);
        }}
        value={type}
        optionType="button"
      />
      <canvas ref={ref} width={props.height} height="100%" />
    </div>
  );
});

export default ChartEl;
