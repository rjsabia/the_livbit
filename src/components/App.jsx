import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';
import { favoritesRef } from '../firebase';
import { connect } from 'react-redux';
import { setFavorites, logOut } from '../actions';
import '../styles/index.css';
import LogoVid from '../assets/future-circle.mp4';

class App extends Component {
	constructor() {
		super();

		this.state = {
			childVisible: false
		}
	}
	
	componentDidMount() {
		favoritesRef.on('value', snap => {
			let favorites = [];
			snap.forEach(favorite => {
				const { name, lat, lon } = favorite.val();
				favorites.push({ name, lat, lon });
			})
			this.props.setFavorites(favorites);
		})
	}

	signOut(){
		firebaseApp.auth().signOut();
		this.props.logOut();
	}

	clearAll() {
		favoritesRef.set([]);
	}

	onClick() {
    	this.setState({childVisible: !this.state.childVisible});
  	}

	render() {
		return (
			<div className="App">
			
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
												this.props.userSignedIn.email === null ?
													<li><Link className="nav-link" to='/signin'>SignIn</Link></li>
												:
													<li><Link className="nav-link" onClick={() => this.signOut()}>SignOut</Link></li>
											}
											<li><Link className="nav-link" to='/home'>Home</Link></li>
										</ul>
									</div>
								: null
							}
						</nav>
					</div>
				</header>

				<div className="favorites-main-content">
					<h2><u>Welcome to LivBit favorites</u></h2>
					<div>
						<h4>Favorites</h4>
						<div>
							{
								this.props.userSignedIn.email === null ?
									<div>
										<h2>Sign up or into your account for favorites</h2>
									</div>

								:
									this.props.favorites.length > 0 ?
										this.props.favorites.map((favorite, index) => {
											const { name, lat, lon } = favorite;
											return(
												<div key={index}>
													<strong>{name}</strong> Lat: <em>{lat}</em> Lon: <em>{lon}</em>
												</div>
											)
										})
									:
										<div>
											<h4>Sorry, you have no saved favorites</h4>
										</div>
							}
						</div>
						<div>
							<button
								className="form-search-button"
								onClick={() => this.clearAll()}
							>Clear All Favorites</button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	const { setFavorites, userSignIn } = state;
	return {
		favorites: setFavorites,
		userSignedIn: userSignIn
	}
}

export default connect(mapStateToProps, { setFavorites, logOut })(App);