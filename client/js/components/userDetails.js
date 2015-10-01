import React from 'react';

import userService from '../services/userService';
import template from '../template';

export default React.createClass({

  componentDidMount() {
      this.fetchUserData(this.props.params.id);    
  },

  componentDidUpdate(prevProps) {    
    if (prevProps.params.id !== this.props.params.id)
      this.fetchUserData(this.props.params.id);
  },

  fetchUserData(id) {
    userService.getUserData(id)
    .then(function(userData){
      this.setState({
        user: userData
      })
    }.bind(this));
  },

  handleSubmit: function(event) {
    if (this.isEditing()) {
      event.preventDefault();
      console.log(this.state.user)
      return userService.saveUser(this.state.user);  
    }        
  },

  onUserFormChange(key) {
    return function(event) {
      var user = this.state.user;
      user[key] = event.target.value;
      this.setState({
        user: user
      })
    }.bind(this);    
  },

  isEditing() {
    return this.props.location.query.mode === "edit";
  },
  
  getInitialState() {
    return {
      user: {}
    };
  },

  render() {      
    var isEditing = this.isEditing();    
    return (
      <div>
        <h1>user details</h1>  
        <form onSubmit={this.handleSubmit}>
          <label>
            username
            <input type="text" disabled="disabled"
              value={this.state.user.username} onChange={this.onUserFormChange("username")}/>
          </label>
          <label>
            role
            <input type="text" value={this.state.user.role} onChange={this.onUserFormChange("role")}
              disabled={isEditing ? false : "disabled"}/>            
          </label>
          <br />
          <button type="submit">{isEditing ? "Save" : "Ok"}</button>        
        </form>              
      </div>
    )
  }
});