import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
// import { Map } from './Map';

export class MapContainer extends Component {
	render() {
		const style = {
			width: '50vw',
			height: '50vh'
		}
		return (
			<Map
	          google={this.props.google}
	          style={style}
	          initialCenter={{
	            lat: 40.854885,
	            lng: -88.081807
	          }}
	          zoom={15}
	          onClick={this.onMapClicked}
        	/>
		)
		// if (!this.props.loaded) {
		// 	return <div>Loading...</div>
		// }
		// return (
		// 	<div style={style}>
		// 		<Map google={this.props.google} />
		// 	</div>
		// )
	}
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo'
})(MapContainer)