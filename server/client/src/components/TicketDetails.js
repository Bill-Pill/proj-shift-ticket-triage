import React, { Component } from 'react';
import { connect } from "react-redux";



class TicketDetails extends Component {

  render() {

    return (
      <div>Ticket id: {this.props.match.params.ticketid}</div>
    );
  }
}

const mapStateToProps = state => {
  return {
   tickets: state.tickets
  };
};

export default connect(mapStateToProps)(TicketDetails);