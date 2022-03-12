import { combineReducers } from "redux";
import amountReducer from "./amountReducer";
const reducers = combineReducers({
    session:amountReducer
})
export default reducers