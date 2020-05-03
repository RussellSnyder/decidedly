import { createFakeOptionCollectionFromUserWeights } from "./createFakeOptionCollection"
import { createFakeUserWeights } from "./createFakeUserWeights"

export const createFakeDecisionCollection = (id = 0) => {
  const userWeights = createFakeUserWeights();
  return {
    name: `fake decision collection ${id}`,
    userWeights,
    optionCollection: createFakeOptionCollectionFromUserWeights(userWeights)
  }
}