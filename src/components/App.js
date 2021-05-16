import React, {Component} from 'react';
import TopBar from './TopBar';
import Main from './Main'

import { TOKEN_KEY } from '../constants';

class App extends Component {
  state = {
     isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)),
  }

  handleLoginSucceed = (token) => {
       console.log('token --- ', token)
       localStorage.setItem(TOKEN_KEY, token)
       this.setState({ isLoggedIn: true });
  }

  return (
    <div className="App">
      <TopBar />
      <Main
          handleLoginSucceed={this.handleLoginSucceed}
          isLoggedIn={this.state.isLoggedIn}
      />
    </div>
  );
}

export default App;
