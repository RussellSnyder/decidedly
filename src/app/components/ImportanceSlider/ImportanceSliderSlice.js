import { createSlice } from '@reduxjs/toolkit';

export const IMPORTANCE_SLIDER_MAX = 7;
export const IMPORTANCE_SLIDER_MIN = -7;

export const importanceSliderSlice = createSlice({
  name: 'importanceSlider',
  initialState: {
    value: 0,
  },
  reducers: {
    increment: state => {
      if (state.value >= IMPORTANCE_SLIDER_MAX) return
      state.value += 1;
    },
    decrement: state => {
      if (state.value <= IMPORTANCE_SLIDER_MIN) return
      state.value -= 1;
    },
    setValue: (state, action) => {
      state.value = action.payload
    }
  },
});

export const { increment, decrement, setValue } = importanceSliderSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectWeightingSlider = state => state.importanceSlider.value;

export default importanceSliderSlice.reducer;
