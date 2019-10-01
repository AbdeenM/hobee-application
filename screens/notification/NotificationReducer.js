import { FETCH_NOTIFICATIONS } from './NotificationActions';

const INITIAL_STATE = {
	data: [],
	isFetched: false,
	error: {
		on: false,
		message: null
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${FETCH_NOTIFICATIONS}_PENDING`:
			return INITIAL_STATE;
		case `${FETCH_NOTIFICATIONS}_FULFILLED`:
			return {
				data: action.payload,
				isFetched: true,
				error: {
					on: false,
					message: null
				}
			};
		case `${FETCH_NOTIFICATIONS}_FAILED`:
			return {
				data: [],
				isFetched: false,
				error: {
					on: true,
					message: 'Failed to fetch notifications'
				}
			};
		default:
			return state;
	}
}
