import React from "react";
import {
	Image,
	Text,
	View,
	ScrollView,
	RefreshControl
} from "react-native";
import {
	Card,
	Button,
	Icon,
	Avatar
} from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';
import { Agenda } from 'react-native-calendars';

import LottieView from 'lottie-react-native';

import { fetchUserHobees } from './HomeActions';

import Styles from './Styles';

const mapStateToProps = (state, ownProps) => ({
	// ... computed data from state and optionally ownProps
	theme: state.theme,
	userInfo: state.user.info,
	userHobees: state.home.userHobees
});

const mapDispatchToProps = {
	// ... normally is an object full of action creators
	fetchUserHobees
};

class HomeScreen extends React.Component {
	static navigationOptions = {
		tabBarIcon: (
			<Icon
				type='material'
				name='home'
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
		],
		items: {}
	};

	componentDidMount = async () => {
		const userId = this.props.userInfo.id;
		await this.props.fetchUserHobees(userId);
	};

	_checkAttendance(hobee) {
		const userId = this.props.userInfo.id;

		if (hobee.goingUsers.includes(userId)) {
			return 'Going';
		} else if (hobee.maybeUsers.includes(userId)) {
			return 'Maybe';
		} else {
			return 'Not Going';
		}
	};

	_checkAttendanceColor(hobee) {
		const userId = this.props.userInfo.id;

		if (hobee.goingUsers.includes(userId)) {
			return this.props.theme.going;
		} else if (hobee.maybeUsers.includes(userId)) {
			return this.props.theme.maybe;
		} else {
			return 'red'
		}
	};

	rowHasChanged(r1, r2) {
		return r1.name !== r2.name;
	};

	_onRefresh = async () => {
		this.setState({ refreshing: true });

		const userId = this.props.userInfo.id;
		await this.props.fetchUserHobees(userId);

		this.setState({ refreshing: false });
	};

	render() {
		const {
			data,
			isFetched,
			error
		} = this.props.userHobees;

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

		// Reset items of the calendar
		this.state.items = {};

		for (var i = 0; i < data.postedHobees.length; i++) {
			const date = moment(data.postedHobees[i].hobeeDate).format("YYYY-MM-DD");
			const time = moment(data.postedHobees[i].hobeeDate).format("HH:mm");

			if (!this.state.items[date]) {
				this.state.items[date] = [];
				this.state.items[date].push({
					time,
					title: data.postedHobees[i].title,
					hobeeCategory: data.postedHobees[i].hobeeCategory,
					description: data.postedHobees[i].description,
					attendance: this._checkAttendance(data.postedHobees[i]),
					notes: data.postedHobees[i].notes,
					color: this._checkAttendanceColor(data.postedHobees[i])
				});
			} else {
				this.state.items[date].push({
					time,
					title: data.postedHobees[i].title,
					hobeeCategory: data.postedHobees[i].hobeeCategory,
					description: data.postedHobees[i].description,
					attendance: this._checkAttendance(data.postedHobees[i]),
					notes: data.postedHobees[i].notes,
					color: this._checkAttendanceColor(data.postedHobees[i])
				});
			}
		}

		for (var i = 0; i < data.joinedHobees.length; i++) {
			const date = moment(data.joinedHobees[i].hobeeDate).format("YYYY-MM-DD");
			const time = moment(data.joinedHobees[i].hobeeDate).format("HH:mm");

			if (!this.state.items[date]) {
				this.state.items[date] = [];
				this.state.items[date].push({
					time,
					title: data.joinedHobees[i].title,
					hobeeCategory: data.joinedHobees[i].hobeeCategory,
					description: data.joinedHobees[i].description,
					attendance: this._checkAttendance(data.joinedHobees[i]),
					notes: data.joinedHobees[i].notes,
					color: this._checkAttendanceColor(data.joinedHobees[i])
				});
			} else {
				this.state.items[date].push({
					time,
					title: data.joinedHobees[i].title,
					hobeeCategory: data.joinedHobees[i].hobeeCategory,
					description: data.joinedHobees[i].description,
					attendance: this._checkAttendance(data.joinedHobees[i]),
					notes: data.joinedHobees[i].notes,
					color: this._checkAttendanceColor(data.joinedHobees[i])
				});
			}
		};

		const myPostedHobees = data.postedHobees.map((hobee, i) => (
			<View style={{ marginEnd: 15 }} key={i}>
				<Avatar
					onPress={() => this.props.navigation.navigate('ViewHobee', { hobeeId: hobee._id })}
					rounded
					size={100}
					source={{ uri: hobee.image }}
					showEditButton={true}
					editButton={{
						size: 30,
						style: { backgroundColor: this._checkAttendanceColor(hobee) },
						Component: () => (<Text style={{
							color: this.props.theme.fontTitleColor, fontSize: 20, fontWeight: 'bold'
						}}>{hobee.hobeeCategory[0]}</Text>)
					}} />
			</View>
		));

		const myJoinedHobees = data.joinedHobees.map((hobee, i) => (
			<View style={{ marginEnd: 15 }} key={i}>
				<Avatar
					onPress={() => this.props.navigation.navigate('ViewHobee', { hobeeId: hobee._id })}
					rounded
					size={100}
					source={{ uri: hobee.image }}
					showEditButton={true}
					editButton={{
						size: 30,
						style: { backgroundColor: this._checkAttendanceColor(hobee) },
						Component: () => (<Text style={{
							color: this.props.theme.fontTitleColor, fontSize: 20, fontWeight: 'bold'
						}}>{hobee.hobeeCategory[0]}</Text>)
					}} />
			</View>
		));

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
					<Card
						title='My Hobees'
						titleStyle={{
							color: this.props.theme.fontTitleColor, ...Styles.cardTitle
						}}
						wrapperStyle={{
							backgroundColor: this.props.theme.bgTop, ...Styles.cardWrapper
						}}
						containerStyle={Styles.card}>
						<View style={Styles.myHobeeContainer}>
							<View style={Styles.userHobeesTitleContatiner}>
								<Text style={{
									color: this.props.theme.fontTitleColor, ...Styles.userHobeesTitle
								}}>Posted</Text>
							</View>
							<ScrollView horizontal indicatorStyle='white'>
								<View style={Styles.hobees}>
									{myPostedHobees.length ? myPostedHobees : <Text style={{
										color: this.props.theme.fontTitleColor, ...Styles.emptyCalendarText
									}}>Oops! No Hobees Posted</Text>}
								</View>
							</ScrollView>
						</View>
						<View style={Styles.myHobeeContainer}>
							<View style={Styles.userHobeesTitleContatiner}>
								<Text style={{
									color: this.props.theme.fontTitleColor, ...Styles.userHobeesTitle
								}}>Joined</Text>
							</View>
							<ScrollView horizontal indicatorStyle='white'>
								<View style={Styles.hobees}>
									{myJoinedHobees.length ? myJoinedHobees : <Text style={{
										color: this.props.theme.fontTitleColor, ...Styles.emptyCalendarText
									}}>Oops! No Hobees Joined</Text>}
								</View>
							</ScrollView>
						</View>
					</Card>

					<Button
						onPress={() => this.props.navigation.navigate('CreateHobee')}
						raised
						title='CREATE HOBEE'
						titleStyle={{ color: this.props.theme.fontTitleColor, fontWeight: 'bold' }}
						containerStyle={{ marginVertical: 10, marginHorizontal: 20 }}
						buttonStyle={{
							backgroundColor: this.props.theme.primaryColor, ...Styles.buttonCreate
						}} />

					<Card
						title='My Schedule'
						titleStyle={{
							color: this.props.theme.fontTitleColor, ...Styles.cardTitle
						}}
						wrapperStyle={{
							backgroundColor: this.props.theme.bgTop, ...Styles.cardCalendarWrapper
						}}
						containerStyle={Styles.card}>
						<Agenda
							items={this.state.items}
							refreshing={true}
							ref
							renderItem={(day, item) => {
								return (
									<View />
								);
							}}
							renderDay={(day, item) => {
								return (
									<Card>
										<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
											<View style={{ flexDirection: 'column', marginVertical: 10 }}>
												<Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold' }}>{item.title}</Text>
											</View>
											<View style={{ flexDirection: 'column', marginVertical: 10 }}>
												<Text style={{ color: 'black', fontSize: 17 }}>{item.time}</Text>
												<Text style={{ color: 'black', fontSize: 17 }}>{item.attendance}</Text>
											</View>
										</View>
										<View style={{ marginVertical: 10 }}>
											<Text style={{ color: 'black', fontSize: 15 }}>{item.description}</Text>
										</View>
										<View style={{ marginVertical: 10 }}>
											<Text style={{ color: 'black', fontSize: 15 }}>Note: {item.notes}</Text>
										</View>
									</Card>
								);
							}}
							rowHasChanged={this.rowHasChanged.bind(this)}

							// Specify what should be rendered instead of ActivityIndicator
							renderEmptyData={() => {
								return (
									<View style={{
										backgroundColor: this.props.theme.bgTop, ...Styles.emptyCalendarContainer
									}}>
										<Image
											style={{ height: 100, width: 100 }}
											source={require('../../assets/icon.png')} />
										<Text style={{
											color: this.props.theme.fontTitleColor, ...Styles.emptyCalendarText
										}}>Oops! No Hobees on this Day...</Text>
									</View>
								);
							}}

							theme={{
								agendaKnobColor: this.props.theme.primaryColor
							}}

							style={{
								backgroundColor: this.props.theme.bgTop,
								justifyContent: 'center',
								alignSelf: 'center',
								alignItems: 'center',
								width: '95%',
								marginBottom: 15,
								borderRadius: 10
							}}
						/>
					</Card>
				</View>
			</ScrollView>
		);
	}
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HomeScreen);
