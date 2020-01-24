import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      datas: []
    }
  }
  componentDidMount() {
    fetch('/api/login').then(res => res.json()).then(datas => this.setState({datas}))
  }

  render() {
    const{datas} = this.state;
    return (
      <div>
        <ui>
          {datas.map((data, index) => 
            <li key={index}>
              {data}
            </li>
          )}
        </ui>
      </div>
    )
  }
}

export default App;
