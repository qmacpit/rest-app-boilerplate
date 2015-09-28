import React, { findDOMNode } from 'react'
import { Router, Route, Link, History } from 'react-router'
import { createHistory, useBasename } from 'history'
import auth from './services/authService'


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
            {this.state.loggedIn ? (
              <div>
                <div><Link to="/about">About</Link></div>
                <div><Link to="/dashboard">Dashboard</Link></div>
                <a onClick={this.performLogOut} href="#">Log out</a>
              </div>
            ) : (
              <Link to="/login">Sign in</Link>
            )}          
        {this.props.children}
      </div>
    )
  }
})

var Dashboard = React.createClass({
  render() {
    var token = auth.getToken()

    return (
      <div>
        <h1>Dashboard</h1>
        <p>You made it!</p>
        <p>{token}</p>
      </div>
    )
  }
})

var About = React.createClass({
  render() {
    return (    
        <h1>About</h1>        
    )
  }
})

var Login = React.createClass({
  mixins: [ History ],

  getInitialState() {
    return {
      error: false
    }
  },

  handleSubmit(event) {
    event.preventDefault()

    var email = findDOMNode(this.refs.email).value
    var pass = findDOMNode(this.refs.pass).value

    auth.login(email, pass, (loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true })

      var { location } = this.props

      if (location.state && location.state.nextPathname) {
        this.history.replaceState(null, location.state.nextPathname)
      } else {
        this.history.replaceState(null, '/')
      }
    })
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label><input ref="email" placeholder="email" defaultValue="qmacpit" /></label>
        <label><input ref="pass" placeholder="password" /></label><br />
        <button type="submit">login</button>
        {this.state.error && (
          <p>Bad login information</p>
        )}
      </form>
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
    </Route>
    <Route path="login" component={Login} />
  </Router>
), document.body)