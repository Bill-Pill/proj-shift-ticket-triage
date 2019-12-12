import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
// import Main from './components/Main'
import TicketList from './components/TicketList'
import TicketDetails from './components/TicketDetails'
import HeaderNav from './components/HeaderNav'
import { Layout } from 'antd';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout style={{ minHeight: '100vh' }}>
          <HeaderNav />
          <Switch>
            <Redirect exact from="/" to="/tickets" />
            <Route exact path="/tickets" component={TicketList} />
            <Route exact path="/ticket/:ticketid" component={TicketDetails} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App