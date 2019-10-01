import { HobeeApi } from '../../constants/Api';

const hobeeApi = new HobeeApi();

export const FETCH_SEARCH = 'FETCH_SEARCH';
export const FETCH_BROWSE = 'FETCH_BROWSE';

export const fetchSearch = (args) => ({
	type: FETCH_SEARCH,
	payload: hobeeApi.fetchSearch(args)
});

export const fetchBrowse = () => ({
	type: FETCH_BROWSE,
	payload: hobeeApi.fetchBrowse()
});
