import optionCollection, {
  addOption,
  updateOption,
  deleteOption
} from './OptionCollectionSlice';

import {
  createFakeOptionCollection, 
  createFakeOption
} from "../../../test/helpers/";

describe('optionCollection reducer', () => {
  it('should handle initial state', () => {
    expect(optionCollection(undefined, {})).toEqual([])
  })

  describe("addOption", () => {
    it('should generate incrementing option IDs', () => {
      const action1 = addOption(createFakeOption())
      const action2 = addOption(createFakeOption())
      
      expect(action1.payload.id).toEqual(0)
      expect(action2.payload.id).toEqual(1)
    })

    it('should add an option to optionCollection starting from empty state', () => {
      const expectedOption = createFakeOption();

      const testState = optionCollection([], {
        type: addOption.type,
        payload: {...expectedOption}
      })

      expect(testState.length).toBe(1)
      expect(testState[0].name).toBe(expectedOption.name)
    })

    it('should add an option to optionCollection state starting with non-empty state', () => {
      const expectedOption1 = createFakeOption();
      const initialState = createFakeOptionCollection();

      const testState = optionCollection(createFakeOptionCollection(), {
        type: addOption.type,
        payload: {...expectedOption1}
      })

      expect(testState.length).toBe(initialState.length + 1)
      expect(testState[testState.length - 1].name).toBe(expectedOption1.name)

      const expectedOption2 = createFakeOption();

      const testState2 = optionCollection(testState, {
        type: addOption.type,
        payload: {...expectedOption2}
      })

      expect(testState2.length).toBe(testState.length + 1)
      expect(testState2[testState2.length - 1].name).toBe(expectedOption2.name)
      expect(testState2[testState2.length - 2].name).toBe(expectedOption1.name)
    })
  })
  describe("updateOption", () => {
    it('should update an option with given id', () => {
      const expectedUpdatedOption = createFakeOption('YAAAAS')
      const idToChange = 3;

      const initialState = createFakeOptionCollection();

      const initialOption = initialState.find(option => option.id === idToChange)
      expect(initialOption.name).not.toEqual(expectedUpdatedOption.name)

      const testState = optionCollection(createFakeOptionCollection(), {
        type: updateOption.type,
        payload: {
          id: idToChange,
          option: expectedUpdatedOption
        }
      })

      expect(testState.length).toEqual(initialState.length)
      const testUpdatedOption = testState.find(option => option.id === idToChange)

      expect(testUpdatedOption.name).toEqual(expectedUpdatedOption.name)
      expect(testUpdatedOption.weights[0].value).toEqual(expectedUpdatedOption.weights[0].value)
      expect(testUpdatedOption.weights[1].value).toEqual(expectedUpdatedOption.weights[1].value)
    })

  })
  describe("deleteOption", () => {
    it('should delete an option with given id', () => {
      const idToDelete = 2;

      const initialState = createFakeOptionCollection();

      const testState = optionCollection(initialState, {
        type: deleteOption.type,
        payload: {
          id: idToDelete
        }
      })

      expect(testState.length).toEqual(initialState.length - 1)
      const testDeletedOptionIndex = testState.findIndex(option => option.id === idToDelete)

      expect(testDeletedOptionIndex).toEqual(-1)
    })
  })
})