import { configureStore } from '@reduxjs/toolkit';
import optionReducer from './components/Option/OptionSlice';
import userWeightsReducer from './components/UserWeights/UserWeightsSlice';
import optionCollectionReducer from './components/OptionCollection/OptionCollectionSlice';
import decisionCollectionReducer from './components/DecisionCollection/DecisionCollectionSlice';

export default configureStore({
  reducer: {
    option: optionReducer,
    userWeights: userWeightsReducer,
    optionCollection: optionCollectionReducer,
    decisionCollection: decisionCollectionReducer
  },
});
