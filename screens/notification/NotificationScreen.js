import React from "react";
import {
	ScrollView,
	View,
	Text,
	RefreshControl
} from "react-native";
import {
	ListItem,
	Icon,
	Avatar
} from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';

import LottieView from 'lottie-react-native';

import { fetchNotifications } from './NotificationActions';

import Styles from "./Styles";

const mapStateToProps = (state, ownProps) => ({
	// ... computed data from state and optionally ownProps
	theme: state.theme,
	userInfo: state.user.info,
	notifications: state.notification
});

const mapDispatchToProps = {
	// ... normally is an object full of action creators
	fetchNotifications
};

class NotificationScreen extends React.Component {
	static navigationOptions = {
		tabBarIcon: (
			<Icon
				type='material'
				name='notifications-active'
				size={30}
				color='#71cddc' />
		)
	};

	state = {
		refreshing: false,
		loaders: [
			require('../../assets/loading1.json'),
			require('../../assets/loading2.json'),
			require('../../assets/loading3.json'),
			require('../../assets/loading4.json'),
			require('../../assets/loading5.json')
		]
	};

	componentDidMount = async () => {
		const userId = this.props.userInfo.id;
		await this.props.fetchNotifications(userId);
	};

	_onRefresh = async () => {
		this.setState({ refreshing: true });

		const userId = this.props.userInfo.id;
		await this.props.fetchNotifications(userId);

		this.setState({ refreshing: false });
	};

	render() {
		const {
			data,
			isFetched,
			error
		} = this.props.notifications;

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
				<View style={Styles.bodyContainer}>
					<View>
						{
							data.length > 1 ? data.map((notification, i) => (
								<ListItem
									onPress={() => this.props.navigation.navigate('ViewHobee', { hobeeId: notification.eventId })}
									key={i}
									roundAvatar
									leftAvatar={<Avatar
										rounded
										source={{ uri: notification.avatar }}
										size={50} />}
									title={notification.title}
									subtitle={notification.body}
									rightAvatar={null}
									rightTitle={moment(data.hobeeDate).format('ddd DD-MMM-YYYY')}
									rightSubtitle={moment(data.hobeeDate).format('hh:mm A')}
									titleStyle={{ color: this.props.theme.fontTitleColor, fontSize: 19 }}
									subtitleStyle={{ color: this.props.theme.fontColor }}
									rightTitleStyle={{ color: this.props.theme.fontTitleColor }}
									rightSubtitleStyle={{ color: this.props.theme.fontColor }}
									containerStyle={{ backgroundColor: this.props.theme.bgTop, borderRadius: 10, marginVertical: 5 }} />
							)) : <View style={{ alignItems: 'center', marginTop: 20 }}>
									<Text style={{
										color: this.props.theme.fontTitleColor,
										fontWeight: 'bold',
										fontSize: 13,
										backgroundColor: this.props.theme.bgBottom
									}}>Opps! No Notifications Yet</Text>
								</View>
						}
					</View>

				</View>
			</ScrollView>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NotificationScreen);
