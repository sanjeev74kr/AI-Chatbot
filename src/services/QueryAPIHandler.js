
import { handleQandA } from "./CounterSlice";

async function QueryAPIHandler(query, inputValue, dispatch) {

    try {

        const response = await fetch(`http://14.140.154.131:8000/Ron`, {

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