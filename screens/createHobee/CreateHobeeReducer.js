import {
	CREATE_HOBEE,
	CREATE_HOBEE_ERROR,
	CREATE_HOBEE_SUCCESS,
} from './CreateHobeeActions';

const INITIAL_STATE = {
	error: {
		on: false,
		message: null,
	},
	isLoading: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CREATE_HOBEE:
			return {
				...INITIAL_STATE,
				isLoading: true
			};
		case CREATE_HOBEE_SUCCESS:
			return {
				...INITIAL_STATE,
				isLoading: false
			};
		case CREATE_HOBEE_ERROR:
			return {
				error: {
					on: true,
					message: 'Failed to create hobee, please try again',
				},
				isLoading: false
			};
		default:
			return state;
	}
};
