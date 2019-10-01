import {
	FETCH_BROWSE
} from './SearchActions';

const INITIAL_STATE = {
	browse: [],
	isBrowseFetched: false,
	error: {
		on: false,
		message: null
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${FETCH_BROWSE}_PENDING`:
			return INITIAL_STATE;
		case `${FETCH_BROWSE}_FULFILLED`:
			return {
				browse: action.payload,
				isBrowseFetched: true,
				error: {
					on: false,
					message: null
				}
			};
		case `${FETCH_BROWSE}_REJECTED`:
			return {
				browse: action.payload,
				isBrowseFetched: true,
				error: {
					on: true,
					message: 'Error getting browse data, try again later'
				}
			};
		default:
			return state;
	}
};
