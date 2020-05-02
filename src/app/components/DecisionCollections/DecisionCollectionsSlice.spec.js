import decisionCollections, {
    createDecisionCollection,
    updateDecisionCollectionUserWeight,
    updateDecisionCollectionOption,
    updateDecisionCollectionName,
    deleteDecisionCollection,
    decisionCollectionInitialState,
    resetNextDCId,
    getHighestId,
  } from './DecisionCollectionsSlice';

import { 
  createFakeDecisionCollections,
  createFakeDecisionCollection,
  createFakeUserWeight,
  createFakeOption
} from "../../../test/helpers";

describe.only('decisionCollections reducer', () => {
  it('should handle initial state', () => {
    expect(decisionCollections(undefined, {})).toEqual([])
  })

  describe("createDecisionCollection", () => {
    it('should generate incrementing DecisionCollection IDs', () => {
      const testState = decisionCollections([], {
        type: createDecisionCollection.type
      })

      expect(testState.length).toBe(1)
      expect(testState[0].id).toBe(0)

      const testState2 = decisionCollections(testState, {
        type: createDecisionCollection.type
      })

      expect(testState2.length).toBe(2)
      expect(testState2[1].id).toBe(1)

    })

    it('should create a decision collection | empty state', () => {
      resetNextDCId();

      const testState = decisionCollections([], {
        type: createDecisionCollection.type
      })

      expect(testState.length).toBe(1)
      expect(testState[0]).toEqual({
        ...decisionCollectionInitialState,
        id: 0
      })
    })
    it('should create a decision collection | non-empty state', () => {
      resetNextDCId();

      const initialState = createFakeDecisionCollections()

      const testState = decisionCollections(initialState, {
        type: createDecisionCollection.type
      })

      expect(testState.length).toBe(initialState.length + 1)
    })
  })
  describe('updateDecisionCollectionUserWeight', () => {
    it('should update a decision collection\'s userWieights array if id given', () => {
      const initialState = createFakeDecisionCollections()

      // get ID of first collection
      const testCollectionId = initialState[0].id

      const testUserWeight = initialState[0].userWeights[0]

      const expectedUserWeight = {
        ...createFakeUserWeight(),
        id: testUserWeight.id
      };

      const testState = decisionCollections(initialState, {
        type: updateDecisionCollectionUserWeight.type,
        payload: {
          userWeight: expectedUserWeight,
          id: testCollectionId
        }
      })

      expect(testState[0].userWeights[0]).toEqual(expectedUserWeight)
    })
    it('should add a userWieight if id is not found with an id higher than all the others', () => {
      const initialState = createFakeDecisionCollections()

      const highestInitialWeightId = getHighestId(initialState[0].userWeights)

      // get ID of first collection
      const testCollectionId = initialState[0].id

      const expectedUserWeight = {
        ...createFakeUserWeight()
      };

      const testState = decisionCollections(initialState, {
        type: updateDecisionCollectionUserWeight.type,
        payload: {
          userWeight: expectedUserWeight,
          id: testCollectionId
        }
      })

      const testUserWeights = testState[0].userWeights
      const testUserWeight = testUserWeights[testUserWeights.length - 1]

      expect(testUserWeight.name).toEqual(expectedUserWeight.name)
      expect(testUserWeight.value).toEqual(expectedUserWeight.value)
      expect(testUserWeight.id).toEqual(highestInitialWeightId + 1)

    })
  })
  describe('updateDecisionCollectionOption', () => {
    it('should update a decision collection\'s option if id is given', () => {
      const initialState = createFakeDecisionCollections()

      // get ID of first collection
      const testCollectionId = initialState[0].id

      const initialOption = initialState[0].optionCollection[0]

      const expectedOption = {
        ...createFakeOption(),
        id: initialOption.id
      };

      const testState = decisionCollections(initialState, {
        type: updateDecisionCollectionOption.type,
        payload: {
          option: expectedOption,
          id: testCollectionId
        }
      })

      const testOption = testState[0].optionCollection[0]

      expect(testOption).toEqual(expectedOption)
    })
    it('should update a decision collection\'s option if id is not found with an id higher than all the others', () => {
      const initialState = createFakeDecisionCollections()

      const highestInitialOptionId = getHighestId(initialState[0].optionCollection)

      // get ID of first collection
      const testCollectionId = initialState[0].id
      // get ID of first user weight

      const expectedOption = {
        ...createFakeOption()
      };

      const testState = decisionCollections(initialState, {
        type: updateDecisionCollectionOption.type,
        payload: {
          option: expectedOption,
          id: testCollectionId
        }
      })

      const testOptions = testState[0].optionCollection
      const testOption = testOptions[testOptions.length - 1]

      expect(testOption.name).toEqual(expectedOption.name)
      expect(testOption.value).toEqual(expectedOption.value)
      expect(testOption.id).toEqual(highestInitialOptionId + 1)

    })
  })
  describe('updateDecisionCollectionName', () => {
    it('should update a decision collection\'s name if collection id is found', () => {
      const initialState = createFakeDecisionCollections()

      // get ID of first collection
      const testCollectionId = initialState[0].id

      const expectedName = "YOOOOOLOOOOO"

      const testState = decisionCollections(initialState, {
        type: updateDecisionCollectionName.type,
        payload: {
          name: expectedName,
          id: testCollectionId
        }
      })

      expect(testState[0].name).toEqual(expectedName)

    })
  })
  describe('deleteDecisionCollection', () => {
    it('should delete a decision collection\'s by id', () => {
      const initialState = createFakeDecisionCollections()

      // get ID of first collection
      const testCollectionId = initialState[0].id

      const testState = decisionCollections(initialState, {
        type: deleteDecisionCollection.type,
        payload: {
          id: testCollectionId
        }
      })

      expect(testState.length).toEqual(initialState.length - 1)
      expect(testState.find(dc => dc.id === testCollectionId)).not.toBeDefined()

    })
  })
})