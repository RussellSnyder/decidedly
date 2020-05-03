import { createFakeDecisionCollection } from "./createFakeDecisionCollection"

export const createFakeDecisionCollections = () => {
  return {
    1: { ...createFakeDecisionCollection(1) },
    2: { ...createFakeDecisionCollection(2) },
    3: { ...createFakeDecisionCollection(3) },
  }
}