import React, { Component } from 'react';
import './App.css';
import locations from './data/locations.json'
import MapDisplayer from './components/MapDisplayer.js'
import ListMenu from './components/ListMenu.js'

class App extends Component {

  state={
    //default map settings
    lat:34.0522, 
    lng: 122.2727,
    zoom: 13,
    all: locations,
    open: false,
    search: '',
    selectedIndex:null
  }

  styles={
    burgerMenu:{
      position: 'absolute',
      display: 'flex',
      top:'0px',
      fontSize: '6vmin',
      background: 'transparent',
      cursor: 'pointer',
      color: 'teal',
      margin: '15px'
      },

    titleMenu:{
      top: '10px',
      color:'teal',
      margin: 'auto',
      textAlign:'center',
      fontSize:'3.5em',
      }
  }

  toggleList = () =>{
    this.setState({
      open: !this.state.open
    })
  }

  
  componentDidMount = () => {
    this.setState({
      ...this.state, 
    searched:this.searchLocations(this.state.all, '')

    })
  }

  showSearch = (text) => {
    this.setState({
      ...this.state,
    selectedIndex:null, 
    searched: this.searchLocations(this.state.all, text)
    })
  }

  searchLocations = (locations, search) => {
    return (locations.filter(location => location.name.toLowerCase().includes(search.toLowerCase())))
  }

  clickItem = (index) =>{
    this.setState({selectedIndex:index, open: !this.state.open})

  }

  render() {
    return (
      <div className="App" role="application" aria-label="map">
        <header className = 'header'>
          <button onClick={this.toggleList} style={this.styles.burgerMenu}>
            <i className = 'fa fa-bars'>
          </i>
          </button>
          <div style={this.styles.titleMenu}> Berkeley Neighborhood App </div> 
        </header> 
        
        <div> 
        <MapDisplayer 
            lat={this.state.lat} 
            lng={this.state.lng} 
            zoom = {this.state.zoom}
            locations={this.state.searched}
            selectedIndex = {this.state.selectedIndex}
            clickItem = {this.clickItem}
        />

        <ListMenu
          locations = {this.state.searched}
          open = {this.state.open}
          toggleList = {this.toggleList}
          searchLocations = {this.showSearch}
          clickItem = {this.clickItem}/>

        </div>
      </div>
    );
  }
}

export default App;
