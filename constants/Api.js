import axios from 'axios';
import Config from './Config';

axios.defaults.baseURL = `${Config.SERVER_URL}/api`;

const fakeCategoryId = '5c4b3c51ce4464316ec1e22b';

class HobeeApi {
	constructor() {
		this.categoryId = fakeCategoryId;
		this.categoryPath = `/categorys`;
		this.hobeePath = '/hobees'
	};

	async fetchUserHobees(id) {
		try {
			const { data } = await axios.get(`${this.categoryPath}/${id}/hobees`);
			return data.message;
		} catch (e) {
			throw e;
		}
	};

	async createUserHobee(id, args) {
		try {
			const data = await axios.post(`${this.categoryPath}/${id}/hobees/new`, { ...args });
			return data;
		} catch (e) {
			throw e;
		}
	};

	async fetchAllHobees() {
		try {
			const { data } = await axios.get(this.hobeePath);
			return data.message;
		} catch (e) {
			throw e;
		}
	};

	async fetchBrowse() {
		try {
			const { data } = await axios.post(`${this.hobeePath}/browse`);
			return data.message;
		} catch (e) {
			throw e;
		}
	};

	async fetchSearch(args) {
		try {
			const { data } = await axios.post(`${this.hobeePath}/search`, args);
			return data.message;
		} catch (e) {
			throw e;
		}
	};

	async fetchHobeeDetails(args) {
		try {
			const { data } = await axios.post(`${this.hobeePath}/hobeeDetails`, args);
			return data.message;
		} catch (e) {
			throw e;
		}
	};

	async updateHobeeAttendance(args) {
		try {
			const { data } = await axios.post(`${this.hobeePath}/hobeeAttendance`, args);
			return data.message;
		} catch (e) {
			throw e;
		}
	};
}


class UserApi {
	constructor() {
		this.path = '/users';
		this.chatPath = '/chats'
	}

	async login(args) {
		try {
			const { data } = await axios.post(`${this.path}/auth0`, args);
			return data;
		} catch (e) {
			throw e;
		}
	};

	async updateMyProfile(id, args) {
		try {
			const { data } = await axios.post(`${this.path}/${id}/profile/new`, args);
			return data.message;
		} catch (e) {
			throw e;
		}
	};

	async fetchMyProfile(id) {
		try {
			const { data } = await axios.get(`${this.path}/${id}/profile`);
			return data.message;
		} catch (e) {
			throw e;
		}
	};

	async updateMyCategorys(id, args) {
		try {
			const { data } = await axios.post(`${this.path}/${id}/categorys/new`, args);
			return data.message;
		} catch (e) {
			throw e;
		}
	};

	async fetchMyCategorys(id) {
		try {
			const { data } = await axios.get(`${this.path}/${id}/categorys`);
			return data.message;
		} catch (e) {
			throw e;
		}
	};

	async updateMySettings(id, args) {
		try {
			const { data } = await axios.post(`${this.path}/${id}/settings/new`, args);
			return data.message;
		} catch (e) {
			throw e;
		}
	};

	async fetchMySettings(id) {
		try {
			const { data } = await axios.get(`${this.path}/${id}/settings`);
			return data.message;
		} catch (e) {
			throw e;
		}
	};

	async fetchNotifications(id) {
		try {
			const { data } = await axios.get(`${this.path}/${id}/notifications`);
			return data.message;
		} catch (e) {
			throw e;
		}
	};

	async fetchChats(id) {
		try {
			const { data } = await axios.get(`${this.chatPath}/${id}/chats`);
			return data.message;
		} catch (e) {
			throw e;
		}
	};
}

export {
	HobeeApi,
	UserApi
};
