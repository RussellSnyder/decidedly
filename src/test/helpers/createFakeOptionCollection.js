import { createFakeOptionWeights } from "./createFakeOptionWeights"
import { createFakeWeightValue } from './createFakeWeightValue'

export const createFakeOptionCollection = () => {
  const options = {};
  for (let i = 0; i <= 5; i++ ) {
    options[i] = {
      name: `option name ${i}`,
      weights: createFakeOptionWeights()
    }
  }
}

export const createFakeOptionCollectionFromUserWeights = (userWeights) => {  
  const options = {};
  for (let i = 0; i <= 5; i++ ) {
    const weights = {}
    Object.keys(userWeights).forEach(weightId => {
      weights[weightId] = {
        value: createFakeWeightValue
      }
    })
    options[i] = {
      name: `option name ${i}`,
      weights
    }
  }

  return options
}