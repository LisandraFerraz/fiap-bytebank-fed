import { useEffect, useRef, useState } from "react";
import { UseCharts } from "../../../utils/hooks/useCharts";
import { IExpansesChart } from "../../../utils/interfaces/charts";
import * as echarts from "echarts";
import { WidgetLayout } from "../widget-layout";

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
          top: "middle",
        },
        tooltip: {
          trigger: "item",
        },
        title: { text: "Gastos", left: "left" },
        data: data,
        color: ["#d3eef3", "#004d61"],
        series: [
          { center: ["70%", "60%"], radius: "60%", type: "pie", data: data },
        ],
      });
      return () => pieChartInstance.dispose();
    }
  };

  return (
    <WidgetLayout>
      <div ref={pieChartRef} style={{ width: "300px", height: "200px" }} />
    </WidgetLayout>
  );
};
