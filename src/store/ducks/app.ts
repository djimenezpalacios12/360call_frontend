import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { AppStore, User } from "@/interfaces/app.interfaces";

const nameSlice = "APP";
const initialState: AppStore = {
  user: {
    _id: "",
    email: "",
    nombre: "",
    rol: "",
    token: "",
  },
};

export const app = createSlice({
  name: nameSlice,
  initialState,
  reducers: {
    setAuth: (state: AppStore, action: PayloadAction<User>) => {
      return { ...state, user: action.payload };
    },
    // Reset Redux State
    resetApp(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { resetApp, setAuth } = app.actions;
export default app.reducer;
