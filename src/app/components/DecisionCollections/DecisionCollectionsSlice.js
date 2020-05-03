import { createSlice } from '@reduxjs/toolkit';

export const decisionCollectionsInitialState = {
  1: {
    name: "Decision Collection 1",
    userWeights: {
      1: {
        name: "Weight 1",
        value: 0
      },
      2: {
        name: "Weight 2",
        value: 0
      }
    },
    optionCollection: {
      1: {
        name: "Option 1",
        weights: {
          1: {
            value: 0
          },
          2: {
            value: 0
          }
        }
      },
      2: {
        name: "Option 2",
        weights: {
          1: {
            value: 0
          },
          2: {
            value: 0
          }
        }
      }
    },    
  },
  2: {
    name: "Decision Collection 2",
    userWeights: {
      1: {
        name: "Weight 1",
        value: 0
      },
      2: {
        name: "Weight 2",
        value: 0
      }
    },
    optionCollection: {
      1: {
        name: "Option 1",
        weights: {
          1: {
            value: 0
          },
          2: {
            value: 0
          }
        }
      },
      2: {
        name: "Option 2",
        weights: {
          1: {
            value: 0
          },
          2: {
            value: 0
          }
        }
      }
    },    
  }
};

export const getHighestId = (collection) => {
  if (!collection) return 0;
  const collectionIds = Object.keys(collection);
  if(collectionIds.length < 1) { return 1; }
  return Math.max( ...collectionIds.map(id => parseInt(id)))
}

export const getNextId = (collection) => getHighestId(collection) + 1

export const decisionCollectionInitialState = {
  id: 1,
  name: "New Decision Collection",
  userWeights: [],
  optionCollection: [],
}

export const selectDecisionCollection = (state, id) => state[id]
export const selectUserWeights = (state, id) => selectDecisionCollection(state, id).userWeights
export const selectOptionCollection = (state, id) => selectDecisionCollection(state, id).optionCollection
export const selectUserWeight = (state, id, weightId) => selectUserWeights(state, id)[weightId]
export const selectOption = (state, id, optionId) => selectOptionCollection(state, id)[optionId]
export const selectOptionWeights = (state, id, optionId) => selectOption(state, id, optionId).weights
export const selectOptionWeight = (state, id, optionId, weightId) => selectOptionWeights(state, id, optionId)[weightId]

export const decisionCollectionsSlice = createSlice({
  name: 'decisionCollections',
  initialState: decisionCollectionsInitialState,
  reducers: {
    createDecisionCollection(state) {
      const id = getNextId(state);
      const newDC = {
        ...decisionCollectionInitialState,
        name: `Decision Collection ${id}`
      }

      state[id] = newDC
    },

    deleteDecisionCollection(state, action) {
      let { id } = action.payload

      delete state[id]
    },

    addDecisionCollectionUserWeight(state, action) {
      const { decisionCollectionId } = action.payload;
      let { name, value } = action.payload

      const userWeights = selectUserWeights(state, decisionCollectionId)
      
      const newUserWeightId = getNextId(userWeights);

      userWeights[newUserWeightId] = { name, value }
      
      // also update all of the options to have default value for new userWeight
      const optionCollection = selectOptionCollection(state, decisionCollectionId)

      let newOptionCollection = {}
      Object.keys(optionCollection).forEach(optionId => {
        const option = optionCollection[optionId];
        const newWeights = {
          ...option.weights,
          [newUserWeightId]: { 
            value : 0
          }
        }
        option.weights = newWeights
        newOptionCollection[optionId] = option
      })

      state[decisionCollectionId].optionCollection = newOptionCollection
    },

    updateDecisionCollectionUserWeight(state, action) {
      const { decisionCollectionId, id, name, value } = action.payload;

      const userWeight = selectUserWeight(state, decisionCollectionId, id)

      if (value) userWeight.value = value
      if (name) userWeight.name = name      
    },

    deleteDecisionCollectionUserWeight(state, action) {
      const { decisionCollectionId, id } = action.payload;

      const userWeights = selectUserWeights(state, decisionCollectionId)
      delete userWeights[id]
      
      // also remove the userWeight from the options
      const optionCollection = selectOptionCollection(state, decisionCollectionId)

      Object.keys(optionCollection).forEach(optionId => {
        const option = optionCollection[optionId];
        delete option.weights[id]
      })
    },

    createDecisionCollectionOption(state, action) {
      const { decisionCollectionId } = action.payload;

      const optionCollection = selectOptionCollection(state, decisionCollectionId)
      const userWeights = selectUserWeights(state, decisionCollectionId)

      const weights = Object.keys(userWeights).map(userWeightKey => {
        return {
          [userWeightKey]: {
            value: 0
          }
        }
      })

      const nextId = getNextId(optionCollection)

      optionCollection[nextId] = { 
        name: `Option ${nextId}`,
        weights
      }
    },

    updateDecisionCollectionOption(state, action) {
      const { decisionCollectionId, id, name } = action.payload;

      const option = selectOption(state, decisionCollectionId, id)
      // currently, you can only update the name
      if (name) option.name = name
    },

    deleteDecisionCollectionOption(state, action) {
      const { decisionCollectionId, id } = action.payload;

      const optionCollection = selectOptionCollection(state, decisionCollectionId)
      delete optionCollection[id]
    },

    updateDecisionCollectionOptionWeight(state, action) {
      const { decisionCollectionId, optionId, id, value } = action.payload;

      const weight = selectOptionWeight(state, decisionCollectionId, optionId, id)

      if (value) weight.value = value
    },
  },
});

export const {
  createDecisionCollection,
  deleteDecisionCollection,

  addDecisionCollectionUserWeight,
  updateDecisionCollectionUserWeight,
  deleteDecisionCollectionUserWeight,

  createDecisionCollectionOption,
  updateDecisionCollectionOption,
  deleteDecisionCollectionOption,

  updateDecisionCollectionOptionWeight,
} = decisionCollectionsSlice.actions;

export const selectDecisionCollections = state => state.decisionCollections;

export default decisionCollectionsSlice.reducer;