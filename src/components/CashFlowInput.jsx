import { useState } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

function CashFlowInput({ onAddCashFlow }) {
  const [type, setType] = useState("");
  const [source, setSource] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [nominal, setNominal] = useState("");

  const handleOnAddCashFlow = (e) => {
    e.preventDefault();

    if (!type || !source || !label || !description || nominal <= 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Semua field harus diisi dan nominal harus lebih dari 0.",
      });
      return;
    }

    onAddCashFlow({
      type,
      source,
      label,
      description,
      nominal: parseFloat(nominal),
    });
  };

  return (
    <form onSubmit={handleOnAddCashFlow}>
      <div className="mb-3">
        <label htmlFor="inputType" className="form-label">
          Tipe
        </label>
        <select
          id="inputType"
          className="form-select"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="">Pilih Tipe</option>
          <option value="inflow">Inflow</option>
          <option value="outflow">Outflow</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="inputSource" className="form-label">
          Sumber
        </label>
        <select
          id="inputSource"
          className="form-select"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          required
        >
          <option value="">Pilih Sumber</option>
          <option value="cash">Cash</option>
          <option value="savings">Savings</option>
          <option value="loans">Loans</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="inputLabel" className="form-label">
          Label
        </label>
        <input
          type="text"
          id="inputLabel"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="inputDescription" className="form-label">
          Deskripsi
        </label>
        <textarea
          rows="5"
          id="inputDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-control"
          required
        ></textarea>
        <div className="text-end">
          <span>{description.length}/1000</span>
        </div>
      </div>

      <div className="mb-3">
        <label htmlFor="inputNominal" className="form-label">
          Nominal
        </label>
        <input
          type="number"
          id="inputNominal"
          value={nominal}
          onChange={(e) => setNominal(e.target.value)}
          className="form-control"
          required
          min="1"
        />
      </div>

      <div className="mb-4 text-end mt-3">
        <button type="submit" className="btn btn-primary">
          Simpan
        </button>
      </div>
    </form>
  );
}

CashFlowInput.propTypes = {
  onAddCashFlow: PropTypes.func.isRequired,
};

export default CashFlowInput;
