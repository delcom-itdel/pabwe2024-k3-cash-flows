import React, { useState, useEffect } from "react";
import api from "../utils/api"; // Pastikan path ini benar dan mengarah ke file `api.js`

function CashFlowLabels() {
  const [labels, setLabels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLabels() {
      try {
        const token = api.getAccessToken();
        console.log("Token:", token); // Logging token

        if (!token) {
          throw new Error("No valid token found");
        }

        const cashFlows = await api.getAllCashFlows();
        const cashFlowLabels = cashFlows.map((cashFlow) => cashFlow.label);
        setLabels(cashFlowLabels);
      } catch (error) {
        setError(error.message);
      }
    }
    fetchLabels();
  }, []);

  return (
    <div className="container mt-5">
      <h1>Cash Flow Labels</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul className="list-group">
          {labels.length > 0 ? (
            labels.map((label, index) => (
              <li key={index} className="list-group-item">
                {label}
              </li>
            ))
          ) : (
            <li className="list-group-item">No Cash Flow Labels Available</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default CashFlowLabels;
