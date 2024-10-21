import React, { useState, useEffect } from "react";
import api from "../utils/api";
import "../styles/style.css";

function getCurrentDateTime() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(now.getDate()).padStart(2, "0")} ${String(
    now.getHours()
  ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(
    now.getSeconds()
  ).padStart(2, "0")}`;
}

function MonthlyCashFlowStats() {
  const [cashFlowData, setCashFlowData] = useState({
    inflow: {},
    outflow: {},
    total: {},
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const endDate = getCurrentDateTime();

    const fetchData = async () => {
      try {
        const result = await api.getMonthlyCashFlowStats({
          endDate: endDate,
          totalData: 12,
        });
        setCashFlowData({
          inflow: result.stats_inflow,
          outflow: result.stats_outflow,
          total: result.stats_cashflow,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="cashflow-stats-container">
      <h1>Monthly Cash Flow Stats</h1>
      {error ? <p>Error: {error}</p> : null}
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Inflow</th>
            <th>Outflow</th>
            <th>Total Cash Flow</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(cashFlowData.total).map((month) => (
            <tr key={month}>
              <td>{month}</td>
              <td>{cashFlowData.inflow[month]}</td>
              <td>{cashFlowData.outflow[month]}</td>
              <td>{cashFlowData.total[month]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MonthlyCashFlowStats;
