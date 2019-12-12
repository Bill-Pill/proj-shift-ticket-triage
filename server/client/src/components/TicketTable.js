import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { fetchTickets, fetchDemoTickets } from "../actions"
import { Table} from 'antd';

// Schema used for Ticket Table component w/ Ant Design
const columns = [
  {
    title: 'Ticket ID',
    dataIndex: 'ticketid',
    key: 'ticketid'
  },
  {
    title: 'Status',
    dataIndex: 'statuscode',
    key: 'statuscode'
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text, record) => <Link to={'ticket/' + record.ticketid}>{text}</Link>
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category'
  },
  // {
  //   title: 'Username',
  //   dataIndex: 'username',
  //   key: 'username'
  // },
  {
    title: 'Department',
    dataIndex: 'department',
    key: 'department'
  },
  {
    title: 'Ticket Submit Date',
    dataIndex: 'added',
    key: 'added'
  },
]

class TicketTable extends Component {

  componentDidMount() {
    if (this.props.auth.username) {
      this.props.fetchDemoTickets(this.props.auth.username)
    }
  }

  HandleRowClick(ticketid) {
    console.log(ticketid)
  }

  render() {
    console.log('ticket table props ', this.props)
    return (
      <Table dataSource={this.props.tickets || []} columns={columns}
        rowKey="ticketid"
        pagination={false} scroll={{ y: 375}}
        >
      </Table>
    )
  }
}

const mapStateToProps = state => {
  return {
   tickets: state.tickets,
   auth: state.auth
  };
};

export default connect(mapStateToProps, { fetchTickets, fetchDemoTickets })(TicketTable);
