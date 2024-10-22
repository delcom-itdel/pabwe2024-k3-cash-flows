import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import api from "../utils/api"; // Ensure this path is correct

function CashFlowLabels() {
  const [labels, setLabels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Use useNavigate for navigation in React Router v6

  useEffect(() => {
    async function fetchLabels() {
      try {
        const token = api.getAccessToken();
        if (!token) {
          throw new Error("No valid token found");
        }

        const cashFlows = await api.getAllCashFlows();
        const cashFlowLabels = cashFlows.map((cashFlow) => ({
          label: cashFlow.label,
          id: cashFlow.id, // Assuming each cashFlow has an 'id'
        }));
        setLabels(cashFlowLabels);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLabels();
  }, []);

  // Handle click event to navigate to the detail page
  const handleLabelClick = (id) => {
    navigate(`/cashflows/${id}`); // Navigate to detail page based on ID
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 style={{ fontSize: "2.5rem", color: "#333", marginBottom: "30px" }}>
        Cash Flow Labels
      </h1>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              border: "6px solid #f3f3f3",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              borderTop: "6px solid #3498db",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ marginLeft: "10px" }}>Loading...</p>
        </div>
      ) : error ? (
        <p style={{ color: "red", fontSize: "1.5rem" }}>Error: {error}</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            padding: "20px",
          }}
        >
          {labels.length > 0 ? (
            labels.map((cashFlow, index) => (
              <div
                key={index}
                onClick={() => handleLabelClick(cashFlow.id)} // Add click event handler
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                  padding: "10px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  width: "100%",
                  maxWidth: "600px",
                  borderLeft: "5px solid #007bff",
                  cursor: "pointer", // Show pointer on hover to indicate it's clickable
                }}
              >
                <h2 style={{ color: "#007bff", margin: 0, fontSize: "1.2rem" }}>
                  {cashFlow.label}
                </h2>
              </div>
            ))
          ) : (
            <div style={{ fontSize: "1.5rem", color: "#666" }}>
              No Cash Flow Labels Available
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CashFlowLabels;
