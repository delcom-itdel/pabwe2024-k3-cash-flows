import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CashFlowList from "../components/CashFlowList";
import {
  asyncGetCashFlows,
  asyncDeleteCashFlow,
  deleteCashFlowActionCreator,
} from "../states/cashFlow/action";
import Swal from "sweetalert2";

function HomePage() {
  const { cashFlows = [], isDeleteCashFlow = false } = useSelector(
    (states) => states
  );
  const queryParams = new URLSearchParams(location.search);
  const is_finished = queryParams.get("is_finished") || "";
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDeleteCashFlow) {
      Swal.fire({
        position: "center", // Ubah posisi notifikasi menjadi di tengah
        icon: "success",
        title: "Cash flow berhasil dihapus!",
        showConfirmButton: false,
        timer: 700,
      });
      dispatch(deleteCashFlowActionCreator(false));
    }
    dispatch(asyncGetCashFlows(is_finished));
  }, [dispatch, isDeleteCashFlow, is_finished]);

  const onDeleteCashFlow = (id) => {
    dispatch(asyncDeleteCashFlow(id));
  };

  return (
    <section>
      <div className="container pt-1">
        <CashFlowList
          cashFlows={cashFlows}
          onDeleteCashFlow={onDeleteCashFlow}
        />
      </div>
    </section>
  );
}

export default HomePage;
