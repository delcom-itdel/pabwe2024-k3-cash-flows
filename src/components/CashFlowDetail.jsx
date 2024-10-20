import PropTypes from "prop-types";
import { CashFlowItemShape } from "./CashFlowItem"; // Pastikan CashFlowItemShape didefinisikan
import { postedAt } from "../utils/tools";
import { FaClock } from "react-icons/fa6"; // Pastikan ikon sudah diinstal

function CashFlowDetail({ cashFlow }) {
  let badgeStatus, badgeLabel;
  if (cashFlow.type === "inflow") {
    badgeStatus = "badge bg-success text-white ms-3";
    badgeLabel = "Inflow";
  } else {
    badgeStatus = "badge bg-danger text-white ms-3";
    badgeLabel = "Outflow";
  }

  return (
    <div className="card mt-3">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-12 d-flex">
            <h5>{cashFlow.label}</h5>
            <div>
              <span className={badgeStatus}>{badgeLabel}</span>
            </div>
          </div>
          <div className="col-12">
            <div className="text-sm op-5">
              <FaClock />
              <span className="ps-2">{postedAt(cashFlow.created_at)}</span>
            </div>
          </div>
          <div className="col-12">
            <hr />
            <p>{cashFlow.description}</p>
            <p>
              <strong>Nominal:</strong> Rp {cashFlow.nominal.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

CashFlowDetail.propTypes = {
  cashFlow: PropTypes.shape(CashFlowItemShape).isRequired, // Pastikan bentuk data cashFlow sesuai dengan CashFlowItemShape
};

export default CashFlowDetail;
