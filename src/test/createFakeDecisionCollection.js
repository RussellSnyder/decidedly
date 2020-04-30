import { createFakeOptionCollectionFromUserWeights } from "./createFakeOptionCollection"
import { createFakeUserWeights } from "./createFakeUserWeights"

export const createFakeDecisionCollection = (userWeights = createFakeUserWeights()) => {
  return {
    id: "",
    name: "fake decision collection",
    userWeights,
    optionCollection: createFakeOptionCollectionFromUserWeights(userWeights)
  }
}