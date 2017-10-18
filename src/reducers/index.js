import { combineReducers } from 'redux';
import { SIGNED_IN, SEARCH_VENUES, GET_LOCATION, FAVORITE_LOCATIONS, SET_FAVORITES, LOGGED_IN, LOGOUT, ON_MARKER_ENTER, ON_MARKER_LEAVE } from '../actions';
import venue from './venues';

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
		case LOGOUT:
			return {
				...state,
				email: null
			}
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

function setFavorites (state = [], action) {
	switch(action.type) {
		case SET_FAVORITES:
			const { favorites } = action;
			return favorites;
		default:
			return state;
	}
}

const rootReducer = combineReducers({ userSignIn, venue, myLocation, favoriteLocations, setFavorites });

export default rootReducer;