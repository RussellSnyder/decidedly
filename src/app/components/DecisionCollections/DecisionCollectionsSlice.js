import { createSlice } from '@reduxjs/toolkit';

let mostRecentDCId = 0;
let nextUserWeightId = 0;
let nextOptionId = 0;

export const resetmostRecentDCId = () => {
  mostRecentDCId = 0
}

export const getHighestId = (collection) => {
  if (!collection || collection.length < 1) { return 0; }
  return parseInt(Math.max( ...collection.map(item => item.id)))
}

export const decisionCollectionInitialState = {
  id: mostRecentDCId,
  name: "New Decision Collection",
  userWeights: [],
  optionCollection: [],
}

export const getIndexFromId = (collection, id) => {
  if (id === undefined || !collection) return -1
  // must be == instead of === because it could be a string or int
  return collection.findIndex(item => {
    // eslint-disable-next-line eqeqeq
    return item.id == id
  })
}

export const getStateFromId = (collection, id) => {
  if (id === undefined || !collection) return null
  // must be == instead of === because it could be a string or int
  return collection.find(item => {
    // eslint-disable-next-line eqeqeq
    return item.id == id
  })
}

export const decisionCollectionsSlice = createSlice({
  name: 'decisionCollections',
  initialState: [],
  reducers: {
    createDecisionCollection(state) {
      mostRecentDCId = getHighestId(state) + 1
      let newDC = {
        ...decisionCollectionInitialState,
        id: mostRecentDCId
      }
      state.push(newDC)
    },
    updateDecisionCollectionUserWeight(state, action) {
      const { id, userWeight } = action.payload;

      const collectionIndex = getIndexFromId(state, id)

      let userWeightIndex = getIndexFromId(state[collectionIndex].userWeights, userWeight.id)
      
      if (userWeightIndex === -1) {
        nextUserWeightId = getHighestId(state[collectionIndex].userWeights) + 1;

        state[collectionIndex].userWeights.push({
          ...userWeight,
          id: nextUserWeightId 
        })
      } else {
        state[collectionIndex].userWeights[userWeightIndex] = userWeight
      }
    },
    updateDecisionCollectionUserWeightName(state, action) {
      const { id, userWeightId, name } = action.payload;

      const collectionIndex = getIndexFromId(state, id)
      let userWeightIndex = getIndexFromId(state[collectionIndex].userWeights, userWeightId)
      
      state[collectionIndex].userWeights[userWeightIndex].name = name
    },
    updateDecisionCollectionUserWeightValue(state, action) {
      const { id, userWeightId, value } = action.payload;

      const collectionIndex = getIndexFromId(state, id)
      let userWeightIndex = getIndexFromId(state[collectionIndex].userWeights, userWeightId)
      
      state[collectionIndex].userWeights[userWeightIndex].value = value
    },
    // TODO test me
    deleteDecisionCollectionUserWeight(state, action) {
      const { id, userWeight } = action.payload;

      const collectionIndex = getIndexFromId(state, id)

      state[collectionIndex].userWeights = state[collectionIndex].userWeights.filter(weight => {
        return weight.id !== userWeight.id
      })
    },

    updateDecisionCollectionOptionName(state, action) {
      const { id, option } = action.payload;

      const collectionIndex = getIndexFromId(state, id)
      let optionIndex = getIndexFromId(state[collectionIndex].optionCollection, option.id)
      
      if (optionIndex === -1) {
        state[collectionIndex].optionCollection[optionIndex].name = option.name
      }
    },

    updateDecisionCollectionOptionWeight(state, action) {
      const { id, optionId, weightId, value } = action.payload;
      const decisionCollectionIndex = getIndexFromId(state, id)
      const optionIndex = getIndexFromId(state[decisionCollectionIndex].optionCollection, optionId)
      const weightIndex = getIndexFromId(state[decisionCollectionIndex].optionCollection[optionIndex].weights, weightId)
      state[decisionCollectionIndex].optionCollection[optionIndex].weights[weightIndex].value = value
    },

    // todo test me
    createDecisionCollectionOption(state, action) {
      const { id } = action.payload;

      const collectionIndex = getIndexFromId(state, id)
      const weights = state[collectionIndex].userWeights;
      
      state[collectionIndex].optionCollection.push({
        id: nextOptionId,
        name: `Option ${nextOptionId++}`,
        weights: weights.map(weight => ({
          id: weight.id,
          value: 0      
        }))
      })
    },
    // todo test me
    deleteDecisionCollectionOption(state, action) {
      const { id, option } = action.payload;

      const collectionIndex = getIndexFromId(state, id)

      const optionCollection = state[collectionIndex].optionCollection;
      return optionCollection.filter(oldOption => {
        return oldOption.id != option.id
      })
    },

    updateDecisionCollectionName(state, action) {
      let { id, name } = action.payload
      // eslint-disable-next-line eqeqeq
      const decisionCollectionIndex = getIndexFromId(state, id)

      state[decisionCollectionIndex].name = name
    },
    deleteDecisionCollection(state, action) {
      let { id } = action.payload

      return state.filter(dc => dc.id != id)
    },
  },
});

export const {
  createDecisionCollection,
  updateDecisionCollectionUserWeight,
  deleteDecisionCollectionUserWeight,
  updateDecisionCollectionOption,
  deleteDecisionCollectionOption,
  updateDecisionCollectionName,
  updateDecisionCollectionOptionWeight,
  deleteDecisionCollection,
  createDecisionCollectionOption
} = decisionCollectionsSlice.actions;

export const selectDecisionCollections = state => state.decisionCollections;

export default decisionCollectionsSlice.reducer;