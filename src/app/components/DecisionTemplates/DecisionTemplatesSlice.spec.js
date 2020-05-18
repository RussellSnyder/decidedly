import decisionTemplates, {
  createDecisionTemplate,
  deleteDecisionTemplate,
  updateDecisionTemplateName,
  addDecisionTemplateUserWeight,
  updateDecisionTemplateUserWeight,
  deleteDecisionTemplateUserWeight,
  selectDecisionTemplates,
  selectDecisionTemplate,
  selectUserWeights,
  selectUserWeight,
  decisionTemplatesInitialState,
  } from './DecisionTemplatesSlice';

import { 
  createFakeDecisionTemplates,
  createFakeDecisionTemplate,
  createFakeUserWeightsForDecisionTemplate,
  createFakeUserWeightForDecisionTemplate,
  createFakeWeightValue
} from "../../../test/helpers";

const initialStateSize = Object.keys(decisionTemplatesInitialState).length

describe('decisionTemplatesSlice', () => {
  let testDecisionTemplateId
  let testUserWeightId

  beforeEach(() => {
    testDecisionTemplateId = Math.random < 0.5 ? 1 : 2;
    testUserWeightId = Math.random < 0.5 ? 1 : 2;
  })

  describe('selects', () => {
    let state;
    beforeEach(() => {
      state = decisionTemplatesInitialState;
    })
    afterEach(() => {
      expect(state).toEqual(decisionTemplatesInitialState, "immutible")
    })
    describe('selectDecisionTemplate', () => {
      it('returns a decisionTemplate with the passed id', () => {
        const testValue = selectDecisionTemplate(state, testDecisionTemplateId)
        const expectedValue = state[testDecisionTemplateId]
        expect(testValue).toBe(expectedValue)
      })
    }) 
    describe('selectUserWeights', () => {
      it('returns UserWeights with the passed id', () => {
        const testValue = selectUserWeights(state, testDecisionTemplateId)
        const expectedValue = state[testDecisionTemplateId].userWeights
        expect(testValue).toBe(expectedValue)
      })
    }) 
    describe('selectUserWeight', () => {
      it('returns an UserWeight with the passed id', () => {
        const testValue = selectUserWeight(state, testDecisionTemplateId, testUserWeightId)
        const expectedValue = state[testDecisionTemplateId].userWeights[testUserWeightId]
        expect(testValue).toBe(expectedValue)
      })
    }) 
  })

  describe('reducer', () => {
    it('handles initial state', () => {
      expect(decisionTemplates(undefined, {})).toEqual(decisionTemplatesInitialState)
    })
    describe('Decision Template CRUD', () => {
      let testState;
      beforeEach(() => {
        testState = decisionTemplates(undefined, {
          type: createDecisionTemplate.type
        })
      })
      describe("createDecisionTemplate", () => {
        it('creates a decision Template | empty state', () => {  
          expect(Object.keys(testState)).toHaveLength(initialStateSize + 1)
          expect(testState[3]).toBeDefined()
        })

        it('generates incrementing DecisionTemplate IDs', () => {  
          const testState2 = decisionTemplates(testState, {
            type: createDecisionTemplate.type
          })
    
          expect(Object.keys(testState2)).toHaveLength(Object.keys(testState).length + 1)
          expect(Object.keys(testState2)).toHaveLength(initialStateSize + 2)
          expect(testState2[4]).toBeDefined()  
        })
    
        it('creates a decision Template | non-empty state', () => {
          const initialState = createFakeDecisionTemplates()
          const initialStateLength = Object.keys(initialState).length

          const testState = decisionTemplates(initialState, {
            type: createDecisionTemplate.type
          })
    
          expect(Object.keys(testState)).toHaveLength(initialStateLength + 1)
        })
      })
      describe('deleteDecisionTemplate', () => {
        it('deletes a decision Template\'s by id', () => {
          const initialLength = Object.keys(testState).length

          const testState2 = decisionTemplates(testState, {
            type: deleteDecisionTemplate.type,
            payload: {
              decisionTemplateId: testDecisionTemplateId
            }
          })
    
          const testLength = Object.keys(testState2).length
          expect(testLength).toEqual(initialLength - 1)
          expect(testState2[testDecisionTemplateId]).not.toBeDefined()    
        })
      })
    })
    describe('User Weight CRUD', () => {
      let expectedUserWeight;
      let initialUserWeights;
      let initialState;

      beforeEach(() => {
        expectedUserWeight = createFakeUserWeightForDecisionTemplate()
        initialState = createFakeDecisionTemplates()
        initialUserWeights = selectUserWeights(initialState, testDecisionTemplateId)
      })

      describe('addDecisionTemplateUserWeight', () => {
        it('adds a user weight to a given Template id', () => {
          const testState = decisionTemplates(initialState, {
            type: addDecisionTemplateUserWeight.type,
            payload: {
              decisionTemplateId: testDecisionTemplateId,
              ...expectedUserWeight
            }
          })

          const testUserWeights = selectUserWeights(testState, testDecisionTemplateId)
          expect(Object.keys(testUserWeights)).toHaveLength(Object.keys(initialUserWeights).length + 1)
          const lastId = Object.keys(testUserWeights).slice(-1)[0]

          expect(testUserWeights[lastId]).toEqual(expectedUserWeight)
        })
        it('increments user weight id', () => {
          const testState = decisionTemplates(initialState, {
            type: addDecisionTemplateUserWeight.type,
            payload: {
              decisionTemplateId: testDecisionTemplateId,
              ...expectedUserWeight
            }
          })

          const testUserWeights = selectUserWeights(testState, testDecisionTemplateId)
          expect(Object.keys(testUserWeights)).toHaveLength(Object.keys(initialUserWeights).length + 1)

          const initialLastId = Object.keys(initialUserWeights).slice(-1)[0]
          const expectedLastId = Object.keys(testUserWeights).slice(-1)[0]

          expect(parseInt(expectedLastId)).toBe(parseInt(initialLastId) + 1)
        })
      })

      describe('updateDecisionTemplateUserWeight', () => {
        it('updates value at given id', () => {
          const initialUserWeight = selectUserWeight(initialState, testDecisionTemplateId, testUserWeightId)
          
          const testState = decisionTemplates(initialState, {
            type: updateDecisionTemplateUserWeight.type,
            payload: {
              decisionTemplateId: testDecisionTemplateId,
              userWeightId: testUserWeightId,
              value: initialUserWeight.value + 1
            }
          })
          
          const testStateUserWeight = selectUserWeight(testState, testDecisionTemplateId, testUserWeightId)
          expect(testStateUserWeight.value).toEqual(initialUserWeight.value + 1)
        })
        it('updates name at given id', () => {
          const initialUserWeight = selectUserWeight(initialState, testUserWeightId)
          
          const testState = decisionTemplates(initialState, {
            type: updateDecisionTemplateUserWeight.type,
            payload: {
              decisionTemplateId: testDecisionTemplateId,
              userWeightId: testUserWeightId,
              name: expectedUserWeight.name
            }
          })
          
          const testStateUserWeight = selectUserWeight(testState, testDecisionTemplateId, testUserWeightId)
          expect(testStateUserWeight).not.toEqual(initialUserWeight)
          expect(testStateUserWeight.name).toEqual(expectedUserWeight.name)
        })
        it('updates name and value at given id', () => {
          const initialUserWeight = selectUserWeight(decisionTemplatesInitialState, testUserWeightId)
          
          const testState = decisionTemplates(decisionTemplatesInitialState, {
            type: updateDecisionTemplateUserWeight.type,
            payload: {
              decisionTemplateId: testDecisionTemplateId,
              userWeightId: testUserWeightId,
              ...expectedUserWeight
            }
          })
          
          const testUserWeight = selectUserWeight(testState, testDecisionTemplateId, testUserWeightId)
          expect(testUserWeight).not.toEqual(initialUserWeight)
          expect(testUserWeight).toMatchObject(expectedUserWeight)
        })
      })
      describe('deleteDecisionTemplateUserWeight', () => {
        it('removes a user weight at a given id', () => {
          const initialUserWeights = selectUserWeights(initialState, testDecisionTemplateId)
          const initialUserWeightsLength = Object.keys(initialUserWeights).length

          const testState = decisionTemplates(initialState, {
            type: deleteDecisionTemplateUserWeight.type,
            payload: {
              decisionTemplateId: testDecisionTemplateId,
              userWeightId: testUserWeightId
            }
          })
          
          const testUserWeights = selectUserWeights(testState, testDecisionTemplateId)
          expect(Object.keys(testUserWeights)).toHaveLength(initialUserWeightsLength - 1)
          expect(testUserWeights[testUserWeightId]).not.toBeDefined()
        })
      })
    })    
  })
})