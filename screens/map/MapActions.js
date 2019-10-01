import { HobeeApi } from '../../constants/Api';

const hobeeApi = new HobeeApi();

export const FETCH_ALL_HOBEES = 'FETCH_ALL_HOBEES';

export const fetchAllHobees = () => ({
	type: FETCH_ALL_HOBEES,
	payload: hobeeApi.fetchAllHobees()
});
