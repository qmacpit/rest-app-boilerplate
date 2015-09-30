import React from 'react';

import userService from '../services/userService';

export default React.createClass({

	// getInitialState() {
	// 	return {
	// 		users: []
	// 	};
	// },

	// componentDidMount: function() {
 //    userService.get()
 //    .then(function(users){
 //      if (this.isMounted()) {
 //        this.setState({
 //          users: users
 //        });
 //      }
 //    }.bind(this));   
 //  },

  render() {    
    return (
      <div>
        <h1>user details</h1>         
      </div>
    )
  }
});