import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "./CounterSlice";


const store = configureStore({
    reducer: { counter: CounterSlice },

    middleware: (getDefaultMiddleware) =>

        getDefaultMiddleware({}),
});

console.log("store is called");

export default store;