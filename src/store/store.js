import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";

import { mainReducer, INITIAL_STATE } from "../reducers/mainReducer";

const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export const store = createStore(mainReducer, INITIAL_STATE, ReactReduxDevTools);
