import decisionCollection, {
  updateDecisionCollectionName,
  updateDecisionCollectionUserWeights,
  updateDecisionCollectionOptionCollection
} from './DecisionCollectionSlice';

import { createFakeOption } from "../../../test/createFakeOption";
import { createFakeUserWeights } from "../../../test/createFakeUserWeights";
import {
  createFakeOptionCollection,
  createFakeOptionCollectionFromUserWeights
} from "../../../test/createFakeOptionCollection";
import { createFakeDecisionCollection } from "../../../test/createFakeDecisionCollection";

describe('optionCollection reducer', () => {
  it('should handle initial state', () => {
    expect(decisionCollection(undefined, {})).toEqual({
      id: "",
      name: "",
      userWeights: [],
      optionCollection: [],  
    })
  })

  it('should properly set passed in state', () => {
    const initialState = createFakeDecisionCollection()
    const testState = decisionCollection(initialState, {});

    expect(testState.name).toEqual(initialState.name)
    expect(testState.id).toEqual(initialState.id)
    expect(testState.userWeights.length).toBeGreaterThan(0)
    expect(testState.userWeights.length).toEqual(initialState.userWeights.length)
    expect(testState.optionCollection.length).toBeGreaterThan(0)
    expect(testState.optionCollection.length).toEqual(initialState.optionCollection.length)
  })

  describe("updateDecisionCollectionName", () => {
    it('should update the name', () => {
      const expectedName = "I'm a new name!"
      const initialState = createFakeDecisionCollection()

      expect(initialState.name).not.toEqual(expectedName)

      const testState = decisionCollection(initialState, {
        type: updateDecisionCollectionName.type,
        payload: {
          name: expectedName
        }
      });

      expect(testState.name).toEqual(expectedName)
      
    })
  })

  describe("updateDecisionCollectionUserWeights", () => {
    it('should update the userWeights', () => {
      const initialUserWeights = createFakeUserWeights();
      const expectedUserWeights = createFakeUserWeights();
      
      // would be unlikely but possible...
      expect(initialUserWeights).not.toEqual(expectedUserWeights)

      const initialState = createFakeDecisionCollection(initialUserWeights)

      const testState = decisionCollection(initialState, {
        type: updateDecisionCollectionUserWeights.type,
        payload: {
          userWeights: expectedUserWeights
        }
      });

      expect(testState.userWeights).toEqual(expectedUserWeights)
    })
  })

  describe("updateDecisionCollectionOptionCollection", () => {
    it('should update the option collection', () => {
      const fakeUserWeights = createFakeUserWeights();
      const expectedOptionCollection = createFakeOptionCollectionFromUserWeights(fakeUserWeights);
      
      const initialState = createFakeDecisionCollection(fakeUserWeights)

      const testState = decisionCollection(initialState, {
        type: updateDecisionCollectionOptionCollection.type,
        payload: {
          optionCollection: expectedOptionCollection
        }
      });

      expect(testState.optionCollection).toEqual(expectedOptionCollection)

    })
  })
})