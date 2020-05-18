import { createFakeWeightValue } from './createFakeWeightValue'

export const createFakeUserWeights = () => {
  const weights = {};
  for (let i = 1; i <= 10; i++ ) {
    weights[i] = createFakeUserWeight(i)
  }

  return weights
}

export const createFakeUserWeightsForDecisionTemplate = () => {
  const weights = {};
  for (let i = 1; i <= 10; i++ ) {
    weights[i] = createFakeUserWeightForDecisionTemplate(i)
  }

  return weights
}

export const createFakeUserWeight = (id) => {
  return {
    name: `Fake Weight ${id || Math.round(Math.random() * 500)}`,
    value: createFakeWeightValue()
  }
}

export const createFakeUserWeightForDecisionTemplate = (id) => {
  return {
    name: `Fake Weight ${id || Math.round(Math.random() * 500)}`,
    value: createFakeWeightValue(),
    description: "fake description",
  }
}