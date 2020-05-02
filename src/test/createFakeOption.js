import { createFakeOptionWeights } from './helpers/createFakeOptionWeights'

export const createFakeOption = (name = "Fake Option") => ({
  name,
  weights: createFakeOptionWeights()
})
