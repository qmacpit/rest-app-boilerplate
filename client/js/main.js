import React, { findDOMNode } from 'react'
import { Router, Route, Link, History } from 'react-router'
import { createHistory, useBasename } from 'history'

import auth from './services/authService'
import Login from './components/login'
import Dashboard from './components/dashboard'
import About from './components/about'
import Users from './components/users'
import Menu from './components/menu'
import UserDetails from './components/userDetails'
import UserDetailsAdd from './components/userDetailsAdd'

const history = useBasename(createHistory)({  
})

var App = React.createClass({
  mixins: [ History ],
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
    if (!loggedIn) 
       this.history.replaceState(null, '/login')
  },

  performLogOut() {
    auth.logout()    
  },

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render() {
    return (
      <div>    
        {
          this.state.loggedIn 
          ? (
            <Menu initialContex="admin" onLogout={this.performLogOut.bind(this)}/>
          ) 
          : (
            <Link to="/login">Sign in</Link>
          )
        }          
        {this.props.children}
      </div>
    )
  }
})

function requireAuth(nextState, replaceState) {
  if (!auth.loggedIn())
    replaceState({ nextPathname: nextState.location.pathname }, '/login')
}

React.render((
  <Router history={history}>
    <Route path="/" component={App}>       
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />      
      <Route path="about" component={About} onEnter={requireAuth} />
      <Route path="users" component={Users} onEnter={requireAuth}> 
        <Route path="/users/add" component={UserDetailsAdd} onEnter={requireAuth}/>
        <Route path="/users/:id" component={UserDetails} onEnter={requireAuth}/>      
      </Route>      
    </Route>
    <Route path="login" component={Login} />
  </Router>
), document.body)