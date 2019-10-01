import { FETCH_USER_HOBEES } from './HomeActions';

const INITIAL_STATE = {
	userHobees: {
		data: [],
		isFetched: false,
		error: {
			on: false,
			message: null
		}
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${FETCH_USER_HOBEES}_PENDING`:
			return INITIAL_STATE;
		case `${FETCH_USER_HOBEES}_FULFILLED`:
			return {
				userHobees: {
					data: action.payload,
					isFetched: true,
					error: {
						on: false,
						message: null
					}
				}
			};
		case `${FETCH_USER_HOBEES}_FAILED`:
			return {
				userHobees: {
					data: [],
					isFetched: false,
					error: {
						on: true,
						message: 'Failed to fetch group hobees'
					}
				}
			};
		default:
			return state;
	}
}
