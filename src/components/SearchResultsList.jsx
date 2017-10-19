import React, { Component } from 'react';
import { connect } from 'react-redux';
import { favoritesRef } from '../firebase';
import { favoriteLocations, setFavorites, favoriteVenue } from '../actions';

class SearchResultsList extends Component {
	constructor() {
		super();
		this.state = {
			favorited: false,
			resultLimit: 10
		}
	}

	favorite(name, lat, lon, id) {
		let location = { name: name, lat: lat, lon: lon, favorved: true }
		this.props.favoriteLocations(location);
		this.setState({ favorited: true });
		this.addFavorite(location);
		this.props.favoriteVenue(id);
	}

	addFavorite(favorite) {
		favoritesRef.push(favorite);
	}



	render() {
		return (
			<div className="result-body">
				<h3>Search Results</h3>
				<div className="result-container">
					{
						this.props.myVenues.slice(0, this.state.resultLimit).map((venue, index) => {
							return (
									<div 
										key={index}
										className="result-wrapper"
										>
										{
											this.props.user ?
												venue.favorved ? 
													<div className="star">&#9733;</div>
												:
													<div 
														className="star"
														onClick={() => this.favorite(venue.name, venue.lat, venue.lon, venue.id)}
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
	return {
		myVenues: state.venue.venues,
		user: state.userSignIn.email
	}
}

export default connect(mapStateToProps, { favoriteLocations, setFavorites, favoriteVenue })(SearchResultsList);