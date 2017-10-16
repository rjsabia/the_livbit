import React, { Component } from 'react';
import { connect } from 'react-redux';
import { favoritesRef } from '../firebase';
import { favoriteLocations, setFavorites } from '../actions';
// import ResultItems from './ResultItems';

class SearchResultsList extends Component {
	constructor() {
		super();
		this.state = {
			favorited: false,
			resultLimit: 10
		}
	}

	favorite(name, lat, lon) {
		let location = { name: name, lat: lat, lon: lon }
		this.props.favoriteLocations(location);
		this.props.setFavorites(location);
		this.setState({ favorited: true });
		this.addFavorite(location);
	}

	// addFavorite(name, lat, lon) {
	// 	console.log('favoritesRef name', name, lat, lon)
	// 	let favorite = { name: name, lat: lat, lon: lon };
	// 	favoritesRef.push(favorite);
	// }

	addFavorite(favorite) {
		favoritesRef.push(favorite);
	}



	render(){
		console.log('this.props', this.props);
		return (
			<div className="result-body">
				<h3>Search Results</h3>
				<div className="result-container">
					{
						this.props.myVenues.slice(0, this.state.resultLimit).map((venue, index) => {
							// console.log('venue.name', venue.name);
							return (
									<div 
										key={index}
										className="result-wrapper"
										>
										{
											this.props.favoriteButton ?
												this.state.favorited ? 
													<div className="star">&#9733;</div>
												:
													<div 
														className="star"
														onClick={() => this.favorite(venue.name, venue.lat, venue.lon)}
													>
														&#9734;
													</div>
											:
												<div></div>	
										}
										<div className="results">
											<strong>{venue.name}</strong>
										</div>
									</div>
								)
						})
					}
				</div>	
				{
				this.props.myVenues.length === 0 ?
					<div>No Search Results</div>
				:
					<div className="load-more-results"
						onClick={() => {
							this.setState({ resultLimit: this.state.resultLimit+10})
						}}
					>
						Load 10 more results >>>	
					</div>
				}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, { favoriteLocations, setFavorites })(SearchResultsList);