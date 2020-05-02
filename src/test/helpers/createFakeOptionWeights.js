import { createFakeWeightValue } from './createFakeWeightValue'

export const createFakeOptionWeights = () => {
  const weights = [];
  let fakeIndex = 0;
  for (let i = 0; i <= 10; i++ ) {
    weights.push({
      id: fakeIndex,
      name: `Weight name ${i}`,
      value: createFakeWeightValue()
    })
    fakeIndex++
  }

  return weights
}

export const createFakeOptionWeightForUserWeights = (userWeights) => {
  const weights = [];
  let fakeIndex = 0;
  for (let i = 0; i <= userWeights.length; i++ ) {
    weights.push({
      id: fakeIndex,
      name: `Weight name ${i}`,
      value: createFakeWeightValue()
    })
    fakeIndex++
  }

  return weights
}
