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
        },
        handleDeleteQandA(state, action) {
            const deletedQuery = action.payload;
            state.query = state.query.filter(item => item.que !== deletedQuery.que);
            state.ans = state.ans.filter(item => item.que !== deletedQuery.que);
        }
    }
})

export const { handleQandA, handleAns,handleDeleteQandA } = counterSlice.actions;

export default counterSlice.reducer;