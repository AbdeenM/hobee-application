import {
	SEND_MESSAGE,
	RECIEVED_MESSAGE,
	UPDATE_MESSAGES_HEIGHT
} from './ChatRoomActions';

const INITIAL_STATE = {
	data: {},
	isFetched: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${SEND_MESSAGE}_PENDING`:
			return INITIAL_STATE;

		case `${SEND_MESSAGE}_FULFILLED`:
			return {
				data: action.payload,
				isFetched: true
			};

		case `${RECIEVED_MESSAGE}_PENDING`:
			return INITIAL_STATE;

		case `${RECIEVED_MESSAGE}_FULFILLED`:
			return {
				data: action.payload,
				isFetched: true
			};

		case `${UPDATE_MESSAGES_HEIGHT}_PENDING`:
			return INITIAL_STATE;

		case `${UPDATE_MESSAGES_HEIGHT}_FULFILLED`:
			return {
				data: action.payload,
				isFetched: true
			};
		default:
			return state;
	}
};
