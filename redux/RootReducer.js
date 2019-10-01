import { combineReducers } from 'redux';

import ThemeReducer from '../constants/theme/ThemeReducer';
import UserReducer from '../screens/auth/signin/SigninReducer';
import ProfileReducer from '../screens/userDetails/profile/ProfileRedcucer';
import CategorysReducer from '../screens/userDetails/categorys/CategorysReducer';
import NavReducer from '../navigation/NavReducer';
import HomeReducer from '../screens/home/HomeReducer';
import SearchReducer from '../screens/search/SearchReducer';
import BrowseReducer from '../screens/search/BrowseReducer';
import MapReducer from '../screens/map/MapReducer';
import ChatsReducer from '../screens/chats/ChatsReducer';
import NotificationReducer from '../screens/notification/NotificationReducer';
import SettingsReducer from '../screens/settings/SettingsReducer';
import CreateHobeeReducer from '../screens/createHobee/CreateHobeeReducer';
import ViewHobeeReducer from '../screens/viewHobee/ViewHobeeReducer';

export default combineReducers({
	theme: ThemeReducer,
	user: UserReducer,
	profile: ProfileReducer,
	categorys: CategorysReducer,
	nav: NavReducer,
	home: HomeReducer,
	search: SearchReducer,
	browse: BrowseReducer,
	map: MapReducer,
	chats: ChatsReducer,
	notification: NotificationReducer,
	settings: SettingsReducer,
	createHobee: CreateHobeeReducer,
	hobeeDetails: ViewHobeeReducer
});
