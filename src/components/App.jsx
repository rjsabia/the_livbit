import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';
import { connect } from 'react-redux';
import '../styles/index.css';

class App extends Component {
	

	signOut(){
		firebaseApp.auth().signOut();
	}


	render() {
		return (
			<div className="App">
				<div>
					<Link to={'/home'}><h2>LivBit</h2></Link>
				</div>
				<h2>Welcome to your LivBit favorites</h2>
				<div>
					<h4>Favorites</h4>
					{
					this.props.favoriteLocations.map((location, index) => {
						return (
							<div 
								key={index}
								className="favorite-wrapper"
								>
								<div className="each-favorite">{location.name}</div>
							</div>
						)
					})
				}
				</div>
				<div>
					<button
						className="btn btn-danger"
						onClick={() => this.signOut()}
						>
						Sign Out
					</button>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, null)(App);