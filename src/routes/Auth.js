import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class Auth extends Component {
  render() {
    const {allUsers = []} = this.props.data;
    return (
      <div>
        {allUsers.map(u => <li key={u.id}>{u.username}</li>)}
      </div>
    )
  }
}

const ALL_USERS = gql `
  query {
    allUsers {
      id
      username
    }
  }
`;

export default graphql(ALL_USERS)(Auth);