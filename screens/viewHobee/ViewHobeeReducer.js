import { FETCH_HOBEE_DETAILS, UPDATE_HOBEE_ATTENDANCE } from './ViewHobeeActions';

const INITIAL_STATE = {
	data: {},
	isFetched: false,
	error: {
		on: false,
		message: null
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${FETCH_HOBEE_DETAILS}_PENDING`:
			return INITIAL_STATE;
		case `${FETCH_HOBEE_DETAILS}_FULFILLED`:
			return {
				data: action.payload,
				isFetched: true,
				error: {
					on: false,
					message: null
				}
			};
		case `${FETCH_HOBEE_DETAILS}_FAILED`:
			return {
				data: {},
				isFetched: false,
				error: {
					on: true,
					message: 'Failed to fetch group hobees'
				}
			};

		case `${UPDATE_HOBEE_ATTENDANCE}_PENDING`:
			return INITIAL_STATE;
		case `${UPDATE_HOBEE_ATTENDANCE}_FULFILLED`:
			return {
				data: action.payload,
				isFetched: true,
				error: {
					on: false,
					message: null
				}
			};
		case `${UPDATE_HOBEE_ATTENDANCE}_FAILED`:
			return {
				data: {},
				isFetched: false,
				error: {
					on: true,
					message: 'Failed to update group hobees'
				}
			};
		default:
			return state;
	}
}
