import {takeEvery, put} from 'redux-saga/effects'


function* getAnswer(question){
    let answer=yield fetch("http://127.0.0.1:8000/get_answer/?question=",question ,{
        method:'POST'
    });

    answer=yield answer.json();
    
    console.log("Answer from backend is: ",answer);
    
    yield put({type:"setAnswer",answer});
}


function* querySaga(question){
    console.log("querysaga is called");
    console.log("question passed in querysaga: ",question);
yield takeEvery("Query", ()=>getAnswer(question));
}

export {querySaga};