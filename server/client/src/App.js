import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Main from './components/Main'
import TicketList from './components/TicketList'
import TicketDetails from './components/TicketDetails'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/tickets" component={TicketList} />
          <Route exact path="/ticket/:ticketid" component={TicketDetails} />
        </Switch>
      </div>
    );
  }
}

export default App