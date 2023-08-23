import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import {querySaga} from "./querySaga";
import rootReducer from "./rootReducer";

const sagaMiddleware=createSagaMiddleware();

const store=configureStore({reducer:rootReducer,

    middleware:()=>[sagaMiddleware]
});

sagaMiddleware.run(querySaga);

console.log("store is called");

export default store;