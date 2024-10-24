import { ActionType } from "./action";

// Reducer untuk menangani cash flows
function cashFlowsReducer(cashFlows = [], action = {}) {
  switch (action.type) {
    case ActionType.GET_CASH_FLOW:
      return action.payload.cashFlows || []; // Mengembalikan array cash flows
    default:
      return cashFlows;
  }
}

function isAddCashFlowReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.ADD_CASH_FLOW:
      return action.payload.status;
    default:
      return status;
  }
}

function isDeleteCashFlowReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.DELETE_CASH_FLOW:
      return action.payload.status;
    default:
      return status;
  }
}

function isUpdateCashFlowReducer(status = false, action = {}) {
  switch (action.type) {
    case ActionType.UPDATE_CASH_FLOW:
      return action.payload.status;
    default:
      return status;
  }
}

function detailCashFlowReducer(cashFlow = null, action = {}) {
  switch (action.type) {
    case ActionType.DETAIL_CASH_FLOW:
      return action.payload.cashFlow;
    default:
      return cashFlow;
  }
}

export {
  cashFlowsReducer,
  isAddCashFlowReducer,
  isDeleteCashFlowReducer,
  isUpdateCashFlowReducer,
  detailCashFlowReducer,
};
