import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import decisionCollectionsReducer from './components/DecisionCollections/DecisionCollectionsSlice';
import { save, load } from "redux-localstorage-simple"

const persistOptions = {
  namespace: 'decidedly-app'
}

export default configureStore({
  reducer: {
    decisionCollections: decisionCollectionsReducer,
  },
  preloadedState: load(persistOptions),
  middleware: [save(persistOptions), ...getDefaultMiddleware()]
});
