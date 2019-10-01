import React from "react";
import {
	AsyncStorage,
	Image,
	Text,
	View,
	Alert
} from "react-native";
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';
import { Notifications } from 'expo';

import { connect } from 'react-redux';

import { SocialIcon } from 'react-native-elements';
import LottieView from 'lottie-react-native';

import { HobeePermissions } from '../../../constants/Permissions';
import Config from '../../../constants/Config';
import { login } from './SigninActions';

import Styles from "./Styles";

const permissions = new HobeePermissions();

const mapStateToProps = (state, ownProps) => ({
	// ... computed data from state and optionally ownProps
	theme: state.theme,
	signin: state.user
});

const mapDispatchToProps = {
	// ... normally is an object full of action creators
	login
};

class SignInScreen extends React.Component {
	state = {
		loaders: [
			require('../../../assets/loading1.json'),
			require('../../../assets/loading2.json'),
			require('../../../assets/loading3.json'),
			require('../../../assets/loading4.json'),
			require('../../../assets/loading5.json')
		],
		loading: false
	};

	async registerForPushNotificationsAsync() {
		await permissions.getNotificationsPermission();

		// Get the token that uniquely identifies this device
		const token = await Notifications.getExpoPushTokenAsync();
		return token;
	};

	_onLoginPress = name => {
		if (name === 'facebook') {
			this._logInWithFacebook();
		} else if (name === 'google') {
			this._loginWithGoogle();
		} else if (name === 'email') {
			this.props.navigation.navigate('SignUp');
		}
	};

	async _logInWithFacebook() {
		this.setState({ loading: true });

		try {
			const notificationId = await this.registerForPushNotificationsAsync();

			const {
				type,
				token,
			} = await Facebook.logInWithReadPermissionsAsync(Config.APP_ID, {
				permissions: ['public_profile', 'email'],
				behavior: 'web'
			});

			if (type === 'success') {
				await this.props.login(token, notificationId, 'facebook');

				// Save token to AsyncStorage
				AsyncStorage.setItem('userToken', token);
				this.setState({ loading: false });

				this.props.navigation.navigate('Home');
			} else {
				this.setState({ loading: false });
				throw Alert.alert('Error signing in, please try again!');
			}
		} catch (e) {
			this.setState({ loading: false });
			Alert.alert('Something went wrong signing in, please try again!');
		}
	};

	async _loginWithGoogle() {
		this.setState({ loading: true });

		try {
			const notificationId = await this.registerForPushNotificationsAsync();

			const result = await Google.logInAsync({
				androidClientId: Config.CLIENT_ID_ANDROID,
				iosClientId: Config.CLIENT_ID_IOS,
				scopes: ['profile', 'email'],
				behavior: 'web'
			});

			if (result.type === 'success') {
				await this.props.login(result.accessToken, notificationId, 'google');

				// Save token to AsyncStorage
				AsyncStorage.setItem('userToken', result.accessToken);
				this.setState({ loading: false });

				this.props.navigation.navigate('Home');
			} else {
				this.setState({ loading: false });
				Alert.alert('Error signing in, please try again!');
				return { cancelled: true };
			}
		} catch (e) {
			this.setState({ loading: false });
			Alert.alert('Something went wrong signing in, please try again!');
		}
	};

	render() {
		const {
			isLoading
		} = this.props.signin;

		if (isLoading || this.state.loading) {
			return (
				<LottieView
					loop
					autoPlay
					style={{ backgroundColor: this.props.theme.bgBottom }}
					source={this.state.loaders[Math.floor(Math.random() * this.state.loaders.length)]} />
			);
		};

		return (
			<View style={{
				backgroundColor: this.props.theme.bgBottom, ...Styles.root
			}}>
				<View style={Styles.topContainer}>
					<Image
						source={require('../../../assets/icon.png')}
						style={Styles.image} />
					<Text style={{
						color: this.props.theme.fontTitleColor, ...Styles.title
					}}>Hobee</Text>
				</View>

				<View style={Styles.middleContainer}>
					<Text style={{
						color: this.props.theme.fontColor, ...Styles.content
					}}>Connect with people of the same interest with <Text style={{
						color: this.props.theme.primaryColor, ...Styles.wordHobee
					}}>Hobee</Text></Text>
				</View>

				<View style={Styles.bottomContainer}>
					<SocialIcon
						title='Connect With Email'
						raised
						button
						type='inbox'
						style={{
							backgroundColor: this.props.theme.primaryColor, ...Styles.buttonEmail
						}}
						onPress={() => this._onLoginPress('email')}
					/>
					<SocialIcon
						title='Connect With Facebook'
						button
						raised
						type='facebook'
						style={Styles.buttonFacebook}
						onPress={() => this._onLoginPress('facebook')}
					/>
					<SocialIcon
						title='Connect With Google'
						button
						raised
						type='google'
						style={Styles.buttonGoogle}
						onPress={() => this._onLoginPress('google')}
					/>
					<Text style={{
						color: this.props.theme.fontTitleColor, ...Styles.footerText
					}}>Copyright 2019. All rights reserver to Hobee</Text>
				</View>
			</View>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignInScreen);
