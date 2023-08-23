
export default function queryAction(question){
    console.log("queryAction is called and question is:",question);
    question=encodeURI(question);
    console.log("question after encoding: ",question);
 return{
    type:"Query",
    data:question
 }
}
