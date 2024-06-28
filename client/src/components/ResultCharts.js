import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const ResultsChart = ({ data }) => {
  const codingResults = {
    Pass: 0,
    Fail: 0,
  };

  const videoInterviewResults = {
    Pass: 0,
    Fail: 0,
  };

  data.forEach((candidate) => {
    codingResults[candidate.codingResults]++;
    videoInterviewResults[candidate.videoInterviewResults]++;
  });

  const barChartData = {
    labels: ["Pass", "Fail"],
    datasets: [
      {
        label: "Coding Results",
        data: [codingResults.Pass, codingResults.Fail],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Video Interview Results",
        data: [videoInterviewResults.Pass, videoInterviewResults.Fail],
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const pieChartData = {
    labels: ["Coding Pass", "Coding Fail", "Video Pass", "Video Fail"],
    datasets: [
      {
        data: [
          codingResults.Pass,
          codingResults.Fail,
          videoInterviewResults.Pass,
          videoInterviewResults.Fail,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Coding and Video Interview Results",
      },
    },
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-center items-center gap-20 mt-10">
        <div className="w-full md:w-1/2 h-96">
          <Bar data={barChartData} options={options} />
        </div>
        <div className="w-full md:w-1/2 h-96">
          <Pie data={pieChartData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default ResultsChart;
