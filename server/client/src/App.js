import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import Main from './components/Main'
import TicketList from './components/TicketList'
import TicketDetails from './components/TicketDetails'
import HeaderNav from './components/HeaderNav'
import SocketChatDrawer from './components/SocketChatDrawer'
import { Layout } from 'antd';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout style={{ minHeight: '100vh' }}>
          <HeaderNav />
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/tickets" component={TicketList} />
            <Route exact path="/ticket/:ticketid" component={TicketDetails} />
            <Route exact path="/testingsockets" component={SocketChatDrawer} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App