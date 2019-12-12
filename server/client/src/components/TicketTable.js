import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { fetchTickets, fetchDemoTickets } from "../actions"
import { Table} from 'antd';

const noTableDataMsg = 'No Tickets - Try submitting one with the right siderbar!'
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
    render: code => {
      switch (code) {
        case 0:
          return <span>New Ticket</span>
        case 1:
          return <span>Open</span>
        case 2, 3:
          return <span>In Progress</span>
        case 4:
          return <span>Resolved</span>
      }
      // if(code === 0) {
      //   return <span>test 0 passed</span>
      // } else {
      //   return <span>else passed</span>
      // }
      
    }
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
        pagination={false} 
        scroll={{ y: 375}}
        locale={{emptyText: noTableDataMsg}}
        rowClassName={ (record, index) => 
          {  if (record.statuscode === 0) {
            return 'status-red blinking'
        } else if (record.statuscode=== 4) {
          return 'status-blue'
        } else {
          return 'status-yellow'
        }
      }   }
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
