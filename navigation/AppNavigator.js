import React from 'react';
import {
	createStackNavigator,
	createAppContainer,
	createBottomTabNavigator,
	createSwitchNavigator
} from "react-navigation";
import { View } from 'react-native';
import { Icon } from 'react-native-elements';

import WelcomeScreen from '../screens/welcome/WelcomeScreen';
import SigninScreen from '../screens/auth/signin/SignInScreen';
import SignUpScreen from '../screens/auth/signup/SignUpScreen';
import ProfileScreen from '../screens/userDetails/profile/ProfileScreen';
import CategorysScreen from '../screens/userDetails/categorys/CategorysScreen';
import ChatRoomScreen from '../screens/chatRoom/ChatRoomScreen';

import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/search/SearchScreen';
import MapScreen from '../screens/map/MapScreen';
import ChatsScreen from '../screens/chats/ChatsScreen';
import NotificationScreen from '../screens/notification/NotificationScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import CreateHobeeScreen from '../screens/createHobee/CreateHobeeScreen';
import ViewHobeeScreen from '../screens/viewHobee/ViewHobeeScreen';

const AuthStack = createStackNavigator({
	Welcome: WelcomeScreen,
	SignIn: SigninScreen,
	SignUp: SignUpScreen
}, {
		headerMode: 'none',
		initialRouteName: 'Welcome'
	}
);

const BottomTapStack = createBottomTabNavigator({
	Home: HomeScreen,
	Search: SearchScreen,
	Map: MapScreen,
	Notification: NotificationScreen
}, {
		tabBarOptions: {
			showLabel: true,
			showIcon: true,
			activeTintColor: '#71cddc',
			activeBackgroundColor: '#e0f7fa',
			inactiveTintColor: '#71cddc',
			inactiveBackgroundColor: '#424242',
		}
	}
);

const PagesStack = createStackNavigator({
	Main: BottomTapStack,
	Profile: ProfileScreen,
	Categorys: CategorysScreen,
	CreateHobee: CreateHobeeScreen,
	ViewHobee: ViewHobeeScreen,
	Settings: SettingsScreen,
	Chats: ChatsScreen,
	ChatRoom: ChatRoomScreen
}, {
		headerLayoutPreset: 'left',
		defaultNavigationOptions: ({ navigation }) => {
			return {
				title: 'Hobee',
				headerTitleStyle: {
					color: '#71cddc',
					fontSize: 30,
					marginStart: 50,
					fontWeight: 'bold'
				},
				headerStyle: {
					backgroundColor: '#424242'
				},
				headerBackTitle: null,
				headerBackImage: (
					<Icon
						type='material'
						name='arrow-back'
						size={35}
						color='#71cddc'
						containerStyle={{ marginHorizontal: 10 }}
						underlayColor={'#424242'} />
				),
				headerRight: (
					<View style={{ flexDirection: 'row' }}>
						<Icon
							onPress={() => navigation.navigate('Chats')}
							type='ionicon'
							name='ios-chatbubbles'
							size={35}
							color='#71cddc'
							containerStyle={{ marginHorizontal: 10 }}
							underlayColor='#424242' />
						<Icon
							onPress={() => navigation.navigate('Settings')}
							type='material'
							name='settings'
							size={35}
							color='#71cddc'
							containerStyle={{ marginHorizontal: 10 }}
							underlayColor='#424242' />
					</View >
				)
			}
		}
	}
);

const AppNavigator = createSwitchNavigator({
	Auth: AuthStack,
	App: PagesStack
}, {
		initialRouteName: 'Auth'
	}
);


export const router = AppNavigator.router;

export default createAppContainer(AppNavigator);
