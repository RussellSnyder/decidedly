import { createFakeOptionCollectionFromUserWeights } from "./createFakeOptionCollection"
import { createFakeUserWeights } from "./createFakeUserWeights"

export const createFakeDecisionCollection = (userWeights, id = "") => {
  return {
    id,
    name: `fake decision collection ${id}`,
    userWeights: userWeights || createFakeUserWeights(),
    optionCollection: userWeights ? createFakeOptionCollectionFromUserWeights(userWeights) : createFakeUserWeights()
  }
}