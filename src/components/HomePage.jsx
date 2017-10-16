import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { fetchVenues } from '../actions';
import SearchResultsList from './SearchResultsList';
import MapComponent from './MapComponent';
import GlobeSpin from '../assets/globe-spin-detailed-sun.mp4';
import LogoVid from '../assets/future-circle.mp4';

class HomePage extends Component {
	constructor() {
		super();

		this.state = {
			query: '',
			childVisible: false
		}
	}

	search() {
		// console.log('this.state', this.state);
		this.props.fetchVenues(this.state.query);
	}

	onClick() {
    	this.setState({childVisible: !this.state.childVisible});
  	}

	render() {
		return (
			<div>
				
				<header className="hero-container">
					<div className="logo-nav-container">
						<div className="logo-div">
							<div className="logo-vid-container">
								<video className="logo-vid" autoPlay="true" loop="infinite" src={LogoVid}></video>
							</div>
							<div className="the-logo">
								<h2>L ivBit</h2>
							</div>
						</div>
						<nav>
							<div className="nav-div"
								onClick={() => this.onClick()}
							></div>
							{
							this.state.childVisible
								? 	<div className="hidden-nav">
										<ul>
											<li><Link className="nav-link" to={'/signin'}>Account</Link></li>
											{
												this.props.favoriteLocations.length > 0 ?
													<li><Link className="nav-link" to='/app'>Favorites</Link></li>
												:
													<div></div>
											}
										</ul>
									</div>
								: null
							}
						</nav>
					</div>
				</header>
				
				<div className="vid-container">
					<video className="globe-vid" autoPlay="true" loop="infinite" src={GlobeSpin}></video>
					<div className="story-div">
						<h2><span>Search</span> for any merchant that accepts <span>Bitcoin</span> crypto-currency on planet <span>Earth</span></h2>
					</div>
				</div>
				
				<section>
					<div className="main-content-container">
						<div className="form-inline form-wrapper">
							<h3>Search for Bitcoin Vendors and Services</h3>
							<div className="form-group">
								<input 
									className="form-control form-data"
									type="text"
									placeholder="food, atm, general..."
									onChange={event => this.setState({ query: event.target.value })}
								/>
								<button
									className="btn btn-primary form-search-button"
									type="button"
									onClick={() => this.search()}
								>
									Search
								</button>
							</div>
						</div>
						<div className="result-map-wrapper">
							<SearchResultsList 
								favoriteButton={true}
							/>
							<MapComponent />
						</div>
					</div>
				</section>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, { fetchVenues })(HomePage);