import { HobeeApi } from '../../constants/Api';

const hobeeApi = new HobeeApi();

export const FETCH_USER_HOBEES = 'FETCH_USER_HOBEES';

export const fetchUserHobees = (id) => ({
	type: FETCH_USER_HOBEES,
	payload: hobeeApi.fetchUserHobees(id)
});
