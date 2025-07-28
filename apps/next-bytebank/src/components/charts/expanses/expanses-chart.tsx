import { useEffect, useRef, useState } from "react";
import { UseCharts } from "../../../utils/hooks/useCharts";
import { IExpansesChart } from "../../../utils/interfaces/charts";
import * as echarts from "echarts";

export const ExpansesChart = () => {
  const pieChartRef = useRef<HTMLDivElement>(null);
  const { expansesChart } = UseCharts();

  const [chartData, setChartData] = useState<IExpansesChart>();

  useEffect(() => {
    const getdata = async () => {
      const chartData = await expansesChart();
      const { data } = await chartData;
      setChartData(chartData);
      if (chartData) {
        initPieChart(data);
      }
    };

    getdata();
  }, []);

  const initPieChart = (data: any) => {
    const pieChartInstance = echarts.init(pieChartRef.current);
    if (pieChartInstance !== undefined) {
      pieChartInstance.setOption({
        legend: {
          orient: "vertical",
          left: "left",
        },
        tooltip: {
          trigger: "item",
        },
        title: { text: "Últimos registros de gastos", left: "center" },
        data: data,

        series: [{ type: "pie", data: data }],
      });
      return () => pieChartInstance.dispose();
    }
  };

  return (
    <>
      <h1>Hello</h1>
      <div ref={pieChartRef} style={{ width: "100%", height: "400px" }} />
    </>
  );
};
