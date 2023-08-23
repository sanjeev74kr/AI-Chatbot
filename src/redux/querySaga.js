import {takeEvery, put} from 'redux-saga/effects'


function* getAnswer(action){
    const { question } = action.data;
    
    try {
        const response = yield fetch(`http://127.0.0.1:8000/get_answer/?question=${question}`, {
            method: 'POST',
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


function* querySaga(question){
    console.log("querysaga is called");
    console.log("question passed in querysaga: ",question);
yield takeEvery("Query",getAnswer);
}

export {querySaga};