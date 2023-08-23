import {takeEvery, put} from 'redux-saga/effects'


function* getAnswer(action) {
console.log("action in saga",action);
    const question  = action.data;
    console.log(`question in get answer is: ${question}`);
    try {
        console.log("I enter");
        const response = yield fetch('https://dafb-34-142-200-222.ngrok.io/Ron', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              query: 'What technologies are utilized in Transforming healthcare?'
            }),
            mode: 'no-cors' // Use 'cors' mode instead of 'no-cors'
          });
          
        console.log("but stuck?");
        const answer = yield response;
        
        console.log("Answer from backend is: ", answer);
        console.log("NO");
        yield put({ type: "setAnswer", answer });
    } catch (error) {
        console.error("Error fetching answer:", error);
       
    }
}


function* querySaga(){
   
    yield takeEvery("Query", getAnswer);
    console.log("querysaga is called");
    console.log("question passed in querysaga: ",);
}

export {querySaga};