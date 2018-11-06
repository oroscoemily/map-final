import React, { Component }from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react'

const APIKey = 'AIzaSyCc-MeZHcqtRL8xVr-E9m338YHbPwF9sS0'

class MapDisplayer extends Component{
	state={
		map: null,
	}
	componentDidMount(){
	}

	renderMap = (props, map)=>{
		this.setState({map})
	}
	

	render(){
	const lat = this.props.lat
	const lng = this.props.lng
	return (
		<div>
		<div className='map'>
		<Map 
			renderMap={this.renderMap}
			initalCenter = {{lat, lng}}
			zoom = {this.props.zoom}
			google={this.props.google}
			style = {{
				height: ' 90%', 
				width: '90%',
				margin: 'auto'
			}}
			onClick={this.closeInfoWindow}
			/>
		</div>
		</div>)
	}
}
export default GoogleApiWrapper({apiKey: APIKey})(MapDisplayer)







