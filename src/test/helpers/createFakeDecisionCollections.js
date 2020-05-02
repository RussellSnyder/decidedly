import { createFakeDecisionCollection } from "./createFakeDecisionCollection"

export const createFakeDecisionCollections = () => {
  return [
    createFakeDecisionCollection(null, 0),
    createFakeDecisionCollection(null, 1),
    createFakeDecisionCollection(null, 2),
    createFakeDecisionCollection(null, 3),
  ]
}