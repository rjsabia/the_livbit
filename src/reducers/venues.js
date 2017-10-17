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
