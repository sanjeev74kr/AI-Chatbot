
export default function queryAction(query){
    console.log("queryAction is called and query is:",query);
    //query=encodeURI(query);
    console.log("query after encoding: ",query);
 return{
    type:"Query",
    data:query
 }
}
