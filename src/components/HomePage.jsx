import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';
import { connect } from 'react-redux';
import { fetchVenues, logOut } from '../actions';
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
		this.props.fetchVenues(this.state.query);
	}

	onClick() {
    	this.setState({childVisible: !this.state.childVisible});
  	}

  	signOut(){
		firebaseApp.auth().signOut();
		this.props.logOut();
	}

	render() {
		console.log('this.props.userSignIn', this.props.userSignIn.email);
		return (
			<div>
				
				<header className="hero-container">
					<div className="logo-nav-container">
						<div className="logo-div">
							<Link to={'/home'} className="home-logo-anchor">
								<div className="logo-vid-container">
									<video className="logo-vid" autoPlay="true" loop="infinite" src={LogoVid}></video>
								</div>
							</Link>
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
										{
											this.props.userSignIn.email === null ?
												<li><Link className="nav-link" to={'/signin'}>Account</Link></li>
											:
												<li><Link className="nav-link" onClick={() => this.signOut()}>SignOut</Link></li>
										}
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
							<SearchResultsList />
							<div className="outer-map-wrapper">
								<MapComponent />
							</div>
						</div>
					</div>
				</section>
				<footer>
					<div className="footer-wrapper">
						<div><h4>Created with love by: Russell Sabia</h4></div>
					</div>
				</footer>

			</div>
		)
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps, { fetchVenues, logOut })(HomePage);