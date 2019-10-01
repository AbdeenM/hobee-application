import {
	FETCH_MY_SETTINGS,
	UPDATE_SETTINGS,
	UPDATE_SETTINGS_SUCCESS,
	UPDATE_SETTINGS_ERROR
} from './SettingsActions';

const INITIAL_STATE = {
	settings: {},
	isFetched: false,
	error: {
		on: false,
		message: null
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${FETCH_MY_SETTINGS}_PENDING`:
			return INITIAL_STATE;
		case `${FETCH_MY_SETTINGS}_FULFILLED`:
			return {
				settings: action.payload,
				isFetched: true,
				error: {
					on: false,
					message: null
				}
			};
		case `${FETCH_MY_SETTINGS}_REJECTED`:
			return {
				settings: action.payload,
				isFetched: false,
				error: {
					on: true,
					message: 'Error fetching settings, try again later'
				}
			};
		case UPDATE_SETTINGS:
			return {
				...INITIAL_STATE,
			};
		case UPDATE_SETTINGS_SUCCESS:
			return {
				settings: action.payload,
				isFetched: true,
				error: {
					on: false,
					message: null
				}
			};
		case UPDATE_SETTINGS_ERROR:
			return {
				settings: action.payload,
				isFetched: false,
				error: {
					on: true,
					message: 'Error updating settings, try again later'
				}
			};
		default:
			return state;
	}
};
