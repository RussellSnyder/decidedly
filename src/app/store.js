import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import decisionCollectionsReducer from './components/DecisionCollections/DecisionCollectionsSlice';
import decisionTemplatesReducer from './components/DecisionTemplates/DecisionTemplatesSlice';
import currentUserReducer from './components/CurrentUser/CurrentUserSlice';
import UIReducer from './components/UI/UISlice';
import { save, load } from "redux-localstorage-simple"

const persistOptions = {
  namespace: 'decidedly-app'
}

export default configureStore({
  reducer: {
    decisionCollections: decisionCollectionsReducer,
    decisionTemplates: decisionTemplatesReducer,
    currentUser: currentUserReducer,
    ui: UIReducer,
  },
  preloadedState: load(persistOptions),
  middleware: [save(persistOptions), ...getDefaultMiddleware()]
});
