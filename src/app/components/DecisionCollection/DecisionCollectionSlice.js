import { createSlice } from '@reduxjs/toolkit';

export const decisionCollectionSlice = createSlice({
  name: 'decisionCollection',
  initialState: {
    id: "",
    name: "",
    userWeights: [],
    optionCollection: [],
  },
  reducers: {
    updateDecisionCollectionName(state, action) {
      state.name = action.payload.name
    },
    updateDecisionCollectionUserWeights(state, action) {
      state.userWeights = action.payload.userWeights
    },
    updateDecisionCollectionOptionCollection(state, action) {
      state.optionCollection = action.payload.optionCollection
    },
  },
});

export const {
  updateDecisionCollectionName,
  updateDecisionCollectionUserWeights,
  updateDecisionCollectionOptionCollection
} = decisionCollectionSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectDecisionCollection = state => state;
export const selectDecisionCollectionName = state => state.name;
export const selectDecisionCollectionUserWeights = state => state.userWeights;
export const selectupdateDecisionCollectionOptionCollection = state => state.optionCollection;

export default decisionCollectionSlice.reducer;
