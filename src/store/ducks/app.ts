import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { AppStore, User } from "@/interfaces/app.interfaces";

const nameSlice = "APP";
const initialState: AppStore = {
  user: {
    email: "",
    nombre: "",
    empresa: "",
    rol: "",
    token: "",
  },
};

export const app = createSlice({
  name: nameSlice,
  initialState,
  reducers: {
    // * MOCK: Example reducer
    // setAuth: (state: AppStore, action: PayloadAction<User>) => {
    //   return { ...state, user: action.payload };
    // },
    // Reset Redux State
    resetApp(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { resetApp } = app.actions;
export default app.reducer;
