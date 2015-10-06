import React, { findDOMNode } from 'react'
import { Router, Route, Link, History, IndexRoute, Lifecycle } from 'react-router'
import { createHashHistory, useBasename } from 'history'

import auth from './services/authService'
import Login from './components/login'
import Logout from './components/logout'
import AdminDashboard from './components/dashboard'
import UserDashboard from './components/userDashboard'
import Categories from './components/categories'
import Items from './components/items'
import Users from './components/users'
import AdminMenu from './components/adminMenu'
import UserMenu from './components/userMenu'
import UserDetails from './components/userDetails'
import UserDetailsAdd from './components/userDetailsAdd'

const history = useBasename(createHashHistory)({  
})

var App = React.createClass({

  mixins: [ History ],

  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn, role) {    
    this.setState({
      loggedIn: loggedIn,
      role: role
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
    const { children } = this.props;    
    var menu, content;

    if (!children) {
      if (this.state.role === "admin") {
        menu = <AdminMenu onLogout={this.performLogOut} />
        content = <AdminDashboard />
      } else {
        menu = <UserMenu onLogout={this.performLogOut} />
        content = <UserDashboard />
      }  
    }
        
    return (      
      <div>    
        {
          this.state.loggedIn 
          ? (
            <div>
              <div className="Sidebar">
                { children ? children.sidebar : menu }
              </div>        
              <div className="Main">
                { children ? children.main : content }
              </div>        
            </div>
          ) 
          : (
            ""
          )
        }                  
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
      //ADMIN ROUTES           
      <Route path="admin" components={{main: AdminDashboard, sidebar:AdminMenu}} onEnter={requireAuth} />            
      <Route path="admin/users" components={{main: Users, sidebar:AdminMenu}} onEnter={requireAuth}> 
        <Route path="/admin/users/add" component={UserDetailsAdd} onEnter={requireAuth} />
        <Route path="/admin/users/:id" component={UserDetails} onEnter={requireAuth}/>                        
      </Route>            
      <Route path="/admin/users/:id/categories" components={{main: Categories, sidebar: UserMenu}} onEnter={requireAuth} />
      <Route path="/admin/users/:id/items" components={{main: Items, sidebar: UserMenu}} onEnter={requireAuth} />      
      //USER ROUTES
      <Route path="categories" components={{main: Categories, sidebar:UserMenu}} onEnter={requireAuth} />
      <Route path="items" components={{main: Items, sidebar:UserMenu}} onEnter={requireAuth} />      
    </Route>    
    <Route path="login" component={Login} />
    <Route path="logout" component={Logout} />
  </Router>
), document.body)