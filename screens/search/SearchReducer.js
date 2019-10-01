import {
	FETCH_SEARCH
} from './SearchActions';

const INITIAL_STATE = {
	data: [],
	isFetched: true,
	error: {
		on: false,
		message: null
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${FETCH_SEARCH}_PENDING`:
			return INITIAL_STATE;
		case `${FETCH_SEARCH}_FULFILLED`:
			return {
				data: action.payload,
				isFetched: true,
				error: {
					on: false,
					message: null
				}
			};
		case `${FETCH_SEARCH}_REJECTED`:
			return {
				data: action.payload,
				isFetched: true,
				error: {
					on: true,
					message: 'Error getting your search, try again later'
				}
			};
		default:
			return state;
	}
};
