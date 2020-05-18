import { createFakeDecisionTemplate } from "./createFakeDecisionTemplate"

export const createFakeDecisionTemplates = () => {
  return {
    1: { ...createFakeDecisionTemplate(1) },
    2: { ...createFakeDecisionTemplate(2) },
    3: { ...createFakeDecisionTemplate(3) },
  }
}