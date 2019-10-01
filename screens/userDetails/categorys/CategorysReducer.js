import {
	FETCH_MY_CATEGORYS,
	UPDATE_CATEGORYS,
	UPDATE_CATEGORYS_SUCCESS,
	UPDATE_CATEGORYS_ERROR
} from './CategorysActions';

const INITIAL_STATE = {
	categorys: {},
	isFetched: false,
	error: {
		on: false,
		message: null
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${FETCH_MY_CATEGORYS}_PENDING`:
			return INITIAL_STATE;
		case `${FETCH_MY_CATEGORYS}_FULFILLED`:
			return {
				categorys: action.payload,
				isFetched: true,
				error: {
					on: false,
					message: null
				}
			};
		case `${FETCH_MY_CATEGORYS}_REJECTED`:
			return {
				categorys: {},
				isFetched: false,
				error: {
					on: true,
					message: 'Error fetching categorys, try again later'
				}
			};
		case UPDATE_CATEGORYS:
			return {
				...INITIAL_STATE,
			};
		case UPDATE_CATEGORYS_SUCCESS:
			return {
				categorys: action.payload,
				isFetched: true,
				error: {
					on: false,
					message: null
				}
			};
		case UPDATE_CATEGORYS_ERROR:
			return {
				categorys: {},
				isFetched: false,
				error: {
					on: true,
					message: 'Error updating categorys, try again later'
				}
			};
		default:
			return state;
	}
};
