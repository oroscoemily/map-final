import React, {Component} from 'react'
import Drawer from '@material-ui/core/Drawer';


class ListMenu extends Component{
	state = {
		search: ''
	}


	styles  = {
		inputText:{
			width: '90%',
			height: '50px',
			marginLeft:'10px',
			fontSize:'1em'

		}, 

		itemList:{
			width: '250px',
			listStyle:'none',
			padding: '0px',
			margin:'auto'
		},

		item:{
			listStyle:'none', 
			marginTop: '10px',
			marginLeft:'auto',
			marginRight:'auto',

		},

		itemButton:{
			height:'75px',
			width: '100%',
			fontSize:'1em',
			verticalAlign:'center',
			textAlign: 'left',
			marginTop:'auto',
			marginBottom:'auto'
		}
	}

	updateSearch=(evt) => {
		this.setState({search: evt.target.value})
		this.props.searchLocations(evt.target.value)
	}

	
	render(){
		return (
			<div>
				<Drawer open={this.props.open} onClose={this.props.toggleList} style = {this.styles.drawer}>

				<div >
				<input 
					role="search"
					aria-label="search-bar"
					style = {this.styles.inputText}
					type = 'text'
					placeholder = 'Search List'
					name = 'search'
					onChange = {evt => this.updateSearch(evt)}
					value = {this.state.search}/>
				<ul style={this.styles.itemList}>
					{this.props.locations && this
						.props
						.locations
						.map((location, index) => {
							return(
								<li style = {this.styles.item} key={index}>
									<button style = {this.styles.itemButton} key={index} tab-index={index} onClick = {(evt) => {this.props.clickItem(index)}}> 
									<div style = {{color:'teal'}}>{location.name}</div>
									<div>{location.street}</div>
									</button>
								</li>
							)
						})
						
					}
				</ul>
				</div>
	         		
	        	</Drawer>
				
			</div>
		)
	}
}

export default ListMenu