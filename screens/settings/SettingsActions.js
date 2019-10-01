import { UserApi } from '../../constants/Api';

const userApi = new UserApi();

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS';
export const UPDATE_SETTINGS_ERROR = 'UPDATE_SETTINGS_ERROR';

export const FETCH_MY_SETTINGS = 'FETCH_MY_SETTINGS';

export const updateMySettings = (id, args) => async dispatch => {
	dispatch({ type: UPDATE_SETTINGS });
	try {
		const newSettings = await userApi.updateMySettings(id, args);
		dispatch({
			type: UPDATE_SETTINGS_SUCCESS,
			payload: newSettings
		});

	} catch (e) {
		return dispatch({ type: UPDATE_SETTINGS_ERROR });
	}
	return await dispatch(fetchMySettings(id));
};

export const fetchMySettings = (id) => ({
	type: FETCH_MY_SETTINGS,
	payload: userApi.fetchMySettings(id)
});
