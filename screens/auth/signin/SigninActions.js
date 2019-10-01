import { UserApi } from '../../../constants/Api';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

const User = new UserApi();

function loginSuccess(data) {
	return {
		type: LOGIN_SUCCESS,
		user: data.user,
		token: data.token
	};
}

function loginError(error) {
	return {
		type: LOGIN_ERROR,
		error
	};
}

export function login(token, notificationId, provider) {
	return async (dispatch) => {
		dispatch({ type: LOGIN });
		try {
			const data = await User.login({ token, notificationId, provider });
			return dispatch(loginSuccess(data));
		} catch (e) {
			return dispatch(loginError(e));
		}
	};
}
