import { UserApi } from '../../constants/Api';

const userApi = new UserApi();

export const FETCH_CHATS = 'FETCH_CHATS';

export const fetchUserChats = (id) => ({
	type: FETCH_CHATS,
	payload: userApi.fetchChats(id)
});
