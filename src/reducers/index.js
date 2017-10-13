import { combineReducers } from 'redux';
import { SIGNED_IN, SEARCH_VENUES, GET_LOCATION, FAVORITE_LOCATIONS } from '../actions';

let user = {
	email: null
}

function userSignIn(state = user, action) {
	switch (action.type) {
		case SIGNED_IN:
			const { email } = action;
			user = {
				email
			}
			return user;
		default:
			return state;
	}
}

function myVenues(state = [], action) {
	switch(action.type) {
		case SEARCH_VENUES:
			return action.venues;
		default:
			return state;
	}
}

function myLocation(state = [], action) {
	switch(action.type) {
		case GET_LOCATION:
			return action.coords;
		default: 
			return state;
	}
}

function favoriteLocations(state = [], action) {
	switch(action.type) {
		case FAVORITE_LOCATIONS:
			state = [...state, action.location]
			return state;
		default:
			return state;
	}
}

const rootReducer = combineReducers({ userSignIn, myVenues, myLocation, favoriteLocations });

export default rootReducer;