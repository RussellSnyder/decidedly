import { createSlice } from '@reduxjs/toolkit';

let nextUserWeightId = 0;

export const userWeightsSlice = createSlice({
  name: 'userWeights',
  initialState: [],
  reducers: {
    addUserWeight: {
      reducer(state, action) {
        const { id, name, value } = action.payload
        state.push({ id, name, value })
      },
      prepare(payload) {
        const { name, value } = payload
        return { payload: { name, value, id: nextUserWeightId++ }}
      }      
    },
    deleteUserWeight(state, action) {
      const { id } = action.payload
      return state.filter(weight => weight.id !== id);
    },
    updateUserWeightValue(state, action) {
      const { id, value } = action.payload
      const weight = state.find(weight => weight.id === id)
      if (weight) {
        weight.value = value
      }
    },
    updateUserWeightName(state, action) {
      const { id, name } = action.payload

      const weight = state.find(weight => weight.id === id)
      if (weight) {
        weight.name = name
      }
    },
  },
});

export const { deleteUserWeight, addUserWeight, updateUserWeightValue, updateUserWeightName } = userWeightsSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUserWeights = state => state.userWeights;

export default userWeightsSlice.reducer;
