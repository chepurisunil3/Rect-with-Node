import { combineReducers } from "redux";
import { LoginDetailsReducer as loginDetails } from "./login-details";
const rootReducer = (state = {}, action) => {
    return appReducer(state,action);
}
const appReducer = combineReducers({loginDetails});
export default rootReducer;