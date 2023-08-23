
export const botReply = (data = "", action) => {

    console.log("äction has in reducer :", action);

    switch (action.type) {
        case "setAnswer":
            return action.answer;
        default:
            return data;
    }
}