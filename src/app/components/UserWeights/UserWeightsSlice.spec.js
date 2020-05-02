import userWeights, {
  addUserWeight,
  deleteUserWeight,
  updateUserWeights,
  updateUserWeightValue,
  updateUserWeightName,
} from './UserWeightsSlice';

import { 
  createFakeUserWeights,
} from "../../../test/helpers/";

describe('userWeights reducer', () => {
  it('should handle initial state', () => {
    expect(userWeights(undefined, {})).toEqual([])
  })

  describe('addUserWeight', () => {
    it('should generate incrementing userWeight IDs', () => {
      const action1 = addUserWeight({name: "yo", value: 3})
      const action2 = addUserWeight({name: "yes", value: -3})
  
      expect(action1.payload).toEqual({ id: 0, name: "yo", value: 3 })
      expect(action2.payload).toEqual({ id: 1, name: "yes", value: -3 })
    })

    it('should addUserWeight with in empty array', () => {
      expect(
        userWeights([], {
          type: addUserWeight.type,
          payload: {
            name: 'test',
            value: 4,  
          }
        })
      ).toEqual([
        {
          name: 'test',
          value: 4,
        }
      ])
    })

    it('should addUserWeight with a non-empty array', () => {
      expect(
        userWeights([
          {
            name: 'test',
            value: 4,
          }
        ], {
          type: addUserWeight.type,
          payload: {
            name: 'another',
            value: 2,  
          }
        })
      ).toEqual([
        {
          name: 'test',
          value: 4,
        },
        {
          name: 'another',
          value: 2,
        }
      ])

      expect(
        userWeights([
          {
            name: 'test',
            value: 4,
          },
          {
            name: 'test2',
            value: 5,
          }
        ], {
          type: addUserWeight.type,
          payload: {
            name: 'another',
            value: 2,  
          }
        })
      ).toEqual([
        {
          name: 'test',
          value: 4,
        },
        {
          name: 'test2',
          value: 5,
        },
        {
          name: 'another',
          value: 2,
        }
      ])
    })
  })

  describe('updateUserWeights', () => {
    it('should update all userWeights', () => {
      const initialWeights = createFakeUserWeights();
      const updatedWeights = createFakeUserWeights();

      expect(initialWeights).not.toEqual(updatedWeights)

      const initialState = userWeights(initialWeights, {})

      expect(initialState).toEqual(initialWeights)

      const testState = userWeights(initialWeights, {
        type: updateUserWeights.type,
        payload: {
          userWeights: updatedWeights,  
        }
      })

      expect(testState).not.toEqual(initialState)
      expect(testState).toEqual(updatedWeights)

    })
  })
  describe('deleteUserWeight', () => {
    it('should delete a userWeight', () => {
      const initialWeights = createFakeUserWeights();
      const intialTestData = userWeights(initialWeights, {})
      expect(intialTestData.length).toEqual(initialWeights.length)

      const deletedTestData = userWeights(
        createFakeUserWeights(),
        {
          type: deleteUserWeight.type,
          payload: {
            id: 0,  
          }
        }
      )
      expect(deletedTestData.length).toEqual(initialWeights.length - 1);
      expect(deletedTestData.findIndex(weight => weight.id === 0)).toEqual(-1);

      const deletedTestData2 = userWeights(
        deletedTestData,
        {
          type: deleteUserWeight.type,
          payload: {
            id: 5,  
          }
        }
      )
      expect(deletedTestData2.length).toEqual(deletedTestData.length - 1);
      expect(deletedTestData2.findIndex(weight => weight.id === 5)).toEqual(-1);

    })
  })

  describe('updateUserWeightValue', () => {
    it('should update a userWeightValue', () => {
      const initialUserWieghts = createFakeUserWeights();
      const intialTestData = userWeights(
        initialUserWieghts,
        {}
      )
      expect(intialTestData.length).toEqual(initialUserWieghts.length)

      const weightToUpdate = intialTestData.find(weight => weight.id === 4)
      const initialWeightValue = weightToUpdate.value
      const expectedWeightValue = initialWeightValue + 1;

      const updatedTestData = userWeights(
        initialUserWieghts,
        {
          type: updateUserWeightValue.type,
          payload: {
            id: 4,
            value: expectedWeightValue
          }
        }
      )

      const updatedWeight = updatedTestData.find(weight => weight.id === 4)
      expect(updatedWeight.value).toEqual(expectedWeightValue);
    })

    it('should not update a userWeightValue if the id is not found', () => {
      const initialUserWieghts = createFakeUserWeights();

      const intialTestData = userWeights(initialUserWieghts, {})

      expect(intialTestData.length).toEqual(initialUserWieghts.length)

      const updatedTestData = userWeights(
        initialUserWieghts,
        {
          type: updateUserWeightValue.type,
          payload: {
            id: 4000000,
            value: 10 
          }
        }
      )

      expect(updatedTestData).toEqual(intialTestData);
    })
  })

  describe('updateUserWeightName', () => {
    it('should update a userWeightName', () => {
      const initialUserWieghts = createFakeUserWeights();

      const intialTestData = userWeights(initialUserWieghts, {})

      expect(intialTestData.length).toEqual(initialUserWieghts.length)

      const weightToUpdate = intialTestData.find(weight => weight.id === 4)
      const expectedName = "Yolo Bro!"
      expect(weightToUpdate.name).not.toEqual(expectedName)

      const updatedTestData = userWeights(
        initialUserWieghts,
        {
          type: updateUserWeightName.type,
          payload: {
            id: 4,
            name: expectedName 
          }
        }
      )

      const updatedWeight = updatedTestData.find(weight => weight.id === 4)
      expect(updatedWeight.name).toEqual(expectedName);
    })

    it('should not update a userWeightName if the id is not found', () => {
      const initialUserWieghts = createFakeUserWeights();

      const updatedTestData = userWeights(
        initialUserWieghts,
        {
          type: updateUserWeightValue.type,
          payload: {
            id: 4000000,
            name: "whatever" 
          }
        }
      )

      expect(updatedTestData).toEqual(initialUserWieghts);
      expect(updatedTestData.findIndex(weight => weight.name === "whatever")).toEqual(-1);
    })
  })  
})