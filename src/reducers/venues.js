const initialState = {
	venues: [],
	isInfoWindowOpen: false,
	venueIdHovered: null
}

function venue(state = initialState, action) {
	switch(action.type) {
		case 'SEARCH_VENUES':
			return {
				...state,
				venues: action.venues
			}
		// case 'FAVORITE_VENUE':
		// 	const updatedVenue = state.venues.filter((venue) => {
		// 		if(venue.id === action.venueId) {
		// 			venue.favorved = true;
		// 			return venue;
		// 		}

		// 	})
		// 	console.log(updatedVenue);
		// 	const venues = state.venues.filter((venue) => {
		// 		return venue.id !== action.venueId
		// 	})
		// 	const data = venues.push(updatedVenue);
		// 	console.log('walla walla', venues);
		// 	return {
		// 		...state,
		// 		venues: data
		// 	}
		case 'ON_MARKER_ENTER':
			return {
				...state,
				isInfoWindowOpen: true,
				venueIdHovered: action.venueId
			}
		case 'ON_MARKER_LEAVE':
			return {
				...state,
				isInfoWindowOpen: false,
				venueIdHovered: null
			}
		default:
			return state;
	}
}
export default venue
