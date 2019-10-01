import React from 'react';
import {
	Image,
	View,
	AsyncStorage,
	Alert,
	Text
} from 'react-native';
import { Notifications } from 'expo';
import {
	Button,
	Input
} from 'react-native-elements';
import { connect } from 'react-redux';

import LottieView from 'lottie-react-native';

import { HobeePermissions } from '../../../constants/Permissions';
import { login } from './SignUpActions';

import Styles from './Styles';

const permissions = new HobeePermissions();

const mapStateToProps = (state, ownProps) => ({
	// ... computed data from state and optionally ownProps
	theme: state.theme,
	createSignup: state.user
});

const mapDispatchToProps = {
	// ... normally is an object full of action creators
	login
};

class SignUpScreen extends React.Component {
	state = {
		loaders: [
			require('../../../assets/loading1.json'),
			require('../../../assets/loading2.json'),
			require('../../../assets/loading3.json'),
			require('../../../assets/loading4.json'),
			require('../../../assets/loading5.json')
		],
		loading: false,
		name: '',
		email: ''
	};

	async registerForPushNotificationsAsync() {
		await permissions.getNotificationsPermission();

		// Get the token that uniquely identifies this device
		const token = await Notifications.getExpoPushTokenAsync();
		return token;
	};

	_createSignup = async () => {
		this.setState({ loading: true });
		let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (this.state.name.length < 6) {
			this.setState({ loading: false });
			throw Alert.alert('The name must be atleast 6 characters');
		}

		if (pattern.test(String(this.state.email).toLowerCase()) === false) {
			this.setState({ loading: false });
			throw Alert.alert('Enter a valid email');
		}

		try {
			const userData = {
				name: this.state.name,
				email: this.state.email
			};
			const notificationId = await this.registerForPushNotificationsAsync();
			const result = await this.props.login(userData, notificationId, 'email');
			this.setState({ loading: false });

			if (result.token === null) {
				throw Alert.alert('Error!');
			} else {
				// Save token to AsyncStorage
				AsyncStorage.setItem('userToken', result.token);

				this.props.navigation.navigate('Main');
			}
		} catch (e) {
			this.setState({ loading: false });
			throw Alert.alert('Error signing in, please try again!');
		}

	};

	render() {
		const {
			isLoading
		} = this.props.createSignup;

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
					<Input
						onChangeText={(text) => this.setState({ name: text })}
						autoCorrect={false}
						autoCapitalize='none'
						placeholder='Username'
						placeholderTextColor={this.props.theme.fontTitleColor}
						leftIcon={{ type: 'material-community', name: 'account', color: this.props.theme.fontTitleColor }}
						leftIconContainerStyle={{ marginEnd: 15 }}
						value={this.state.name}
						inputStyle={{ color: this.props.theme.fontColor }} />

					<Input
						onChangeText={(text) => this.setState({ email: text })}
						autoCorrect={false}
						autoCapitalize='none'
						keyboardType='email-address'
						placeholder='Email Address'
						placeholderTextColor={this.props.theme.fontTitleColor}
						leftIcon={{ type: 'entypo', name: 'email', color: this.props.theme.fontTitleColor }}
						leftIconContainerStyle={{ marginEnd: 15 }}
						value={this.state.email}
						inputStyle={{ color: this.props.theme.fontColor }} />
				</View>

				<View style={Styles.bottomContainer}>
					<Button
						onPress={() => this._createSignup()}
						raised
						title='REGISTER'
						titleStyle={{ color: this.props.theme.fontTitleColor, fontWeight: 'bold' }}
						containerStyle={{ marginVertical: 10, marginHorizontal: 20 }}
						buttonStyle={{ backgroundColor: this.props.theme.primaryColor, borderRadius: 10 }} />

					<Button
						onPress={() => this.props.navigation.goBack()}
						raised
						title='BACK'
						titleStyle={{ color: this.props.theme.fontTitleColor, fontWeight: 'bold' }}
						containerStyle={{ marginVertical: 10, marginHorizontal: 20 }}
						buttonStyle={{ backgroundColor: this.props.theme.errorColor, borderRadius: 10 }} />
				</View>
			</View >
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignUpScreen);
