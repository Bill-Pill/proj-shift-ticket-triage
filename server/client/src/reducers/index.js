import { combineReducers } from "redux";
import TicketsReducer from './ticketsReducer'

const rootReducer = combineReducers({
  tickets: TicketsReducer
});

export default rootReducer;