
export default function queryAction(query){
    console.log("queryAction is called and query is:",query);
    
 return{
    type:"Query",
    data:query
 }
}
