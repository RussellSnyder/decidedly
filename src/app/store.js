import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import decisionCollectionsReducer from './components/DecisionCollections/DecisionCollectionsSlice';
import decisionTemplatesReducer from './components/DecisionTemplates/DecisionTemplatesSlice';
import { save, load } from "redux-localstorage-simple"

const persistOptions = {
  namespace: 'decidedly-app'
}

export default configureStore({
  reducer: {
    decisionCollections: decisionCollectionsReducer,
    decisionTemplates: decisionTemplatesReducer,
  },
  preloadedState: load(persistOptions),
  middleware: [save(persistOptions), ...getDefaultMiddleware()]
});
