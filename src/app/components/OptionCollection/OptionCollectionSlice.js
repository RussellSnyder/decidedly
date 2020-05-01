import { createSlice } from '@reduxjs/toolkit';

let nextOptionId = 0;

export const optionCollectionSlice = createSlice({
  name: 'optionCollection',
  initialState: [],
  reducers: {
    addOption: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(payload) {
        const { option } = payload
        const optionWithId = {
          id: nextOptionId++,
          ...option,
        }
        return { 
          payload: {...optionWithId }
        }
      }      
    },

    updateOption(state, action) {
      const { id, option: updatedOption } = action.payload
      let optionIndex = state.findIndex(option => option.id === id);      
      if (optionIndex !== -1) {
        state[optionIndex] = {
          id,
          ...updatedOption
        }
      }
    },

    deleteOption(state, action) {
      return state.filter(option => option.id !== action.payload.id);
    },
  },
});

export const { addOption, updateOption, deleteOption } = optionCollectionSlice.actions;

export const selectOptionCollection = state => state.optionCollection;
export const selectOptionInOptionCollection = (state, id) => state.optionCollection.find(option => option.id === id);

export default optionCollectionSlice.reducer;
