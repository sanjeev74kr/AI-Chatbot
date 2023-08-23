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

        // You might want to handle the error here, like dispatching an error action

    }

    // let answer=yield fetch(`http://127.0.0.1:8000/get_answer/?question=${question}` ,{

    //     method:'GET',

    //     mode: 'no-cors'

    // });

 

    // answer=yield answer.json();

   

    // console.log("Answer from backend is: ",answer);

   

    // yield put({type:"setAnswer",answer});

}

 

 

function* querySaga(){

yield takeEvery("Query",getAnswer);

}

 

export {querySaga};