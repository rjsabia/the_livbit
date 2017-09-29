import React, { Component } from 'react';
import { firebaseApp } from '../firebase'

class App extends Component {
	

	signOut(){
		firebaseApp.auth().signOut();
	}


	render() {
		return (
			<div>
				<h2>Welcome to LivBit</h2>
				<div>
					<button
						className="btn btn-danger"
						onClick={() => this.signOut()}
						>
						Sign Out
					</button>
				</div>
			</div>
		)
	}
}

export default App;