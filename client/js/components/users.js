import React from 'react';
import { Link } from 'react-router';
 
import userService from '../services/userService';

export default React.createClass({

	getInitialState() {
		return {
			users: []
		};
	},

	componentDidMount: function() {
    userService.get()
    .then(function(users){
      if (this.isMounted()) {
        this.setState({
          users: users
        });
      }
    }.bind(this));   
  },

  render() {    
    return (
      <div>
        <h1>users</h1>
         <table>
          <tr>
            <th>username</th>
            <th>role</th>
          </tr>
          {
            this.state.users
            ? this.state.users.map((function(user) {
                return <tr key={user._id}><td>{user.username}</td><td>{user.role}</td></tr>
            }).bind(this))
            : ""
          }
        </table>         
        <Link to="/users/add">add user</Link>        
        {this.props.children}
      </div>
    )
  }
});