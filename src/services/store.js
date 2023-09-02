import { configureStore } from "@reduxjs/toolkit";
import { CounterSlice } from ".";


const store = configureStore({
    reducer: { counter: CounterSlice },

    middleware: (getDefaultMiddleware) =>

        getDefaultMiddleware({}),
});

export default store;