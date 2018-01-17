import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import socketIOClient from 'socket.io-client';
import {CoinTable} from './CoinTable';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Portfolio from './Portfolio';


class App extends Component {


  componentWillMount() {
    const socket = socketIOClient('https://coincap.io');
    this.setState({socket: socket});

  }


  render() {

 
    return (
      <div className="App">
        <HashRouter>
          <div>
            <header className="App-header">
              <h1 className="App-title" id = "ripple">CoinCheck</h1>
                <ul className = "nav-header">
                  <li><NavLink exact to ="/">Home</NavLink></li>
                  <li><NavLink to = "/portfolio">Portfolio</NavLink></li>
                </ul>
            </header>
            <div className = "content">
              <Route exact path = "/" render = {(routeProps) => (<CoinTable {...routeProps} socket = {this.state.socket}/>)}/>  
              <Route path = "/portfolio" render = {(routeProps) =>(<Portfolio {...routeProps} socket = {this.state.socket}/>)}/>
            </div>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
