import { UserApi } from '../../../constants/Api';

const userApi = new UserApi();

export const UPDATE_CATEGORYS = 'UPDATE_CATEGORYS';
export const UPDATE_CATEGORYS_SUCCESS = 'UPDATE_CATEGORYS_SUCCESS';
export const UPDATE_CATEGORYS_ERROR = 'UPDATE_CATEGORYS_ERROR';

export const FETCH_MY_CATEGORYS = 'FETCH_MY_CATEGORYS';

export const updateMyCategorys = (id, args) => async dispatch => {
	dispatch({ type: UPDATE_CATEGORYS });
	try {
		const newCategorys = await userApi.updateMyCategorys(id, args);
		dispatch({
			type: UPDATE_CATEGORYS_SUCCESS,
			payload: newCategorys
		});
	} catch (e) {
		return dispatch({ type: UPDATE_CATEGORYS_ERROR });
	}

	return await dispatch(fetchMyCategorys(id));
};

export const fetchMyCategorys = (id) => ({
	type: FETCH_MY_CATEGORYS,
	payload: userApi.fetchMyCategorys(id)
});
