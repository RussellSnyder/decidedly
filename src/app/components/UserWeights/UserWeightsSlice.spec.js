import userWeights, {
  addUserWeight,
  deleteUserWeight,
  updateUserWeightValue,
  updateUserWeightName,
  selectUserWeights
} from './UserWeightsSlice';

const createTestUserWeights = () => {
  let fakeIndex = 0;
  const returnArray = [];
  for (let i = -7; i <= 7; i++ ) {
    returnArray.push({
      id: fakeIndex,
      name: `fake name ${fakeIndex}`,
      value: i
    })
    fakeIndex++
  }
  return returnArray
}

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

  describe('deleteUserWeight', () => {
    it('should delete a userWeight', () => {
      const intialTestData = userWeights(
        createTestUserWeights(),
        {}
      )
      expect(intialTestData.length).toEqual(15)

      const deletedTestData = userWeights(
        createTestUserWeights(),
        {
          type: deleteUserWeight.type,
          payload: {
            id: 0,  
          }
        }
      )
      expect(deletedTestData.length).toEqual(14);
      expect(deletedTestData.findIndex(weight => weight.id === 0)).toEqual(-1);

      const deletedTestData2 = userWeights(
        createTestUserWeights(),
        {
          type: deleteUserWeight.type,
          payload: {
            id: 5,  
          }
        }
      )
      expect(deletedTestData2.length).toEqual(14);
      expect(deletedTestData2.findIndex(weight => weight.id === 5)).toEqual(-1);

    })
  })

  describe('updateUserWeightValue', () => {
    it('should update a userWeightValue', () => {
      const intialTestData = userWeights(
        createTestUserWeights(),
        {}
      )
      expect(intialTestData.length).toEqual(15)

      const weightToUpdate = intialTestData.find(weight => weight.id === 4)
      expect(weightToUpdate.value).not.toEqual(15)

      const updatedTestData = userWeights(
        createTestUserWeights(),
        {
          type: updateUserWeightValue.type,
          payload: {
            id: 4,
            value: 10 
          }
        }
      )
      expect(updatedTestData.length).toEqual(15);

      const updatedWeight = updatedTestData.find(weight => weight.id === 4)
      expect(updatedWeight.value).toEqual(10);
    })

    it('should not update a userWeightValue if the id is not found', () => {
      const intialTestData = userWeights(
        createTestUserWeights(),
        {}
      )
      expect(intialTestData.length).toEqual(15)

      const updatedTestData = userWeights(
        createTestUserWeights(),
        {
          type: updateUserWeightValue.type,
          payload: {
            id: 4000000,
            value: 10 
          }
        }
      )
      expect(updatedTestData.length).toEqual(15);

      expect(JSON.stringify(updatedTestData)).toEqual(JSON.stringify(intialTestData));
    })
  })

  describe('updateUserWeightName', () => {
    it('should update a userWeightName', () => {
      const intialTestData = userWeights(
        createTestUserWeights(),
        {}
      )
      expect(intialTestData.length).toEqual(15)

      const weightToUpdate = intialTestData.find(weight => weight.id === 4)
      const expectedName = "Yolo Bro!"
      expect(weightToUpdate.name).not.toEqual(expectedName)

      const updatedTestData = userWeights(
        createTestUserWeights(),
        {
          type: updateUserWeightName.type,
          payload: {
            id: 4,
            name: expectedName 
          }
        }
      )
      expect(updatedTestData.length).toEqual(15);

      const updatedWeight = updatedTestData.find(weight => weight.id === 4)
      expect(updatedWeight.name).toEqual(expectedName);
    })

    it('should not update a userWeightName if the id is not found', () => {
      const intialTestData = userWeights(
        createTestUserWeights(),
        {}
      )
      expect(intialTestData.length).toEqual(15)

      const updatedTestData = userWeights(
        createTestUserWeights(),
        {
          type: updateUserWeightValue.type,
          payload: {
            id: 4000000,
            name: "whatever" 
          }
        }
      )
      expect(updatedTestData.length).toEqual(15);

      expect(JSON.stringify(updatedTestData)).toEqual(JSON.stringify(intialTestData));
      expect(updatedTestData.findIndex(weight => weight.name === "whatever")).toEqual(-1);
    })
  })  
})