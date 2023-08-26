import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({

    name: "counter",

    initialState: {
        query: [],
        ans: []
    },
    reducers: {
        handleQandA(state, action) {
             console.log("state in counterSlice is:",state)
             console.log("Action in counterSlice is:",action)
            state.query.push(action.payload)
        },
        handleAns(state) {
            state.query = []
        }
    }
})

export const { handleQandA, handleAns } = counterSlice.actions;

export default counterSlice.reducer;