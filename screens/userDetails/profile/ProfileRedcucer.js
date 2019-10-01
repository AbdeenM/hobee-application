import {
	FETCH_MY_PROFILE,
	UPDATE_PROFILE,
	UPDATE_PROFILE_SUCCESS,
	UPDATE_PROFILE_ERROR
} from './ProfileActions';

const INITIAL_STATE = {
	profile: {},
	isFetched: false,
	error: {
		on: false,
		message: null
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${FETCH_MY_PROFILE}_PENDING`:
			return INITIAL_STATE;
		case `${FETCH_MY_PROFILE}_FULFILLED`:
			return {
				profile: action.payload,
				isFetched: true,
				error: {
					on: false,
					message: null
				}
			};
		case `${FETCH_MY_PROFILE}_REJECTED`:
			return {
				profile: action.payload,
				isFetched: false,
				error: {
					on: true,
					message: 'Error fetching profile, try again later'
				}
			};
		case UPDATE_PROFILE:
			return {
				...INITIAL_STATE,
			};
		case UPDATE_PROFILE_SUCCESS:
			return {
				profile: action.payload,
				isFetched: true,
				error: {
					on: false,
					message: null
				}
			};
		case UPDATE_PROFILE_ERROR:
			return {
				profile: action.payload,
				isFetched: false,
				error: {
					on: true,
					message: 'Error updating profile, try again later'
				}
			};
		default:
			return state;
	}
};
