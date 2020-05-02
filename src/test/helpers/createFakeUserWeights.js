import { createFakeWeightValue } from './createFakeWeightValue'

export const createFakeUserWeights = () => {
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

export const createFakeUserWeight = () => {
  return {
    id: 42,
    name: 'Fake Weight',
    value: createFakeWeightValue()
  }
}