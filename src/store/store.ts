import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import authReducer from './auth/authCombinedSlice';
import navReducer from './navigation/navigationSlice';
import { useDispatch } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
// import demandsReducer from './demands/demandsSlice';
import componementsReducer from './componements/componementsSlice';
import demandReducer from './demand/DemandCombinedSlice';
import creatorReducer from './creator/creatorCombinedSlice';
// La persistConfig permet de maintenir le store même lors de reload de page
const persistConfig = {
  key: 'root',
  storage,
  blacklist: [],
};

// Les reducers déclarés sont combinés pour ne former qu'un seul reducer qui sera passé au store
const rootReducer = combineReducers({
  auth: authReducer,
  nav: navReducer,
  demand: demandReducer,
  creator: creatorReducer,
  componements: componementsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Déclaration du store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    // Prevent error of using none basic type in store
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// Déclaration de l'action de dispatch qui permet de faire le lien entre les actions et le store
// Il peut y avoir plusieurs stores combinés donc plusieurs dispatch
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
