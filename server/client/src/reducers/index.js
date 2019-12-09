import { combineReducers } from "redux";
import TicketsReducer from './ticketsReducer'
import TicketDetailsReducer from './ticketDetailsReducer'
import LoginReducer from './loginReducer'

const rootReducer = combineReducers({
  details: TicketDetailsReducer,
  tickets: TicketsReducer,
  auth: LoginReducer
});

export default rootReducer;