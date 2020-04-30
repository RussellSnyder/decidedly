import { createFakeOptionWeights } from "./createFakeOptionWeights"
import { createFakeWeightValue } from './createFakeWeightValue'

export const createFakeOptionCollection = () => {
  let fakeIndex = 0;
  const options = [];
  for (let i = 0; i <= 5; i++ ) {
    options.push({
      id: fakeIndex,
      name: `option name ${fakeIndex}`,
      weights: createFakeOptionWeights()
    })
    fakeIndex++
  }

  return options
}

export const createFakeOptionCollectionFromUserWeights = (userWeights) => {  
  let fakeIndex = 0;
  const options = [];
  for (let i = 0; i <= 5; i++ ) {
    options.push({
      id: fakeIndex,
      name: `option name ${fakeIndex}`,
      weights: userWeights.map(weight => ({
        id: weight.id,
        name: weight.name,
        value: createFakeWeightValue()
      }))
    })
    fakeIndex++
  }

  return options
}