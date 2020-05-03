import decisionCollections, {
    decisionCollectionsInitialState,
    selectDecisionCollection,
    selectUserWeights,
    selectOptionCollection,
    selectUserWeight,
    selectOption,
    selectOptionWeights,
    selectOptionWeight,
    createDecisionCollection,
    deleteDecisionCollection,
    addDecisionCollectionUserWeight,
    updateDecisionCollectionUserWeight,
    deleteDecisionCollectionUserWeight,
    createDecisionCollectionOption,
    updateDecisionCollectionOption,
    deleteDecisionCollectionOption,
    updateDecisionCollectionOptionWeight
  } from './DecisionCollectionsSlice';

import { 
  createFakeDecisionCollections,
  createFakeDecisionCollection,
  createFakeUserWeight,
  createFakeOption,
  createFakeWeightValue
} from "../../../test/helpers";

const initialStateSize = Object.keys(decisionCollectionsInitialState).length


describe('decisionCollectionsSlice', () => {
  let testDecisionCollectionId
  let testOptionId
  let testUserWeightId
  let testOptionWeightId

  beforeEach(() => {
    testDecisionCollectionId = Math.random < 0.5 ? 1 : 2;
    testOptionId = Math.random < 0.5 ? 1 : 2;
    testUserWeightId = Math.random < 0.5 ? 1 : 2;
    testOptionWeightId = Math.random < 0.5 ? 1 : 2;
  })

  describe('selects', () => {
    let state;
    beforeEach(() => {
      state = decisionCollectionsInitialState;
    })
    afterEach(() => {
      expect(state).toEqual(decisionCollectionsInitialState, "immutible")
    })
    describe('selectdecisionCollection', () => {
      it('returns a decisionCollection with the passed id', () => {
        const testValue = selectDecisionCollection(state, testDecisionCollectionId)
        const expectedValue = state[testDecisionCollectionId]
        expect(testValue).toBe(expectedValue)
      })
    }) 
    describe('selectUserWeights', () => {
      it('returns UserWeights with the passed id', () => {
        const testValue = selectUserWeights(state, testDecisionCollectionId)
        const expectedValue = state[testDecisionCollectionId].userWeights
        expect(testValue).toBe(expectedValue)
      })
    }) 
    describe('selectOptionCollection', () => {
      it('returns an OptionCollection with the passed id', () => {
        const testValue = selectOptionCollection(state, testDecisionCollectionId)
        const expectedValue = state[testDecisionCollectionId].optionCollection
        expect(testValue).toBe(expectedValue)
      })
    }) 
    describe('selectUserWeight', () => {
      it('returns an UserWeight with the passed id', () => {
        const testValue = selectUserWeight(state, testDecisionCollectionId, testUserWeightId)
        const expectedValue = state[testDecisionCollectionId].userWeights[testUserWeightId]
        expect(testValue).toBe(expectedValue)
      })
    }) 
    describe('selectOption', () => {
      it('returns an Option with the passed id', () => {
        const testValue = selectOption(state, testDecisionCollectionId, testOptionId)
        const expectedValue = state[testDecisionCollectionId].optionCollection[testOptionId]
        expect(testValue).toBe(expectedValue)
      })
    }) 
    describe('selectOptionWeights', () => {
      it('returns an OptionWeights with the passed id', () => {
        const testValue = selectOptionWeights(state, testDecisionCollectionId, testOptionId)
        const expectedValue = state[testDecisionCollectionId].optionCollection[testOptionId].weights
        expect(testValue).toBe(expectedValue)
      })
    }) 
    describe('selectOptionWeight', () => {
      it('returns an OptionWeight with the passed id', () => {
        const testValue = selectOptionWeight(state, testDecisionCollectionId, testOptionId, testOptionWeightId)
        const expectedValue = state[testDecisionCollectionId].optionCollection[testOptionId].weights[testOptionWeightId]
        expect(testValue).toBe(expectedValue)
      })
    }) 
  })

  describe('reducer', () => {
    it('handles initial state', () => {
      expect(decisionCollections(undefined, {})).toEqual(decisionCollectionsInitialState)
    })
    describe('Decision Collection CRUD', () => {
      let testState;
      beforeEach(() => {
        testState = decisionCollections(undefined, {
          type: createDecisionCollection.type
        })
      })
      describe("createDecisionCollection", () => {
        it('creates a decision collection | empty state', () => {  
          expect(Object.keys(testState)).toHaveLength(initialStateSize + 1)
          expect(testState[3]).toBeDefined()
        })

        it('generates incrementing DecisionCollection IDs', () => {  
          const testState2 = decisionCollections(testState, {
            type: createDecisionCollection.type
          })
    
          expect(Object.keys(testState2)).toHaveLength(Object.keys(testState).length + 1)
          expect(Object.keys(testState2)).toHaveLength(initialStateSize + 2)
          expect(testState2[4]).toBeDefined()  
        })
    
        it('creates a decision collection | non-empty state', () => {
          const initialState = createFakeDecisionCollections()
          const initialStateLength = Object.keys(initialState).length

          const testState = decisionCollections(initialState, {
            type: createDecisionCollection.type
          })
    
          expect(Object.keys(testState)).toHaveLength(initialStateLength + 1)
        })
      })
      describe('deleteDecisionCollection', () => {
        it('deletes a decision collection\'s by id', () => {
          const initialLength = Object.keys(testState).length

          const testState2 = decisionCollections(testState, {
            type: deleteDecisionCollection.type,
            payload: {
              id: testDecisionCollectionId
            }
          })
    
          const testLength = Object.keys(testState2).length
          expect(testLength).toEqual(initialLength - 1)
          expect(testState2[testDecisionCollectionId]).not.toBeDefined()    
        })
      })
    })
    describe('User Weight CRUD', () => {
      let expectedUserWeight;
      let initialUserWeights;
      let initialState;

      beforeEach(() => {
        expectedUserWeight = createFakeUserWeight()
        initialState = createFakeDecisionCollections()
        initialUserWeights = selectUserWeights(initialState, testDecisionCollectionId)
      })

      describe('addDecisionCollectionUserWeight', () => {
        it('adds a user weight to a given collection id', () => {
          const testState = decisionCollections(initialState, {
            type: addDecisionCollectionUserWeight.type,
            payload: {
              decisionCollectionId: testDecisionCollectionId,
              ...expectedUserWeight
            }
          })

          const testUserWeights = selectUserWeights(testState, testDecisionCollectionId)
          expect(Object.keys(testUserWeights)).toHaveLength(Object.keys(initialUserWeights).length + 1)
          const lastId = Object.keys(testUserWeights).slice(-1)[0]

          expect(testUserWeights[lastId]).toEqual(expectedUserWeight)
        })
        it('increments user weight id', () => {
          const testState = decisionCollections(initialState, {
            type: addDecisionCollectionUserWeight.type,
            payload: {
              decisionCollectionId: testDecisionCollectionId,
              ...expectedUserWeight
            }
          })

          const testUserWeights = selectUserWeights(testState, testDecisionCollectionId)
          expect(Object.keys(testUserWeights)).toHaveLength(Object.keys(initialUserWeights).length + 1)

          const initialLastId = Object.keys(initialUserWeights).slice(-1)[0]
          const expectedLastId = Object.keys(testUserWeights).slice(-1)[0]

          expect(parseInt(expectedLastId)).toBe(parseInt(initialLastId) + 1)
        })
      })

      describe('updateDecisionCollectionUserWeight', () => {
        it('updates value at given id', () => {
          const initialUserWeight = selectUserWeight(initialState, testDecisionCollectionId, testUserWeightId)
          
          const testState = decisionCollections(initialState, {
            type: updateDecisionCollectionUserWeight.type,
            payload: {
              decisionCollectionId: testDecisionCollectionId,
              id: testUserWeightId,
              value: initialUserWeight.value + 1
            }
          })
          
          const testStateUserWeight = selectUserWeight(testState, testDecisionCollectionId, testUserWeightId)
          expect(testStateUserWeight.value).toEqual(initialUserWeight.value + 1)
        })
        it('updates name at given id', () => {
          const initialUserWeight = selectUserWeight(initialState, testUserWeightId)
          
          const testState = decisionCollections(initialState, {
            type: updateDecisionCollectionUserWeight.type,
            payload: {
              decisionCollectionId: testDecisionCollectionId,
              id: testUserWeightId,
              name: expectedUserWeight.name
            }
          })
          
          const testStateUserWeight = selectUserWeight(testState, testDecisionCollectionId, testUserWeightId)
          expect(testStateUserWeight).not.toEqual(initialUserWeight)
          expect(testStateUserWeight.name).toEqual(expectedUserWeight.name)
        })
        it('updates name and value at given id', () => {
          const initialUserWeight = selectUserWeight(decisionCollectionsInitialState, testUserWeightId)
          
          const testState = decisionCollections(decisionCollectionsInitialState, {
            type: updateDecisionCollectionUserWeight.type,
            payload: {
              decisionCollectionId: testDecisionCollectionId,
              id: testUserWeightId,
              ...expectedUserWeight
            }
          })
          
          const testUserWeight = selectUserWeight(testState, testDecisionCollectionId, testUserWeightId)
          expect(testUserWeight).not.toEqual(initialUserWeight)
          expect(testUserWeight).toEqual(expectedUserWeight)
        })
      })
      describe('deleteDecisionCollectionUserWeight', () => {
        it('removes a user weight at a given id', () => {
          const initialUserWeights = selectUserWeights(initialState, testDecisionCollectionId)
          const initialUserWeightsLength = Object.keys(initialUserWeights).length

          const testState = decisionCollections(initialState, {
            type: deleteDecisionCollectionUserWeight.type,
            payload: {
              decisionCollectionId: testDecisionCollectionId,
              id: testUserWeightId
            }
          })
          
          const testUserWeights = selectUserWeights(testState, testDecisionCollectionId)
          expect(Object.keys(testUserWeights)).toHaveLength(initialUserWeightsLength - 1)
          expect(testUserWeights[testUserWeightId]).not.toBeDefined()
        })

        it('removes option.weights with the same id', () => {
          const initialOptionCollection = selectOptionCollection(initialState, testDecisionCollectionId)
          const initialOption = initialOptionCollection[testOptionId]
          const initialOptionWeightLength = Object.keys(initialOption.weights).length
          
          expect(initialOption.weights[testUserWeightId]).toBeDefined();

          const testState = decisionCollections(initialState, {
            type: deleteDecisionCollectionUserWeight.type,
            payload: {
              decisionCollectionId: testDecisionCollectionId,
              id: testUserWeightId
            }
          })
          
          const testOptionCollection = selectOptionCollection(testState, testDecisionCollectionId)
          const testOption = testOptionCollection[testOptionId]
          const testOptionLength = Object.keys(testOption.weights).length

          expect(testOption.weights[testUserWeightId]).not.toBeDefined()
          expect(testOptionLength).toEqual(initialOptionWeightLength - 1)
        })
      })
    })
    
    describe('Option CRUD', () => {
      describe('createDecisionCollectionOption', () => {
        it('adds an option to a given collection id', () => {
          const initialOptionCollection = selectOptionCollection(
            decisionCollectionsInitialState,
            testDecisionCollectionId
          )

          const initialUserWeights = selectUserWeights(
            decisionCollectionsInitialState,
            testDecisionCollectionId
          )

          const testState = decisionCollections(decisionCollectionsInitialState, {
            type: createDecisionCollectionOption.type,
            payload: {
              decisionCollectionId: testDecisionCollectionId
            }
          })

          const testOptionCollection = selectOptionCollection(testState, testDecisionCollectionId)
          expect(Object.keys(testOptionCollection)).toHaveLength(Object.keys(initialOptionCollection).length + 1)

          const lastTestOptionId = Object.keys(testOptionCollection).slice(-1)[0]
          const testOption = testOptionCollection[lastTestOptionId];

          expect(testOption.weights).toHaveLength(Object.keys(initialUserWeights).length)
        })
        it('increments option id', () => {
          const initialOptionCollection = selectOptionCollection(decisionCollectionsInitialState, testDecisionCollectionId)
          const lastInitialId = Object.keys(initialOptionCollection).slice(-1)[0]

          const testState = decisionCollections(decisionCollectionsInitialState, {
            type: createDecisionCollectionOption.type,
            payload: {
              decisionCollectionId: testDecisionCollectionId,
            }
          })

          const testOptionCollection = selectOptionCollection(testState, testDecisionCollectionId)
          const lastTestId = Object.keys(testOptionCollection).slice(-1)[0]

          expect(parseInt(lastTestId)).toBe(parseInt(lastInitialId) + 1)
        })
      })
      describe('updateDecisionCollectionOption', () => {
        it('updates a decision collection\'s option name if name is given', () => {
          const expectedOption = createFakeOption()
          const expectedOptionName = expectedOption.name
          const initialOptionName = selectOption(
            decisionCollectionsInitialState,
            testDecisionCollectionId,
            testOptionId).name

          expect(expectedOptionName).not.toEqual(initialOptionName)
    
          const testState = decisionCollections(decisionCollectionsInitialState, {
            type: updateDecisionCollectionOption.type,
            payload: {
              decisionCollectionId: testDecisionCollectionId,
              name: expectedOption.name,
              id: testOptionId
            }
          })

          const testOptionName = selectOption(
            testState,
            testDecisionCollectionId,
            testOptionId).name
          
          expect(testOptionName).toEqual(expectedOptionName)
        })
      })
      describe('updateDecisionCollectionOptionWeight', () => {
        it('update an option weight at id', () => {
          const initialWeightValue = selectOptionWeight(
            decisionCollectionsInitialState,
            testDecisionCollectionId,
            testOptionId,
            testOptionWeightId
          ).value

          const expectedWeightValue = initialWeightValue + 1;

          expect(initialWeightValue).not.toEqual(expectedWeightValue)
    
          const testState = decisionCollections(decisionCollectionsInitialState, {
            type: updateDecisionCollectionOptionWeight.type,
            payload: {
              decisionCollectionId: testDecisionCollectionId,
              optionId: testOptionId,
              id: testOptionWeightId,
              value: expectedWeightValue
            }
          })

          const testOptionWeightValue = selectOptionWeight(
            testState,
            testDecisionCollectionId,
            testOptionId,
            testOptionWeightId
          ).value
          
          expect(testOptionWeightValue).toEqual(expectedWeightValue)
        })
      })
      describe('deleteDecisionCollectionOption', () => {
        it('removes a decision collection\'s option at given id', () => {
          const initialOptionCollection = selectOptionCollection(decisionCollectionsInitialState, testDecisionCollectionId, testOptionId)
          const initialOptionCollectionLength = Object.keys(initialOptionCollection).length

          expect(initialOptionCollection[testOptionId]).toBeDefined()

          const testState = decisionCollections(decisionCollectionsInitialState, {
            type: deleteDecisionCollectionOption.type,
            payload: {
              decisionCollectionId: testDecisionCollectionId,
              id: testOptionId
            }
          })

          const testOptionCollection = selectOptionCollection(testState, testDecisionCollectionId, testOptionId)
          const testOptionCollectionLength = Object.keys(testOptionCollection).length
            
          expect(testOptionCollectionLength).toEqual(initialOptionCollectionLength - 1)
          expect(testOptionCollection[testOptionId]).not.toBeDefined()
        })
      })
    })
  })
})