import React, { Component }from 'react';
import {Map,InfoWindow, GoogleApiWrapper} from 'google-maps-react'

const APIKey = 'AIzaSyCc-MeZHcqtRL8xVr-E9m338YHbPwF9sS0'

class MapDisplayer extends Component{
	state={
		map: null,
		markers: [],
		markerProperties:[], 
		activeMarker: null, 
		activeMarkerProperties: [],
		displayInfoWindow: null
	}
	componentDidMount(){
	}

	renderMap = (props, map)=>{
		this.setState({map})
		this.updateMarkers(this.props.locations)
		console.log(this.props.locations)
	}

	updateMarkers = locations => {
		//check to make sure that locations is a valid array
		if (locations){
			//if there are any markers on the map, set them back to null and get rid of them, basically starting fresh
			this
			.state
			.markers
			.forEach(marker => marker.setMap(null))
		}
		//set new, empty!, marker properties (again, starting fresh)
		let markerProperties = []
		//go through each marker to add new properties to each individual marker
		let markers = locations.map((location, index) => {
			//create the marker properties
			let markerProps = {
				//add a key to each marker
				key: index, 
				//add an index
				index, 
				//set the name of the restaurant for each marker
				name: location.name,
				//set the position of each restaurant for each marker
				position: location.position, 
			}
			//add the marker properties to the main markerProperties
			markerProperties.push(markerProps)

			//create a new marker for each marker using API
			let marker = new this.props.google.Marker({
				position: location.position, 
				map: this.state.map, 
			})
			return marker
		})
		this.setState({markers, markerProperties})
	}

	

	render(){

	const lat= this.props.lat
	const lng = this.props.lng

	const activeMarkerProps = this.state.activeMarkerProperties;
	

	return (
		
		<div>
		<div className='map'>
		<Map 
			renderMap={this.renderMap}
			initalCenter = {{lat: lat, lng: lng}}
			zoom = {this.props.zoom}
			google={this.props.google}
			style = {{
				height: ' 90%', 
				width: '90%',
				margin: 'auto'
			}}
			onClick={this.closeInfoWindow}>
			<InfoWindow
				marker = {this.state.activeMarker}>
				<div>
					{activeMarkerProps.name}
				</div>
			</InfoWindow>
			</Map>
		</div>
		</div>
	)
	}
}
export default GoogleApiWrapper({apiKey: APIKey})(MapDisplayer)







