import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import {Register} from './Register'

class Main extends Component {
   render() {
       return (
           <div className="main">
              <Switch>
                <Route path="/register" component={Register}/>
              </Switch>
           </div>
       );
   }
}

export default Main;
