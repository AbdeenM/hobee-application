import React from "react";
import {
	View,
	Image,
	AsyncStorage
} from "react-native";
import { connect } from 'react-redux';
import { Video } from 'expo-av';
import { Notifications } from 'expo';
import { Button } from 'react-native-elements';

import LottieView from 'lottie-react-native';
import Toast from 'react-native-root-toast';

import { HobeePermissions } from '../../constants/Permissions';

import Styles from "./Styles";

const permissions = new HobeePermissions();

const mapStateToProps = (state, ownProps) => ({
	// ... computed data from state and optionally ownProps
	theme: state.theme,
	userInfo: state.user.info
});

const mapDispatchToProps = {
	// ... normally is an object full of action creators
};

class WelcomeScreen extends React.Component {
	state = {
		userToken: ''
	};

	componentDidMount = async () => {
		await permissions.getNotificationsPermission();

		const userToken = await AsyncStorage.getItem('userToken');
		this.setState({ userToken });

		this._notificationSubscription = Notifications.addListener(this._handleNotification);
	};

	_handleNotification = (notification) => {
		if (notification.origin === 'received') {
			if (notification.data.mode === 'hobeeTime') {
				// When notification is a hobee time
				Toast.show(notification.data.body, {
					duration: Toast.durations.LONG,
					position: Toast.positions.BOTTOM,
					backgroundColor: this.props.theme.fontTitleColor,
					shadowColor: this.props.theme.fontColor,
					textColor: this.props.theme.bgTop,
					opacity: 1
				});
			} else if (notification.data.mode === 'message') {
				// When notification is a chat
				Toast.show(notification.data.body, {
					duration: Toast.durations.LONG,
					position: Toast.positions.BOTTOM,
					backgroundColor: this.props.theme.fontTitleColor,
					shadowColor: this.props.theme.fontColor,
					textColor: this.props.theme.bgTop,
					opacity: 1
				});
			}
		};
	};

	_onBuffer() {
		return (
			<LottieView
				loop
				autoPlay
				style={{ backgroundColor: this.props.theme.bgBottom }}
				source={this.state.loaders[Math.floor(Math.random() * this.state.loaders.length)]} />
		);
	};

	_onNavigate() {
		if (this.state.userToken) {
			this.props.navigation.navigate('Home');
		} else {
			this.props.navigation.navigate('SignIn');
		}
	};

	render() {
		const backgroundVideo = require('../../assets/welcomeScreen.mp4');

		return (
			<View style={{
				backgroundColor: this.props.theme.bgBottom, ...Styles.root
			}}>
				<Video
					source={backgroundVideo}
					rate={1.0}
					volume={1.0}
					isMuted={true}
					resizeMode="cover"
					shouldPlay
					isLooping
					style={Styles.video} />

				<View style={Styles.imageContainer}>
					<Image
						source={require('../../assets/icon.png')}
						style={Styles.image} />
				</View>

				<View style={Styles.buttonContainer}>
					<Button
						onPress={() => this._onNavigate()}
						raised
						title='GET STARTED'
						titleStyle={{ color: this.props.theme.fontTitleColor, fontWeight: 'bold' }}
						containerStyle={{ marginVertical: 10, marginHorizontal: 20 }}
						buttonStyle={{ backgroundColor: this.props.theme.primaryColor, borderRadius: 10 }} />
				</View>
			</View>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(WelcomeScreen);