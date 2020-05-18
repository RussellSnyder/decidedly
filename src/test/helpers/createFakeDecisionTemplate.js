import { createFakeUserWeights } from "./createFakeUserWeights"

export const createFakeDecisionTemplate = (id = 0) => {
  const userWeights = createFakeUserWeights();
  return {
    name: `fake decision template ${id}`,
    author: `Decidey McDecideyFace`,
    date: `19870702`,
    description: `Change your life using science`,
    userWeights,
  }
}