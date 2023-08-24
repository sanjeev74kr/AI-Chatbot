import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({

    name: "counter",

    initialState: {
        question: [],
        ans: []
    },
    reducers: {
        handleQandA(state, action) {
            // console.log(state)
            // console.log(action)
            state.question.push(action.payload)
        },
        handleAns(state) {
            state.question = []
        }
    }
})

export const { handleQandA, handleAns } = counterSlice.actions;

export default counterSlice.reducer;