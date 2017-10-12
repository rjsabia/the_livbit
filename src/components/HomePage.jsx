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
								<video className="logo-vid" autoplay="" loop="infinite" src={LogoVid}></video>
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
											<li><Link className="nav-link" to={'/signin'}>account</Link></li>
										</ul>
									</div>
								: null
							}
						</nav>
					</div>
				</header>
				
				<div className="vid-container">
					<video className="globe-vid" autoplay="" loop="infinite" src={GlobeSpin}></video>
				</div>
				
				<section>
					<div className="main-content-container">
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
						<MapComponent />
					</div>
				</section>
			</div>
		)
	}
}

export default connect(null, { fetchVenues })(HomePage);