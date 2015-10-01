import React from 'react';
import { Link } from 'react-router';
 
import userService from '../services/userService';
import selectable from '../mixins/selectable';

export default React.createClass({
  mixins: [ selectable ],
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

  userSelected: function(index) {
    console.log("user selected")
    console.log(index)    
  },

  getSelectedUrl(isEdit) {
    if (this.state.users.length && this.state.selectedIndex >= 0) {      
      return "/users/" + this.state.users[this.state.selectedIndex]._id;      
    }
    return "";
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
            ? this.state.users.map((function(user, index) {
                return <tr key={user._id} data-index={index} 
                        className={this.getClasses(index)}
                        onClick={this.bindHandler(this.userSelected, this, index)}>
                          <td>{user.username}</td>
                          <td>{user.role}</td>
                       </tr>
            }).bind(this))
            : ""
          }
        </table>         
        <Link to="/users/add">add user</Link>        
        <Link to={this.getSelectedUrl()} query={{ mode: "edit" }}>edit user</Link>
        <Link to={this.getSelectedUrl()}>display user</Link>
        {this.props.children}
      </div>
    )
  }
});