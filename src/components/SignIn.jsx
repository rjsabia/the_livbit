import React, { Component } from 'react';
import { Link } from 'react-router';
import { firebaseApp } from '../firebase';

class SignIn extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			error: {
				message: ''
			}
		}
	}

	signIn() {
		console.log('this,state', this.state);
		const { email, password } = this.state;
		firebaseApp.auth().signInWithEmailAndPassword(email, password)
			.catch(error => {
				this.setState({error})
			})
	}

	render() {
		return (
			<div className="form-inline sign-in-up" style={{margin: '5%'}}>
				<div>
					<Link to={'/home'}><h2>LivBit</h2></Link>
				</div>
				{' '}
				<h2>Sign In</h2>
				<div className="form-group">
					<input 
						className="form-control form-data"
						type="text"
						style={{marginRight: '5px'}}
						placeholder="email"
						onChange={event => this.setState({email: event.target.value})}
					/>
					<input 
						className="form-control form-data"
						type="password"
						style={{marginRight: '5px'}}
						placeholder="password"
						onChange={event => this.setState({password: event.target.value})}
					/>
					<button
						className="btn btn-primary form-search-button"
						type="button"
						onClick={() => this.signIn()}
					>
					Sign In
					</button>
				</div>
				<div>{this.state.error.message}</div>
				<div><Link className="not-reg-or-signed" to={'/signup'}>Not registered? Sign up instead</Link></div>
			</div>
		)
	}
}
export default SignIn;

