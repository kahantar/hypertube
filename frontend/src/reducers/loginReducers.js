export function LoginReducers (state=[], action){
    switch(action.type){
        case "USER_LOGIN":
            return [...state, action.payload];
        default:
            return state
    }
}