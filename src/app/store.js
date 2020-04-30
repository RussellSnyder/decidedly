import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import importanceSliderReducer from './components/ImportanceSlider/ImportanceSliderSlice';
import userWeightsReducer from './components/UserWeights/UserWeightsSlice';
import optionCollectionReducer from './components/OptionCollection/OptionCollectionSlice';
import decisionCollectionReducer from './components/DecisionCollection/DecisionCollectionSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    importanceSlider: importanceSliderReducer,
    userWeights: userWeightsReducer,
    optionCollection: optionCollectionReducer,
    decisionCollection: decisionCollectionReducer
  },
});
