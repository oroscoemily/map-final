import React, { Component }from 'react';
import {Map, GoogleApiWrapper, InfoWindow} from 'google-maps-react'
import LoadingContainer from './LoadingContainer.js'

const APIKey = 'AIzaSyCc-MeZHcqtRL8xVr-E9m338YHbPwF9sS0'
const CLIENTID = 'RNGYJKTVJJI31HQTRNSJEYXTRXNVYZF1YENZSYGFK1DI1NWS'
const CLIENTSECRET = '1EHMLCXQEMKOA2WSHUW4SUDS0RX4NJI5PGXH4VAQQTORU25J'
const VERSION = '20181110'

class MapDisplayer extends Component{
	state={
		map: null,
		markers:[],
		markerProperties:[], 
		activeMarker: null, 
		activeMarkerProps: [],
		displayInfoWindow: null,
	}
	componentDidMount(){
	}

	componentWillReceiveProps = (props) => {
		if (this.state.markers.length !== props.locations.length){
			console.log("hello! I work")
			this.closeInfoWindow();
			this.updateMarkers(props.locations);
			this.setState({activeMarker:null})
			return;
		}
		if (!props.selectedIndex){
			this.closeInfoWindow();
		}
		if (this.state.activeMarker && (this.state.markers[props.selectedIndex] !== this.state.activeMarker.index)){
			this.closeInfoWindow();
		}

		if (this.props.selectedIndex == null){
			return;
		}

		this.onMarkerClick(this.state.markerProperties[props.selectedIndex], this.state.markers[props.selectedIndex])
	}

	renderMap = (props, map)=>{
		this.setState({map})
		this.updateMarkers(this.props.locations)
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
				position: location.pos, 
			}
			//add the marker properties to the main markerProperties
			markerProperties.push(markerProps)

			//create a new marker for each marker using API
			let marker = new this.props.google.maps.Marker({
				position: location.pos, 
				map: this.state.map, 
				animation: 4, 
			});
			marker.addListener('click', () => {
				this.onMarkerClick(markerProps, marker, null)
			})
			return marker
		})
		this.setState({markers, markerProperties})
	}
	//create a function to close the infoWindows when re-rendering markers and when clicking on markers
	closeInfoWindow = () => {
		this.state.activeMarker && this
		.state
		.activeMarker
		.setAnimation(null)
		this.setState({displayInfoWindow:false,activeMarker:null,activeMarkerProps: null})
	};


	onMarkerClick = (props, marker, e) => {
		this.closeInfoWindow();

		let url = `https://api.foursquare.com/v2/venues/search?client_id=${CLIENTID}&client_secret=${CLIENTSECRET}&near=37.9432,-122&query=${props.name}&v=${VERSION}`
		let headers = new Headers();
		let request = new Request(url, {
			method: 'GET', headers
		});

		let amProps;
		try{fetch(request)
			.then(response => response.json())
				.then(result => {
					amProps = {
						...props, foursquare:result.response.venues[0]
					};

					if(amProps.foursquare){
						amProps = {
							...props, 
							address: amProps.foursquare.location.address, 
							food:amProps.foursquare.categories[0].shortName 
						}
						this.setState({displayInfoWindow:true, activeMarker: marker, activeMarkerProps: amProps})
					}
				})
		this.setState({displayInfoWindow:true, activeMarker: marker, activeMarkerProps: props})}

		catch(error){
			alert("Unable to fetch information")
		}
	}

	

	render(){

	const lat= this.props.lat
	const lng = this.props.lng
	const center = {lat:lat, lng:lng}
	const aMarkerProps = this.state.activeMarkerProps;

	return (
		<div>
		<div className='map'>
		<Map 
			onReady={this.renderMap}
			initalCenter = {{lat: 38, lng: 122}}
			zoom = {this.props.zoom}
			google={this.props.google}
			style = {{
				height: '90%', 
				width: '100%',
				margin: 'auto'
			}}
			onClick={this.closeInfoWindow}>

			<InfoWindow
				marker = {this.state.activeMarker}
				visible = {this.state.displayInfoWindow}
				onClose = {this.closeInfoWindow}
			>
				<div>
					<h3>{aMarkerProps && aMarkerProps.name}</h3>
					<h4> {aMarkerProps && aMarkerProps.food}</h4>
					<div> {aMarkerProps && aMarkerProps.address}</div>
					
					<div> Courtesy of Foursquare</div>
				</div>
			</InfoWindow>
			</Map>
		</div>
		</div>
	)
	}
}
export default GoogleApiWrapper({apiKey: APIKey, LoadingContainer: LoadingContainer})(MapDisplayer)