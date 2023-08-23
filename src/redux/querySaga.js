import {takeEvery, put} from 'redux-saga/effects'

function* getAnswer(action){
    
    const question = action.data;
    
   

    try {

        const response = yield fetch(`https://dafb-34-142-200-222.ngrok.io/Ron`, {

            method: 'POST',
            headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({'query':question}),

            mode: 'cors' // Use 'cors' mode instead of 'no-cors'

        });

 

        const answer = yield response.json();

        console.log("Answer from backend is: ", {answer});

   

        yield put({ type: "setAnswer", answer });

    } catch (error) {

        console.error("Error fetching answer:", error);

        

    }

    
}

 

 

function* querySaga(){

yield takeEvery("Query",getAnswer);

}

 

export {querySaga};