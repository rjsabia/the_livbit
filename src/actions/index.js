export const SIGNED_IN = 'SIGNED_IN';
export const SEARCH_VENUES = 'SEARCH_VENUES';
export const GET_LOCATION = 'GET_LOCATION';

export function logUser(email) {
	const action = {
		type: SIGNED_IN,
		email
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