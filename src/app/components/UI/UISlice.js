import { createSlice } from '@reduxjs/toolkit';

export const UIInitialState = {
  loginFormOpen: false,
  navbarOpen: false,
};

export const UISlice = createSlice({
  name: 'ui',
  initialState: UIInitialState,
  reducers: {
    setLoginFormOpen(state, action) {
      const { open } = action.payload

      if (open !== undefined) {
        state.loginFormOpen = open
      }
    },
  },
});

export const {
  setLoginFormOpen,
} = UISlice.actions;

export const selectUI = state => state.ui;

export default UISlice.reducer;