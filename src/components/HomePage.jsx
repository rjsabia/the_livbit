import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchVenues } from '../actions';
import SearchResultsList from './SearchResultsList';
// import DemoGps from './Demo_Gps';
import GoogleApiWrapper from './MapContainer';

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
				<header className="hero-container">
					<div className="logo-nav-container">
						<div className="logo-div">
							<h2>LivBit</h2>
						</div>
						<nav>
							<div className="nav-div">
								<ul>
									<li><Link className="nav-link" to={'/signin'}>Sign In</Link></li>
								</ul>
							</div>
						</nav>
					</div>
				</header>
				<div className="hero-div">
						<div>
							<img alt="people at restaraunt" />
						</div>
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
				<GoogleApiWrapper />
			</div>
		)
	}
}

export default connect(null, { fetchVenues })(HomePage);