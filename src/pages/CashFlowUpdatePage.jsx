import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  asyncDetailCashFlow,
  asyncUpdateCashFlow,
  updateCashFlowActionCreator,
} from "../states/cashFlow/action";

const CashFlowUpdatePage = () => {
  const { id } = useParams(); // Get ID from URL
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the current cash flow details from the state
  const CashFlow = useSelector((state) => state.detailCashFlow);
  const isUpdateCashFlow = useSelector((state) => state.isUpdateCashFlow);

  // Form data state
  const [formData, setFormData] = useState({
    type: "",
    source: "",
    label: "",
    description: "",
    nominal: 0, // Initialize nominal as a number
  });

  // Fetch cash flow details when the page loads
  useEffect(() => {
    dispatch(asyncDetailCashFlow(id)); // Fetch cash flow details
  }, [dispatch, id]);

  // Fill form with existing cash flow data
  useEffect(() => {
    if (CashFlow) {
      setFormData({
        type: CashFlow.type,
        source: CashFlow.source,
        label: CashFlow.label,
        description: CashFlow.description,
        nominal: CashFlow.nominal,
      });
    }
  }, [CashFlow]);

  // Navigate when the cash flow is successfully updated
  useEffect(() => {
    if (isUpdateCashFlow) {
      navigate(`/cashflows/${id}`); // Redirect to cash flow detail page
      dispatch(updateCashFlowActionCreator(false)); // Reset update status
    }
  }, [isUpdateCashFlow, navigate, id, dispatch]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update form data dynamically
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(asyncUpdateCashFlow({ id, ...formData })); // Dispatch update action
      navigate(`/cashflows/${id}`); // Navigate to the detail page after update
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f7f9fc", // Light blue background
        borderRadius: "12px",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      }}
    >
      <h1
        style={{ textAlign: "center", marginBottom: "20px", color: "#007bff" }}
      >
        Edit Cash Flow
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <div>
          <label
            htmlFor="type"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Type:
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#e3f2fd", // Light blue background for the dropdown
              color: "#333",
              cursor: "pointer",
            }}
          >
            <option value="">Pilih Tipe</option>
            <option value="inflow">Inflow</option>
            <option value="outflow">Outflow</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="source"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Source:
          </label>
          <select
            id="source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#e3f2fd", // Light blue background for the dropdown
              color: "#333",
              cursor: "pointer",
            }}
          >
            <option value="">Pilih Sumber</option>
            <option value="cash">Cash</option>
            <option value="savings">Savings</option>
            <option value="loans">Loans</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="label"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Label:
          </label>
          <input
            type="text"
            id="label"
            name="label"
            value={formData.label}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#e8f5e9", // Light green background for inputs
              color: "#333",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#e8f5e9", // Light green background for textarea
              color: "#333",
            }}
          />
        </div>

        <div>
          <label
            htmlFor="nominal"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#333",
            }}
          >
            Nominal:
          </label>
          <input
            type="number"
            id="nominal"
            name="nominal"
            value={formData.nominal}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#e8f5e9", // Light green background for inputs
              color: "#333",
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 20px",
            backgroundColor: "#007bff", // Blue background for button
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
        >
          Update Cash Flow
        </button>
      </form>
    </div>
  );
};

export default CashFlowUpdatePage;
