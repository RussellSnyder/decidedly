import { createSlice } from '@reduxjs/toolkit';

export const decisionCollectionsInitialState = {
  1: {
    name: "Decision Collection 1",
    userWeights: {
      1: {
        name: "Weight 1",
        value: 2
      },
      2: {
        name: "Weight 2",
        value: 4
      }
    },
    optionCollection: {
      1: {
        name: "Option 1",
        weights: {
          1: {
            value: 2
          },
          2: {
            value: 2
          }
        }
      },
      2: {
        name: "Option 2",
        weights: {
          1: {
            value: -7
          },
          2: {
            value: 1
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
        value: 4
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
            value: -2
          },
          2: {
            value: -5
          }
        }
      },
      2: {
        name: "Option 2",
        weights: {
          1: {
            value: 2
          },
          2: {
            value: 6
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

    updateDecisionCollectionName(state, action) {
      let { id, name } = action.payload

      state[id].name = name
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
      const { decisionCollectionId, userWeightId, name, value } = action.payload;

      const userWeight = selectUserWeight(state, decisionCollectionId, userWeightId)

      if (value !== undefined) userWeight.value = value
      if (name) userWeight.name = name      
    },

    deleteDecisionCollectionUserWeight(state, action) {
      const { decisionCollectionId, userWeightId } = action.payload;

      const userWeights = selectUserWeights(state, decisionCollectionId)
      delete userWeights[userWeightId]
      
      // also remove the userWeight from the options
      const optionCollection = selectOptionCollection(state, decisionCollectionId)

      Object.keys(optionCollection).forEach(optionId => {
        const option = optionCollection[optionId];
        delete option.weights[userWeightId]
      })
    },

    createDecisionCollectionOption(state, action) {
      const { decisionCollectionId } = action.payload;

      const optionCollection = selectOptionCollection(state, decisionCollectionId)
      const userWeights = selectUserWeights(state, decisionCollectionId)

      const weights = {};
      Object.keys(userWeights).forEach(userWeightKey => {
        weights[userWeightKey] = {
          value: 0
        }
      })

      const nextId = getNextId(optionCollection)

      optionCollection[nextId] = { 
        name: `Option ${nextId}`,
        weights
      }
    },

    updateDecisionCollectionOption(state, action) {
      const { decisionCollectionId, optionId, name } = action.payload;

      const option = selectOption(state, decisionCollectionId, optionId)
      // currently, you can only update the name
      if (name) option.name = name
    },

    deleteDecisionCollectionOption(state, action) {
      const { decisionCollectionId, optionId } = action.payload;

      const optionCollection = selectOptionCollection(state, decisionCollectionId)
      delete optionCollection[optionId]
    },

    updateDecisionCollectionOptionWeight(state, action) {
      const { decisionCollectionId, optionId, optionWeightId, value } = action.payload;

      const weight = selectOptionWeight(state, decisionCollectionId, optionId, optionWeightId)

      if (value !== undefined) weight.value = value
    },
  },
});

export const {
  createDecisionCollection,
  deleteDecisionCollection,
  updateDecisionCollectionName,

  addDecisionCollectionUserWeight,
  updateDecisionCollectionUserWeight,
  deleteDecisionCollectionUserWeight,

  createDecisionCollectionOption,
  updateDecisionCollectionOption,
  deleteDecisionCollectionOption,

  updateDecisionCollectionOptionWeight,
} = decisionCollectionsSlice.actions;

export const selectDecisionCollections = state => state.decisionCollections;
export const selectDecisionCollection = (state, id) => state[id]
export const selectUserWeights = (state, id) => selectDecisionCollection(state, id).userWeights
export const selectOptionCollection = (state, id) => selectDecisionCollection(state, id).optionCollection
export const selectUserWeight = (state, id, weightId) => selectUserWeights(state, id)[weightId]
export const selectOption = (state, id, optionId) => selectOptionCollection(state, id)[optionId]
export const selectOptionWeights = (state, id, optionId) => selectOption(state, id, optionId).weights
export const selectOptionWeight = (state, id, optionId, weightId) => selectOptionWeights(state, id, optionId)[weightId]


export default decisionCollectionsSlice.reducer;