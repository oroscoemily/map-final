import React, { Component } from 'react';
import './App.css';
import locations from './data/locations.json'
import MapDisplayer from './components/MapDisplayer.js'

class App extends Component {

  state={
    //default map settings
    lat:37.871593, 
    lng:-122.2681,
    zoom: 13,
    all: locations,
  }
  render() {
    return (
      <div className="App">
        <header className="App-header"> <h1> Walnut Eats </h1>
        </header>
        <div> 
        <MapDisplayer 
            lat={this.state.lat} 
            lng={this.state.lng} 
            zoom = {this.state.zoom}
            locations={this.state.all}
        />

        </div>
      </div>
    );
  }
}

export default App;
