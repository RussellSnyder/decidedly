import { createSlice } from '@reduxjs/toolkit';

let nextOptionId = 0;

export const optionSlice = createSlice({
  name: 'option',
  initialState: {
    id: "",
    name: "",
    weights: []
  },
  reducers: {
    initializeOption: {
      reducer(state, action) {
        const { id, name, weights } = action.payload

        return {
          ...state,
          id,
          name,
          weights
        }
      },
      prepare(payload) {
        const { userWeights } = payload;
        const weights = userWeights ? userWeights.map((weight, i) => {
          return {
            id: i,
            name: weight.name,
            value: 0,
          }
        }) : []

        const returnPayload = {
          id: nextOptionId++,
          name: `Option ${nextOptionId}`,
          weights
        }

        return { payload: returnPayload }
      }      
    },

    updateOptionWeightValue(state, action) {
      const { id, value } = action.payload
      const weight = state.weights.find(weight => weight.id === id)
      if (weight) {
        weight.value = value
      }
    },

    updateOptionName(state, action) {
      const { name } = action.payload
      return {
        ...state,
        name
      }
    },

    resetOptionWeights(state) {
      const weights = state.weights.map(weight => ({ ...weight, value: 0 }))
      return {
        ...state,
        weights
      }
    },
  },
});

export const {
  loadOptionWeights,
  resetOptionWeights,
  updateOptionWeightValue,
  updateOptionName,
  initializeOption
} = optionSlice.actions;

export const selectOption = state => state.option;

export default optionSlice.reducer;
