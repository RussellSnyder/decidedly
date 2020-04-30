import { createFakeOptionWeights } from './createFakeOptionWeights'

export const createFakeOption = (name = "Fake Option") => ({
  name,
  weights: createFakeOptionWeights()
})
