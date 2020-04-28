import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import importanceSliderReducer from './components/ImportanceSlider/ImportanceSliderSlice';
import userWeightsReducer from './components/UserWeights/UserWeightsSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    importanceSlider: importanceSliderReducer,
    userWeights: userWeightsReducer,
  },
});
