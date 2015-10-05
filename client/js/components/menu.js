import React from 'react'
import { Link, History } from 'react-router'


export default React.createClass({

  getContextMenuItems() {
    console.log("cehckgn context")
    console.log(this.state.context)
    switch (this.state.context) {
      case "admin":
        return [
          {
            name: "users",
            link: "/users"  
          },
          {
            name: "dashboard",
            link: "/dashboard"  
          },
          
        ];
    }          
  },

  getInitialState: function() {    
    return {
      context: this.props.initialContex
    };
  },

  render() {    

    return (
      <div>
        {
          this.getContextMenuItems().map(function(menuItem){
            return <div><Link to={menuItem.link}>{menuItem.name}</Link></div>
          })          
        }   
        <a onClick={this.props.onLogout} href="#">Log out</a>     
      </div>
    )
  }
});