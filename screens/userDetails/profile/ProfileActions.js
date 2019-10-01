import { UserApi } from '../../../constants/Api';
import { fetchMySettings } from '../../settings/SettingsActions';

const userApi = new UserApi();

export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR';

export const FETCH_MY_PROFILE = 'FETCH_MY_PROFILE';

export const updateMyProfile = (id, args) => async dispatch => {
	dispatch({ type: UPDATE_PROFILE });
	try {
		const newProfile = await userApi.updateMyProfile(id, args);
		dispatch({
			type: UPDATE_PROFILE_SUCCESS,
			payload: newProfile
		});
	} catch (e) {
		return dispatch({ type: UPDATE_PROFILE_ERROR });
	}
	return await dispatch(fetchMySettings(id));
};

export const fetchMyProfile = (id) => ({
	type: FETCH_MY_PROFILE,
	payload: userApi.fetchMyProfile(id)
});
