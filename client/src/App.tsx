import React, { Component } from 'react';
import YouAteIt from './uAteIt/youAteIt.component';
import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    responseToPost: '',
  };

  
render() {
    return (
      <div >
        <YouAteIt />
      </div>
    );
  }
}

export default App;
