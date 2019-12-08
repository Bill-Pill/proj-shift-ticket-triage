import { combineReducers } from "redux";
import TicketsReducer from './ticketsReducer'
import TicketDetailsReducer from './ticketDetailsReducer'

const rootReducer = combineReducers({
  details: TicketDetailsReducer,
  tickets: TicketsReducer
});

export default rootReducer;