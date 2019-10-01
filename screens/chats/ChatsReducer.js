import {
	FETCH_CHATS
} from './ChatsActions';

const INITIAL_STATE = {
	data: {},
	isFetched: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${FETCH_CHATS}_PENDING`:
			return INITIAL_STATE;

		case `${FETCH_CHATS}_FULFILLED`:
			return {
				data: action.payload,
				isFetched: true
			};
		default:
			return state;
	}
};
