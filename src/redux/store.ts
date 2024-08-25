import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducers/todoReducer";

// Combine reducers into a single root reducer
const rootReducer = combineReducers({
  todo: todoReducer // Add the todo reducer to the root reducer
});

/**
 * Configures and creates a Redux store with optional preloaded state.
 * @param preloadedState - Optional initial state for the store
 * @returns Configured Redux store
 */
export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer, // Use the root reducer
    preloadedState // Set the optional preloaded state
  });
}

// Create the Redux store with the root reducer
export const store = configureStore({
  reducer: rootReducer // Use the root reducer
});

// Infer the `RootState` type from the root reducer
export type RootState = ReturnType<typeof rootReducer>;

// Infer the `AppStore` type from the `setupStore` function
export type AppStore = ReturnType<typeof setupStore>;

// Infer the `AppDispatch` type from the `dispatch` method of the store
export type AppDispatch = AppStore["dispatch"];
