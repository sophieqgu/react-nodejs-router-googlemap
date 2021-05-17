import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Register } from './Register'
import Login from './Login'

class Main extends Component {
    getLogin = () => {
       return this.props.isLoggedIn ? <Redirect to="/home"/> : <Login handleLoginSucceed={this.props.handleLoginSucceed}/>;
    }

    render() {
       return (
           <div className="main">
              <Switch>
                <Route path="/login" render={this.getLogin}/>
                <Route path="/register" component={Register}/>
              </Switch>
           </div>
       );
    }
}

export default Main;
