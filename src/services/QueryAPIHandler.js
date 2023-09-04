
import { handleQandA } from "./CounterSlice";

const BASE_URL= process.env.BASE_URL;

async function QueryAPIHandler(query, inputValue, dispatch) {

    try {

        const response = await fetch(`${BASE_URL}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({ 'query': query }),

        }).then(async (result) => {
            if (result.status === 200) {
                const answer = await result.json();
                console.log("answer", answer);

                dispatch(handleQandA({ que: inputValue, ans: answer }))
            }

        }).catch(e => {
            console.log("Error:", e);

        })

    } catch (error) {

        console.error("Error fetching answer:", error);
    }
}

export default QueryAPIHandler;