import React from 'react';
import {
	View,
	Alert,
	ScrollView,
	KeyboardAvoidingView,
	RefreshControl
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
	Button,
	Avatar,
	Input
} from 'react-native-elements';
import { connect } from 'react-redux';
import { RNS3 } from 'react-native-aws3';

import LottieView from 'lottie-react-native';

import Config from '../../../constants/Config';
import { HobeePermissions } from '../../../constants/Permissions';
import {
	updateMyProfile,
	fetchMyProfile
} from './ProfileActions';

import Styles from './Styles';

const permissions = new HobeePermissions();

const mapStateToProps = (state, ownProps) => ({
	// ... computed data from state and optionally ownProps
	theme: state.theme,
	userInfo: state.user.info,
	myProfile: state.profile

});

const mapDispatchToProps = {
	// ... normally is an object full of action creators
	fetchMyProfile,
	updateMyProfile
};

class ProfileScreen extends React.Component {
	state = {
		refreshing: false,
		loaders: [
			require('../../../assets/loading1.json'),
			require('../../../assets/loading2.json'),
			require('../../../assets/loading3.json'),
			require('../../../assets/loading4.json'),
			require('../../../assets/loading5.json')
		],
		uploading: false,
		avatar: null,
		fullName: null,
		email: null,
		age: null,
		address: null
	};

	componentWillMount = async () => {
		await permissions.getCameraPermission();

		const userId = this.props.userInfo.id;
		await this.props.fetchMyProfile(userId);

		this.setState({
			avatar: this.props.myProfile.profile.avatar,
			fullName: this.props.myProfile.profile.fullName,
			email: this.props.myProfile.profile.email,
			age: this.props.myProfile.profile.age,
			address: this.props.myProfile.profile.address
		});
	}

	_onCheckValues = () => {
		if (this.state.avatar === null)
			this.setState({ avatar: this.props.myProfile.profile.avatar });

		if (this.state.fullName === null)
			this.setState({ fullName: this.props.myProfile.profile.fullName });

		if (this.state.email === null)
			this.setState({ email: this.props.myProfile.profile.email });

		if (this.state.age === null)
			this.setState({ age: this.props.myProfile.profile.age });

		if (this.state.address === null)
			this.setState({ address: this.props.myProfile.profile.address });

		this._onContinue();
	};

	_changeProfilePicture = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3]
		});

		if (!result.cancelled) {
			this.setState({ avatar: result.uri });
		}
	};

	_onContinue = async () => {
		let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

		const userId = this.props.userInfo.id;

		if (this.state.fullName === null)
			throw Alert.alert('The name must be atleast 6 characters');

		if (pattern.test(String(this.state.email).toLowerCase()) === false)
			throw Alert.alert('Enter a valid email');

		if (!this.state.avatar === null || this.state.avatar === this.props.myProfile.profile.avatar) {
			// Upload Image to S3
			let file = {
				uri: this.state.avatar,
				name: Date.now().toString() + '.png',
				type: 'image/png'
			};

			let options = {
				keyPrefix: 'images/',
				bucket: 'hobee-application',
				region: 'us-east-1',
				accessKey: Config.AWS_ACCESS_KEY,
				secretKey: Config.AWS_SECRET_KEY,
				successActionStatus: 201
			};

			this.setState({ uploading: true });
			await RNS3.put(file, options)
				.then(response => {
					if (response.status !== 201) {
						this.setState({ uploading: false })
						throw Alert.alert("Failed to upload your image");
					}

					this.setState({
						uploading: false,
						avatar: response.body.postResponse.location
					});
				});
		};

		const userProfile = {
			avatar: this.state.avatar,
			fullName: this.state.fullName,
			email: this.state.email,
			age: this.state.age,
			address: this.state.address
		};

		await this.props.updateMyProfile(userId, userProfile);
		Alert.alert('Yay! Your profile is saved');
	};

	_onRefresh = async () => {
		this.setState({ refreshing: true });

		await permissions.getCameraPermission();

		const userId = this.props.userInfo.id;
		await this.props.fetchMyProfile(userId);

		this.setState({
			avatar: this.props.myProfile.profile.avatar,
			fullName: this.props.myProfile.profile.fullName,
			email: this.props.myProfile.profile.email,
			age: this.props.myProfile.profile.age,
			address: this.props.myProfile.profile.address,
			refreshing: false
		});
	};

	render() {
		const {
			isFetched,
			error
		} = this.props.myProfile;

		if (!isFetched || this.state.uploading) {
			return (
				<ScrollView style={{
					backgroundColor: this.props.theme.bgBottom, ...Styles.root
				}} refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh}
						tintColor={this.props.theme.primaryColor}
					/>
				}>
					<LottieView
						loop
						autoPlay
						style={{ height: '100%', width: '100%', backgroundColor: this.props.theme.bgBottom }}
						source={this.state.loaders[Math.floor(Math.random() * this.state.loaders.length)]} />
				</ScrollView>
			);
		};

		return (
			<ScrollView style={{
				backgroundColor: this.props.theme.bgBottom, ...Styles.root
			}} refreshControl={
				<RefreshControl
					refreshing={this.state.refreshing}
					onRefresh={this._onRefresh}
					tintColor={this.props.theme.primaryColor}
				/>
			}>
				<KeyboardAvoidingView keyboardVerticalOffset={30} behavior='position'>
					<View style={{ alignItems: 'center', marginVertical: 10 }}>
						{this.state.avatar ? <Avatar
							onEditPress={() => this._changeProfilePicture()}
							rounded
							size={200}
							source={{ uri: this.state.avatar }}
							showEditButton={true} /> : <Avatar
								onEditPress={() => this._changeProfilePicture()}
								rounded
								size={200}
								icon={{ type: 'material-community', name: 'account' }}
								showEditButton={true} />}
					</View>

					<View style={Styles.item}>
						<Input
							onChangeText={(text) => this.setState({ fullName: text })}
							autoCorrect={false}
							autoCapitalize='none'
							placeholder='Username'
							placeholderTextColor={this.props.theme.fontTitleColor}
							leftIcon={{ type: 'material-community', name: 'account', color: this.props.theme.fontTitleColor }}
							leftIconContainerStyle={{ marginEnd: 15 }}
							value={this.state.fullName}
							inputStyle={{ color: this.props.theme.fontColor }} />
					</View>

					<View style={Styles.item}>
						<Input
							onChangeText={(text) => this.setState({ email: text })}
							autoCorrect={false}
							autoCapitalize='none'
							placeholder='Email'
							placeholderTextColor={this.props.theme.fontTitleColor}
							leftIcon={{ type: 'entypo', name: 'email', color: this.props.theme.fontTitleColor }}
							leftIconContainerStyle={{ marginEnd: 15 }}
							value={this.state.email}
							inputStyle={{ color: this.props.theme.fontColor }} />
					</View>

					<View style={Styles.item}>
						<Input
							onChangeText={(text) => this.setState({ age: text })}
							placeholder='Age'
							placeholderTextColor={this.props.theme.fontTitleColor}
							leftIcon={{ type: 'material', name: 'access-time', color: this.props.theme.fontTitleColor }}
							leftIconContainerStyle={{ marginEnd: 15 }}
							keyboardType='numeric'
							value={this.state.age}
							inputStyle={{ color: this.props.theme.fontColor }} />
					</View>

					<View style={Styles.item}>
						<Input
							onChangeText={(text) => this.setState({ address: text })}
							autoCorrect={false}
							autoCapitalize='none'
							placeholder='Address'
							placeholderTextColor={this.props.theme.fontTitleColor}
							leftIcon={{ type: 'font-awesome', name: 'home', color: this.props.theme.fontTitleColor }}
							leftIconContainerStyle={{ marginEnd: 15 }}
							value={this.state.address}
							inputStyle={{ color: this.props.theme.fontColor }} />
					</View>

					<Button
						onPress={() => this._onCheckValues()}
						raised
						title='SAVE'
						titleStyle={{ color: this.props.theme.fontTitleColor, fontWeight: 'bold' }}
						containerStyle={{ marginVertical: 10, marginHorizontal: 20 }}
						buttonStyle={{ backgroundColor: this.props.theme.primaryColor, borderRadius: 10 }} />
				</KeyboardAvoidingView>
			</ScrollView>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProfileScreen);
