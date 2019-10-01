import { ChatApi } from '../../constants/Api';

const chatApi = new ChatApi();

export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECIEVED_MESSAGE = 'RECIEVED_MESSAGE';
export const UPDATE_MESSAGES_HEIGHT = 'UPDATE_MESSAGES_HEIGHT';

export const sendMessage = (args) => ({
	type: SEND_MESSAGE,
	payload: chatApi.sendChatMessage(args)
});

export const recievedMessages = (id) => ({
	type: RECIEVED_MESSAGE,
	payload: id
});

export const updateMessagesHeight = (id) => ({
	type: UPDATE_MESSAGES_HEIGHT,
	payload: id
});
