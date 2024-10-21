import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { asyncDetailCashFlow } from "../states/cashFlow/action";

const CashFlowDetailPage = () => {
  const { id } = useParams(); // Get cash flow ID from URL
  const dispatch = useDispatch();

  // Get cash flow details from the state
  const cashFlow = useSelector((state) => state.detailCashFlow);

  // Fetch cash flow details when the page loads
  useEffect(() => {
    dispatch(asyncDetailCashFlow(id)); // Fetch cash flow details
  }, [dispatch, id]);

  if (!cashFlow) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="container"
      style={{
        maxWidth: "650px",
        margin: "40px auto",
        padding: "20px",
        backgroundColor: "#e3f2fd", // Light blue background for the container
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      }}
    >
      <div
        className="card"
        style={{
          padding: "25px",
          borderRadius: "10px",
          backgroundColor: "#ffffff", // White background for the card
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)", // Light shadow for a soft effect
          borderLeft: "6px solid #1e88e5", // Add a blue accent on the left
        }}
      >
        <div className="card-body">
          <h2
            style={{
              marginBottom: "15px",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#1e88e5", // Blue color for the title
            }}
          >
            {cashFlow.label}
          </h2>

          <div
            style={{
              fontSize: "14px",
              color: "#555",
              marginBottom: "20px",
              lineHeight: "1.6", // Improve readability with better line spacing
            }}
          >
            <strong>Type:</strong>{" "}
            <span
              style={{
                color: cashFlow.type === "inflow" ? "#43a047" : "#e53935", // Green for inflow, red for outflow
                fontWeight: "bold",
              }}
            >
              {cashFlow.type}
            </span>{" "}
            <br />
            <strong>Source:</strong> {cashFlow.source}
          </div>

          <p
            style={{
              fontSize: "16px",
              marginBottom: "20px",
              color: "#444",
              fontWeight: "normal",
            }}
          >
            {cashFlow.description}
          </p>

          <p
            style={{
              fontSize: "18px",
              marginBottom: "25px",
              color: "#ff7043", // Orange for nominal
              fontWeight: "bold",
            }}
          >
            <strong>Nominal:</strong> Rp {cashFlow.nominal.toLocaleString()}
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #e9ecef",
              paddingTop: "15px",
            }}
          >
            <span
              style={{
                fontSize: "12px",
                color: "#888",
              }}
            >
              {new Date(cashFlow.created_at).toLocaleTimeString()} -{" "}
              {new Date(cashFlow.created_at).toLocaleDateString()}
            </span>
            <Link
              to={`/cashflows/${id}/edit`}
              className="btn btn-primary"
              style={{
                padding: "10px 16px",
                fontSize: "14px",
                backgroundColor: "#1e88e5",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "6px",
                border: "none",
                transition: "background-color 0.3s",
              }}
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CashFlowDetailPage;
