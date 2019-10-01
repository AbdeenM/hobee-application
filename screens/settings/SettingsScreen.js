import React from "react";
import {
	Switch,
	Text,
	View,
	ScrollView,
	AsyncStorage,
	Alert,
	RefreshControl
} from "react-native";
import {
	Button,
	Card,
	ListItem,
	Icon,
	Avatar
} from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';

import LottieView from 'lottie-react-native';

import {
	updateMySettings,
	fetchMySettings
} from './SettingsActions';
import { switchTheme } from '../../constants/theme/ThemeActions';

import Styles from "./Styles";

const mapStateToProps = (state, ownProps) => ({
	// ... computed data from state and optionally ownProps
	theme: state.theme,
	userInfo: state.user.info,
	settings: state.settings
});

const mapDispatchToProps = {
	// ... normally is an object full of action creators
	switchTheme,
	fetchMySettings,
	updateMySettings
};

class SettingsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			refreshing: false,
			loaders: [
				require('../../assets/loading1.json'),
				require('../../assets/loading2.json'),
				require('../../assets/loading3.json'),
				require('../../assets/loading4.json'),
				require('../../assets/loading5.json')
			],
			notifications: null,
		};
		this.onNotificationsSwitch = this.onNotificationsSwitch.bind(this);
	};

	componentWillMount = async () => {
		const userId = this.props.userInfo.id;
		await this.props.fetchMySettings(userId);

		this.setState({
			notifications: this.props.settings.settings.notifications,
		});
	};

	onThemeSwitch = async () => {
		await this.props.switchTheme(this.props.theme.currentTheme);
	}

	onNotificationsSwitch(value) {
		this.setState({ notifications: value });
	}

	_onSave = async () => {
		const userId = this.props.settings.settings._id;
		await this.props.updateMySettings(userId, {
			notifications: this.state.notifications,
		});
		Alert.alert('Yay! Your settings are saved');
	};

	_signOutAsync = async () => {
		await AsyncStorage.clear();
		this.props.navigation.navigate('Welcome');
	};

	_onRefresh = async () => {
		this.setState({ refreshing: true });

		const userId = this.props.userInfo.id;
		await this.props.fetchMySettings(userId);

		this.setState({
			notifications: this.props.settings.settings.notifications,
			refreshing: false
		});
	};

	render() {
		const {
			settings,
			isFetched,
			error
		} = this.props.settings;

		if (!isFetched) {
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
		}

		const joinedDate = new Date(settings.createdAt);

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
				<Card
					title='My Profile'
					titleStyle={{
						color: this.props.theme.fontTitleColor, ...Styles.cardTitle
					}}
					wrapperStyle={{
						backgroundColor: this.props.theme.bgTop, ...Styles.cardWrapper
					}}
					containerStyle={Styles.card}>
					<View style={Styles.myProfileContainer}>
						<View style={{ alignItems: 'center' }}>
							{settings.avatar ? <Avatar
								rounded
								size={200}
								source={{ uri: settings.avatar }} /> : <Avatar
									rounded
									icon={{ type: 'material-community', name: 'account' }}
									size={200} />}
						</View>

						<ListItem
							title='Username:'
							titleStyle={{ color: this.props.theme.fontTitleColor, fontSize: 20 }}
							subtitle={settings.fullName}
							subtitleStyle={{ color: this.props.theme.primaryColor, fontWeight: 'bold', fontSize: 17 }}
							wrapperStyle={{ backgroundColor: this.props.theme.bgTop }}
							containerStyle={{ backgroundColor: this.props.theme.bgTop }} />

						<ListItem
							title='Email:'
							titleStyle={{ color: this.props.theme.fontTitleColor, fontSize: 20 }}
							subtitle={settings.email}
							subtitleStyle={{ color: this.props.theme.primaryColor, fontWeight: 'bold', fontSize: 17 }}
							wrapperStyle={{ backgroundColor: this.props.theme.bgTop }}
							containerStyle={{ backgroundColor: this.props.theme.bgTop }} />

						<ListItem
							title='Age:'
							titleStyle={{ color: this.props.theme.fontTitleColor, fontSize: 20 }}
							subtitle={settings.age || 'N/A'}
							subtitleStyle={{ color: this.props.theme.primaryColor, fontWeight: 'bold', fontSize: 17 }}
							wrapperStyle={{ backgroundColor: this.props.theme.bgTop }}
							containerStyle={{ backgroundColor: this.props.theme.bgTop }} />

						<ListItem
							title='Address:'
							titleStyle={{ color: this.props.theme.fontTitleColor, fontSize: 20 }}
							subtitle={settings.address || 'N/A'}
							subtitleStyle={{ color: this.props.theme.primaryColor, fontWeight: 'bold', fontSize: 17 }}
							wrapperStyle={{ backgroundColor: this.props.theme.bgTop }}
							containerStyle={{ backgroundColor: this.props.theme.bgTop }} />

						<View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
							<View style={{ alignItems: 'center' }}>
								<Text style={{ color: this.props.theme.fontTitleColor, fontSize: 20 }}>Posted Hobees:</Text>
								<Text style={{ color: this.props.theme.primaryColor, fontWeight: 'bold', fontSize: 17 }}>{settings.postedHobees.length}</Text>
							</View>

							<View style={{ alignItems: 'center' }}>
								<Text style={{ color: this.props.theme.fontTitleColor, fontSize: 20 }}>Joined Hobees:</Text>
								<Text style={{ color: this.props.theme.primaryColor, fontWeight: 'bold', fontSize: 17 }}>{settings.joinedHobees.length}</Text>
							</View>
						</View>
					</View>
				</Card>

				<Button
					onPress={() => this.props.navigation.navigate('Profile')}
					raised
					title='EDIT PROFILE'
					titleStyle={{ color: this.props.theme.fontTitleColor, fontWeight: 'bold' }}
					containerStyle={{ marginVertical: 10, marginHorizontal: 20 }}
					buttonStyle={{
						backgroundColor: this.props.theme.primaryColor, ...Styles.buttonSave
					}} />

				<Card
					title='My Settings'
					titleStyle={{
						color: this.props.theme.fontTitleColor, ...Styles.cardTitle
					}}
					wrapperStyle={{
						backgroundColor: this.props.theme.bgTop, ...Styles.cardWrapper
					}}
					containerStyle={Styles.card}>
					<ListItem
						title='Categories'
						titleStyle={{ color: this.props.theme.fontTitleColor }}
						wrapperStyle={{ backgroundColor: this.props.theme.bgTop }}
						containerStyle={{ backgroundColor: this.props.theme.bgTop }}
						onPress={() => this.props.navigation.navigate('Categorys')} />
					<ListItem
						title='Recieve Notifications'
						titleStyle={{ color: this.props.theme.fontTitleColor }}
						wrapperStyle={{ backgroundColor: this.props.theme.bgTop }}
						containerStyle={{ backgroundColor: this.props.theme.bgTop }}
						rightIcon={
							<Switch
								value={this.state.notifications}
								onValueChange={this.onNotificationsSwitch}
								trackColor={{ true: this.props.theme.primaryColor }} />
						} />
					<ListItem
						title='Dark Theme'
						titleStyle={{ color: this.props.theme.fontTitleColor }}
						wrapperStyle={{ backgroundColor: this.props.theme.bgTop }}
						containerStyle={{ backgroundColor: this.props.theme.bgTop, borderRadius: 10 }}
						switch={{
							onValueChange: () => this.onThemeSwitch(),
							trackColor: { true: this.props.theme.primaryColor },
							value: this.props.theme.currentTheme === 'darkTheme' ? true : false
						}} />
				</Card>

				<Button
					onPress={() => this._onSave()}
					title='SAVE'
					raised
					titleStyle={{ color: this.props.theme.fontTitleColor, fontWeight: 'bold' }}
					buttonStyle={{
						backgroundColor: this.props.theme.primaryColor, ...Styles.buttonSave
					}}
					containerStyle={{ marginVertical: 10, marginHorizontal: 20 }} />

				<View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-around' }}>
					<Text style={{
						color: this.props.theme.fontTitleColor, ...Styles.joinedHobee
					}}>
						Join: <Text style={Styles.keyWords}>{moment(joinedDate).format("DD/MM/YYYY")}</Text>
					</Text>
					<Text style={{
						color: this.props.theme.fontTitleColor, ...Styles.joinedHobee
					}}>
						Through: <Text style={{
							color: this.props.theme.primaryColor, ...Styles.keyWords
						}}>{settings.providerData.provider}</Text>
					</Text>
				</View>

				<Button
					onPress={() => this._signOutAsync()}
					raised
					title='LOG OUT'
					titleStyle={{ color: this.props.theme.fontTitleColor, fontWeight: 'bold' }}
					buttonStyle={{
						backgroundColor: this.props.theme.errorColor, ...Styles.buttonLogout
					}}
					containerStyle={{ marginTop: 30, marginVertical: 10, marginHorizontal: 20 }} />
			</ScrollView >
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsScreen);
