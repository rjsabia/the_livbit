import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchVenues } from '../actions';
import SearchResultsList from './SearchResultsList';

class HomePage extends Component {
	constructor() {
		super();

		this.state = {
			query: ''
		}
	}

	search() {
		console.log('this.state', this.state);
		this.props.fetchVenues(this.state.query);
	}

	render() {
		return (
			<div>
				<h2>Home Page</h2>
				<div>
					<div><Link to={'/signin'}>Sign In</Link></div>
				</div>
				<div className="form-inline">
					<h3>Search for Bitcoin Vendors and Services</h3>
					<div className="form-group">
						<input 
							className="form-control"
							type="text"
							placeholder="food, atm, general..."
							onChange={event => this.setState({ query: event.target.value })}
						/>
						<button
							className="btn btn-primary"
							type="button"
							onClick={() => this.search()}
						>
							Search
						</button>
					</div>
				</div>
				<SearchResultsList />
			</div>
		)
	}
}

export default connect(null, { fetchVenues })(HomePage);