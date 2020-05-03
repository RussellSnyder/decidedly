import { createFakeWeightValue } from './createFakeWeightValue'

export const createFakeOptionWeights = () => {
  const weights = {};
  for (let i = 0; i <= 10; i++ ) {
    weights[i] = {
      name: `Weight name ${i}`,
      value: createFakeWeightValue()
    }
  }

  return weights
}