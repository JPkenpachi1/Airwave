import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axiosInstance from "../../config/axios";

const DonutChart = () => {
  const [chartData, setChartData] = useState({
    series: [0, 0, 0], // Default values to prevent issues
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Resolved", "Open", "In Progress"],
      colors: ["#bb86fc", "#dc3545", "#03dac6"], // Green, Red, Yellow
      title: {
        text: "Complaint Status Distribution",
        align: "center",
      },
      legend: {
        position: "bottom",
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("counts/");
        console.log("API Response:", response.data); // Debugging

        if (response.data) {
          setChartData((prevData) => ({
            ...prevData,
            series: [
              response.data.resolved_count ?? 0,
              response.data.open_count ?? 0,
              response.data.inProgress_count ?? 0
            ], // Use correct keys
          }));
        } else {
          console.error("Error: Expected counts not found in API response.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Chart options={chartData.options} series={chartData.series} type="donut" height={350} />
    </div>
  );
};

export default DonutChart;
