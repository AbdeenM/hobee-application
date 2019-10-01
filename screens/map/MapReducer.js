import { FETCH_ALL_HOBEES } from './MapActions';

const INITIAL_STATE = {
	allHobees: {
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
		case `${FETCH_ALL_HOBEES}_PENDING`:
			return INITIAL_STATE;
		case `${FETCH_ALL_HOBEES}_FULFILLED`:
			return {
				allHobees: {
					data: action.payload,
					isFetched: true,
					error: {
						on: false,
						message: null
					}
				}
			};
		case `${FETCH_ALL_HOBEES}_FAILED`:
			return {
				allHobees: {
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
