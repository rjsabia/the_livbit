import React, { Component } from 'react';
import { connect } from 'react-redux';
// import ResultItems from './ResultItems';

class SearchResultsList extends Component {
	render(){
		console.log('this.props', this.props);
		// console.log('this.props.myVenues.venues', this.props.myVenues.venues);
		return (
			<div>
				<h3>Search Results</h3>
				<div>
					{
						this.props.myVenues.map((venue, index) => {
							console.log('venue.name', venue.name);
							return (
								<div key={index}>
									<strong>{venue.name}</strong>
								</div>
								)
						})
					}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, null)(SearchResultsList);