import PropTypes from "prop-types";
import { FaClock, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { postedAt } from "../utils/tools";

function CashFlowItem({ cashFlow, onDeleteCashFlow }) {
  let badgeStatus, badgeLabel;

  // Menentukan badge berdasarkan tipe cash flow (inflow atau outflow)
  if (cashFlow.type === "inflow") {
    badgeStatus = "badge bg-success text-white ms-2";
    badgeLabel = "Inflow";
  } else if (cashFlow.type === "outflow") {
    badgeStatus = "badge bg-danger text-white ms-2";
    badgeLabel = "Outflow";
  }

  // Fungsi untuk menangani penghapusan cash flow
  const handleDelete = () => {
    Swal.fire({
      title: "Hapus Cash Flow",
      text: `Apakah kamu yakin ingin menghapus cash flow: ${cashFlow.label}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Tetap Hapus",
      customClass: {
        confirmButton: "btn btn-danger me-3 mb-4",
        cancelButton: "btn btn-secondary mb-4",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        // Hapus cash flow jika id valid
        if (cashFlow.id && Number.isInteger(cashFlow.id)) {
          onDeleteCashFlow(cashFlow.id);
        } else {
          console.error("Invalid ID:", cashFlow.id);
        }
      }
    });
  };

  return (
    <div className="card mt-3" style={styles.card}>
      <div className="card-body" style={styles.cardBody}>
        <div style={styles.row}>
          <div style={styles.leftContent}>
            {/* Label and Badge aligned horizontally */}
            <div style={styles.labelContainer}>
              <h5 style={styles.title}>
                <Link
                  to={`/cashflows/${cashFlow.id}`}
                  className="text-decoration-none"
                  style={styles.link}
                >
                  {cashFlow.label}
                </Link>
              </h5>
              <span className={badgeStatus}>{badgeLabel}</span>
            </div>
            <p style={styles.description}>{cashFlow.description}</p>
            <p style={styles.nominal}>
              Nominal: Rp{cashFlow.nominal.toLocaleString()}
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-sm btn-outline-danger"
              style={styles.deleteButton}
            >
              <FaTrash /> Hapus
            </button>
          </div>
        </div>
        <div className="text-sm op-5" style={styles.timeInfo}>
          <FaClock />
          <span className="ps-2">{postedAt(cashFlow.created_at)}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "none",
  },
  cardBody: {
    padding: "20px",
    backgroundColor: "#f9fafc",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContent: {
    display: "flex",
    flexDirection: "column",
  },
  labelContainer: {
    display: "flex", // This ensures the label and badge are aligned horizontally
    alignItems: "center", // Vertically center the items
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
    marginRight: "10px", // Add space between the label and badge
  },
  link: {
    color: "#007bff",
    textDecoration: "none",
  },
  description: {
    color: "#666",
    fontSize: "14px",
  },
  nominal: {
    fontWeight: "bold",
    color: "#333",
  },
  deleteButton: {
    padding: "5px 10px",
    fontSize: "14px",
  },
  timeInfo: {
    fontSize: "12px",
    color: "#999",
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
};

CashFlowItem.propTypes = {
  // Properti yang diharapkan oleh komponen ini
  cashFlow: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    nominal: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteCashFlow: PropTypes.func.isRequired,
};

export default CashFlowItem;
