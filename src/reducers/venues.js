const initialState = {
	venues: [],
	isInfoWindowOpen: false,
	venueIdHovered: null
}

function venue(state = initialState, action) {
	switch(action.type) {
		case 'SEARCH_VENUES':
			const data = action.venues.filter(venue => {
			venue.favorved = false;
			return venue;
		})
			return {
				...state,
				venues: data
			}
		case 'FAVORITE_VENUE':
			let updatedVenue = {}
			state.venues.filter((venue) => {
				if(venue.id === action.venueId) {
					venue.favorved = !venue.favorved;
					updatedVenue = venue;
				}
			})
			const venues = state.venues.filter((venue) => {
				return venue.id !== action.venueId
			})
			venues.unshift(updatedVenue);
			return {
				...state,
				venues
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
export default venue;
