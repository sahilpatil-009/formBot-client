import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import styles from "./pageStyles/formAnalytics.module.css";
import { getAnalyticalData } from "../services/response.services";
import Loader from "../components/Loder";

ChartJS.register(ArcElement, Tooltip, Legend);

const FormAnalytics = ({ formid }) => {
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);
  const [views, setViews] = useState(0);
  const [starts, setStarts] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [completePeercent, setCompletePercent] = useState(0);

  const getResponseData = async () => {
    try {
      setLoading(true);
      if (!formid) {
        return console.log("id requires");
      }
      const res = await getAnalyticalData(formid);
      const data = await res.json();

      if (res.status === 200) {
        setResponseData(data.ResponseData);
        setViews(data.views);
        setStarts(data.starts);
        setCompleteCount(data.count);
        setDataAvailable(true);

        const percent = data.starts > 0 ? (data.count / data.starts) * 100 : 0;

        setCompletePercent(percent.toFixed(0));
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getResponseData();
  }, [formid]);

  const headers =
    responseData.length > 0 ? responseData[0].map((field) => field.name) : [];

  // Donut Chart Data

  const chartData = {
    labels: ["Completed", "Not Completed"],
    datasets: [
      {
        data: [
          ((completeCount / starts) * 100).toFixed(2) || 0,
          (100 - (completeCount / starts) * 100).toFixed(2) || 0,
        ],
        backgroundColor: ["#3B82F6", "#909090"],
        hoverBackgroundColor: ["#3B82F6", "#909090"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const value = tooltipItem.raw.toFixed(2);
            return `${value}%`;
          },
        },
      },
    },
    cutout: "70%", // Adjust inner radius
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {dataAvailable ? (
            <>
              <div className={styles.pre_analyticbox}>
                <div className={styles.Views}>
                  <h2>Views</h2>
                  <p>{views}</p>
                </div>
                <div className={styles.Views}>
                  <h2>Starts</h2>
                  <p>{starts}</p>
                </div>
              </div>
              <div className={styles.tableDiv}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Field Name</th>
                      {headers.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {responseData.length > 0 ? (
                      responseData.map((formResponse, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          {formResponse.map((field, fieldIndex) => (
                            <td key={fieldIndex}>{field.value}</td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={headers.length + 1}>No data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className={styles.graphstyl}>
                <div className={styles.chartContainer}>
                  <Doughnut data={chartData} options={chartOptions} />
                </div>
                <div className={styles.Views}>
                  <h2>Starts</h2>
                  <p>{completePeercent} % </p>
                </div>
              </div>
            </>
          ) : (
            <div className={styles.NoResponse}>No Response yet collected !</div>
          )}
        </>
      )}
    </div>
  );
};

export default FormAnalytics;
