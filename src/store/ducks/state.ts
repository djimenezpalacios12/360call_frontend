import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface State {
  loading: boolean;
}

const nameSlice = "STATE";
const initialState: State = {
  loading: false,
};

export const app = createSlice({
  name: nameSlice,
  initialState,
  reducers: {
    setLoading: (state: State, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    // Reset Redux State
    resetApp(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { resetApp, setLoading } = app.actions;
export default app.reducer;
