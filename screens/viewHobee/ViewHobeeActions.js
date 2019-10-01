import { HobeeApi } from '../../constants/Api';
import { fetchUserHobees } from '../home/HomeActions';
import { fetchMySettings } from '../settings/SettingsActions';

const hobeeApi = new HobeeApi();

export const FETCH_HOBEE_DETAILS = 'FETCH_HOBEE_DETAILS';
export const UPDATE_HOBEE_ATTENDANCE = 'UPDATE_HOBEE_ATTENDANCE';

export const fetchHobeeDetails = (args) => ({
	type: FETCH_HOBEE_DETAILS,
	payload: hobeeApi.fetchHobeeDetails(args)
});

export const updateHobeeAttendance = (args) => async dispatch => {
	await dispatch({
		type: UPDATE_HOBEE_ATTENDANCE,
		payload: hobeeApi.updateHobeeAttendance(args)
	});

	await dispatch(fetchMySettings(args.userId));
	return await dispatch(fetchUserHobees(args.userId));
};
