export const SIGNED_IN = 'SIGNED_IN';
export const SEARCH_VENUES = 'SEARCH_VENUES';
export const GET_LOCATION = 'GET_LOCATION';
export const FAVORITE_LOCATIONS = 'FAVORITE_LOCATIONS';
export const SET_FAVORITES = 'SET_FAVORITES';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGOUT = "LOGOUT";
export const ON_MARKER_ENTER = "ON_MARKER_ENTER";
export const ON_MARKER_LEAVE = "ON_MARKER_LEAVE";

export function logUser(email) {
	const action = {
		type: SIGNED_IN,
		email
	}
	return action;
}

export function logOut() {
	const action = {
		type: LOGOUT,
	}
	return action;
}

export function onMapMarkerEnter(venueId) {
	const action = {
		type: ON_MARKER_ENTER,
		venueId
	}
	return action;
}

export function onMapMarkerLeave() {
	const action = {
		type: ON_MARKER_LEAVE
	}
	return action;
}


export function loggedIn(yayNay) {
	const action = {
		type: LOGGED_IN,
		yayNay
	}
	return action;
}

function recieveVenues(json) {
	// console.log('recieveVenues json', json);
	const { venues } = json;

	return {
		type: SEARCH_VENUES,
		venues
	}
}

function fetchVenuesJson(query) {
	// console.log('query', query);
	return fetch(`https://coinmap.org/api/v1/venues?query=${query}`)
	.then(response => response.json())
}

export function fetchVenues(venue) {
	return function(dispatch) {
		return fetchVenuesJson(venue)
		.then(json => dispatch(recieveVenues(json)))
	}
}

export function getLocation(coords) {
	const action = {
		type: GET_LOCATION,
		coords
	}
	return action
}

export function favoriteLocations(location) {
	return {
		type: FAVORITE_LOCATIONS,
		location
	}
}

export function setFavorites(favorites) {
	const action = {
		type: SET_FAVORITES,
		favorites
	}
	return action;
}