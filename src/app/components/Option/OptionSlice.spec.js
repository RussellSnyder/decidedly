import option, {
  initializeOption,
  updateOptionWeightValue,
  updateOptionName,
  resetOptionWeights,
} from './OptionSlice';

const createFakeWeights = () => {
  const weights = [];
  let fakeIndex = 0;
  for (let i = 0; i <= 10; i++ ) {
    weights.push({
      id: fakeIndex,
      name: `Weight name ${i}`,
      value: -7 + Math.round(Math.random() * 14)
    })
    fakeIndex++
  }

  return weights
}

const fakeInitializedState = {
  id: "2",
  name: "the big one",
  weights: createFakeWeights()
}

describe('option reducer', () => {
  it('should handle initial state', () => {
    expect(option(undefined, {})).toEqual({
        id: "",
        name: "",
        weights: [],
    })
  })

  describe("initializeOption", () => {
    it('should generate incrementing option IDs', () => {
      const action1 = initializeOption({userWeights: createFakeWeights()})
      const action2 = initializeOption({userWeights: createFakeWeights()})
      
      expect(action1.payload.id).toEqual(0)
      expect(action2.payload.id).toEqual(1)
    })

    it('the weight[i].name should be the same as userWeights[i].name', () => {
      const userWeights = createFakeWeights();

      const action1 = initializeOption({userWeights})
      
      expect(action1.payload.weights[0].name).toEqual(userWeights[0].name)
      expect(action1.payload.weights[1].name).toEqual(userWeights[1].name)
      expect(action1.payload.weights[2].name).toEqual(userWeights[2].name)
    })
  })
  describe("updateOptionWeightValue", () => {
    it('should update the weight with id to value', () => {

      const initialTestWeight = fakeInitializedState.weights.find(weight => weight.id === 0)

      expect(initialTestWeight.value).not.toEqual(10)

      const testState = option(fakeInitializedState,
        {
          type: updateOptionWeightValue.type,
          payload: {
            id: 0,
            value: 10
          }
        }
      )

      const testWeight = testState.weights.find(weight => weight.id === 0)

      expect(testWeight.value).toEqual(10)
    })
  })
  describe("updateOptionName", () => {
    it('should update the option Name', () => {
      const initialState = {...fakeInitializedState}
      const expectedName = "YOLO"

      expect(initialState.name).not.toEqual(expectedName)

      const testState = option(initialState,
        {
          type: updateOptionName.type,
          payload: {
            name: expectedName
          }
        }
      )

      expect(testState.name).toEqual(expectedName)
    })
  })
  describe("resetOptionWeights", () => {
    it('should resest all option weights to 0', () => {
      const initialState = {...fakeInitializedState}

      const intialWeightsLength = initialState.weights.length
      const initialZeroValueWeightsLength = initialState.weights.filter(weight => weight.value === 0).length

      // They are not all zeros at the start
      expect(initialZeroValueWeightsLength).toBeLessThan(intialWeightsLength)

      const testState = option(initialState,
        {
          type: resetOptionWeights.type
        }
      )

      const testZeroValueWeightsLength = testState.weights.filter(weight => weight.value === 0).length

      expect(testZeroValueWeightsLength).toEqual(intialWeightsLength)
    })
  })
})