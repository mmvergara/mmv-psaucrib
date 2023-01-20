import { configureStore } from "@reduxjs/toolkit";
import AccountSlice from "./AccountSlice";
import UISlice from "./UISlice";

const StoreIndex = configureStore({
  reducer: {
    accountSlice: AccountSlice,
    uiSlice: UISlice,
  },
});

export default StoreIndex;
