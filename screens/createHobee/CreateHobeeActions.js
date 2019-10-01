import { HobeeApi } from '../../constants/Api';
import { fetchUserHobees } from '../home/HomeActions';
import { fetchAllHobees } from '../map/MapActions';

const hobeeApi = new HobeeApi();

export const CREATE_HOBEE = 'CREATE_HOBEE';
export const CREATE_HOBEE_SUCCESS = 'CREATE_HOBEE_SUCCESS';
export const CREATE_HOBEE_ERROR = 'CREATE_HOBEE_ERROR';

export const createHobee = (id, args) => async dispatch => {
	dispatch({
		type: CREATE_HOBEE
	});

	try {
		await hobeeApi.createUserHobee(id, args);
		dispatch({
			type: CREATE_HOBEE_SUCCESS
		});
	} catch (e) {
		return dispatch({
			type: CREATE_HOBEE_ERROR
		});
	}

	await dispatch(fetchAllHobees(id));
	return await dispatch(fetchUserHobees(id));
};
