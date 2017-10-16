import React, { Component } from 'react';
import { connect } from 'react-redux';
import { favoritesRef } from '../firebase';

class FavoriteItem extends Component {
	deleteFavorite(){
		// const { email } = this.props.user;
		const { name, lat, lon, serverKey } = this.props.favorite;
		// console.log('serverKey', serverKey);
		favoritesRef.child(serverKey).remove();
		// completeGoalRef.push({email, title});
	}

	render() {
		const { name, lat, lon } = this.props.favorite;
		return (
			<div style={{margin: '5px'}}>
				<strong>{name}</strong>
				<em>{lat}</em>
				<em>{lon}</em>
				<button
					className="btn btn-sm btn-primary"
					onClick={() => this.deleteFavorite()}
					>
					Delete
				</button>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state
}

export default connect(mapStateToProps, null)(FavoriteItem);