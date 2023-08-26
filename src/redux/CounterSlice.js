import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({

    name: "counter",

    initialState: {
        query: [],
        ans: []
    },
    reducers: {
        handleQandA(state, action) {
            state.query.push(action.payload)
        },
        handleAns(state) {
            state.query = []
        }
    }
})

export const { handleQandA, handleAns } = counterSlice.actions;

export default counterSlice.reducer;