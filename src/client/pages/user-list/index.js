import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { fetchUsers } from '@/client/actions';
import { Helmet } from 'react-helmet';
import { fetchUsers } from '../../state/ducks/user/actions';

class UsersList extends Component {
  componentDidMount() {

    // TODO
    // 이미 서버에서 데이터가 로드된 경우에는 호출되면 안됨! (중복호출)
    // 예외처리 필요

    console.log(this.props)
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map(user => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property="og:title" content="Users App" />
      </Helmet>
    );
  }

  render() {
    return (
      <div>
        {this.head()}
        Here's a big list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

function loadInitialData(store) {
  return store.dispatch(fetchUsers());
}

export default {
  loadInitialData,
  component: connect(mapStateToProps, { fetchUsers })(UsersList)
};
