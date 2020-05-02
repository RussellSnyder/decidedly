import { configureStore } from '@reduxjs/toolkit';
import decisionCollectionsReducer from './components/DecisionCollections/DecisionCollectionsSlice';

export default configureStore({
  reducer: {
    decisionCollections: decisionCollectionsReducer,
  },
});
