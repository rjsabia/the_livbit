import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { firebaseApp } from './firebase';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import App from './components/App';
import { logUser, loggedIn } from './actions';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk));
store.subscribe(() => console.log('store', store.getState()));

firebaseApp.auth().onAuthStateChanged(user => {
	if (user) {
		// console.log('user has signed in or up', user);
		const { email } = user;
		store.dispatch(logUser(email));
		store.dispatch(loggedIn(true));
		browserHistory.push('/app');
	} else {
		// console.log('user has signed out or needs to sign in');
		// browserHistory.replace('/signin');
		store.dispatch(loggedIn(false));
		browserHistory.replace('/home');
	}
})


ReactDOM.render(
	<Provider store={store}>
		<Router path="/home" history={browserHistory}>
			<Route path="/home" component={HomePage} />
			<Route path="/app" component={App} />
			<Route path="/signin" component={SignIn} />
			<Route path="/signup" component={SignUp} />
		</Router>
	</Provider>,
document.getElementById('root'))