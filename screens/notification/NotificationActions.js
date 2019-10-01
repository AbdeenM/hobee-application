import { UserApi } from '../../constants/Api';

const userApi = new UserApi();

export const FETCH_NOTIFICATIONS = 'FETCH_NOTIFICATIONS';

export const fetchNotifications = (id) => ({
	type: FETCH_NOTIFICATIONS,
	payload: userApi.fetchNotifications(id)
});
