import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import { querySaga } from "./querySaga";
import rootReducer from "./rootReducer";
import CounterSlice from "./CounterSlice";
// import {

//     persistStore,

//     persistReducer,

//     FLUSH,

//     REHYDRATE,

//     PAUSE,

//     PERSIST,

//     PURGE,

//     REGISTER,

// } from "redux-persist"; 

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {counter : CounterSlice},

    middleware: (getDefaultMiddleware) =>

        getDefaultMiddleware({

            // serializableCheck: {

            //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],

            // },

        }),
});

// sagaMiddleware.run(querySaga);

console.log("store is called");

export default store;