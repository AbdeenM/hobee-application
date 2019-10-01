import React from "react";
import {
	Image,
	View,
	Text,
	ScrollView,
	RefreshControl
} from "react-native";
import {
	Icon,
	ButtonGroup,
	Avatar
} from "react-native-elements";
import MapView, { Marker } from 'react-native-maps';

import { connect } from 'react-redux';
import moment from 'moment';

import LottieView from 'lottie-react-native';

import {
	fetchHobeeDetails,
	updateHobeeAttendance
} from './ViewHobeeActions';

import Styles from "./Styles";

const mapStateToProps = (state, ownProps) => ({
	// ... computed data from state and optionally ownProps
	theme: state.theme,
	userInfo: state.user.info,
	hobeeDetails: state.hobeeDetails
});

const mapDispatchToProps = {
	// ... normally is an object full of action creators
	fetchHobeeDetails,
	updateHobeeAttendance
};

class ViewHobeeScreen extends React.Component {
	state = {
		loaders: [
			require('../../assets/loading1.json'),
			require('../../assets/loading2.json'),
			require('../../assets/loading3.json'),
			require('../../assets/loading4.json'),
			require('../../assets/loading5.json')
		],
		selectedIndex: 2
	};

	componentDidMount = async () => {
		const hobeeId = await this.props.navigation.getParam('hobeeId');
		const userId = this.props.userInfo.id;
		await this.props.fetchHobeeDetails({ hobeeId, userId });

		this._checkAttendance(this.props.hobeeDetails.data.attendance);
	};

	_checkAttendance(attendance) {
		if (attendance === 'Going') {
			this.setState({
				selectedIndex: 0
			});
		} else if (attendance === 'Maybe') {
			this.setState({
				selectedIndex: 1
			});
		} else if (attendance === 'Not Going') {
			this.setState({
				selectedIndex: 2
			});
		}
	};

	_onUpdateIndex = async (selectedIndex, hobeeId) => {
		this.setState({
			selectedIndex
		});

		let attendance;
		if (selectedIndex === 0) {
			attendance = 'Going';
		} if (selectedIndex === 1) {
			attendance = 'Maybe';
		} else if (selectedIndex === 2) {
			attendance = 'Not Going';
		}

		const userId = this.props.userInfo.id;
		await this.props.updateHobeeAttendance({ userId, hobeeId, attendance });
	};

	_onRefresh = async () => {
		this.setState({ refreshing: true });

		const hobeeId = await this.props.navigation.getParam('hobeeId');
		const userId = this.props.userInfo.id;
		await this.props.fetchHobeeDetails({ hobeeId, userId });

		this._checkAttendance(this.props.hobeeDetails.data.attendance);

		this.setState({ refreshing: false });
	};

	render() {
		const categorys = ['Going', 'Maybe', 'Not Going'];

		const {
			data,
			isFetched,
			error
		} = this.props.hobeeDetails;

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
				<Image
					resizeMode='cover'
					style={Styles.image}
					source={{ uri: data.image }} />

				<View style={Styles.item}>
					<Text style={{
						color: this.props.theme.fontTitleColor, ...Styles.textTitleMain
					}}>{data.title}</Text>
				</View>

				<View style={Styles.item}>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
						<Icon
							type='material'
							name='access-time'
							size={50}
							color={this.props.theme.iconColor} />
						<Text style={{ color: this.props.theme.fontColor, ...Styles.textBody }}>{moment(data.hobeeDate).format('ddd DD-MMM-YYYY, hh:mm A')}</Text>
					</View>
				</View>

				<View style={Styles.item}>
					<Text style={{ color: this.props.theme.fontColor, ...Styles.textBody }}>{data.description}</Text>
				</View >

				<View style={Styles.item}>
					<Text style={{ color: this.props.theme.fontColor, ...Styles.textBody }}>{data.note ? data.note : 'The author did not leave a note'}</Text>
				</View >

				<View style={Styles.item}>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
						<View style={{ alignItems: 'center' }}>
							<Icon
								type='font-awesome'
								name='check'
								size={50}
								color={this.props.theme.iconColor} />
							<Text style={{ color: this.props.theme.fontColor, ...Styles.textBody }}>Going: {data.goingUsers.length}</Text>
						</View>
						<View style={{ alignItems: 'center' }}>
							<Icon
								type='font-awesome'
								name='question'
								size={50}
								color={this.props.theme.iconColor} />
							<Text style={{ color: this.props.theme.fontColor, ...Styles.textBody }}>Maybe: {data.maybeUsers.length}</Text>
						</View>
						<View style={{ alignItems: 'center' }}>
							<Icon
								type='font-awesome'
								name='times'
								size={50}
								color={this.props.theme.iconColor} />
							<Text style={{ color: this.props.theme.fontColor, ...Styles.textBody }}>Not Going: {data.notGoingUsers.length}</Text>
						</View>
					</View>
				</View>

				<View style={Styles.item}>
					<MapView
						style={{ height: 150, marginHorizontal: 15, borderRadius: 10 }}
						showsCompass={false}
						showsScale={false}
						showsBuildings={true}
						showsUserLocation={false}
						showsMyLocationButton={false}
						initialRegion={{
							latitude: parseFloat(data.hobeeLocation.latitude),
							longitude: parseFloat(data.hobeeLocation.longitude),
							latitudeDelta: 0.003,
							longitudeDelta: 0.003
						}}>
						<Marker
							pinColor='black'
							coordinate={{ latitude: parseFloat(data.hobeeLocation.latitude), longitude: parseFloat(data.hobeeLocation.longitude) }}
							title={data.title}
							description={data.description} />
					</MapView>
					<View style={{ alignItems: 'center' }}>
						<Text style={{ color: this.props.theme.fontColor, ...Styles.textBody }}>{data.hobeeLocation.address}</Text>

					</View>
				</View>

				<View style={Styles.item}>
					<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
						<View style={{ alignItems: 'center' }}>
							{
								data.authorAvatar ? <Avatar
									rounded
									source={{ uri: data.authorAvatar }}
									size={50} /> : <Avatar
										rounded
										icon={{ type: 'material-community', name: 'account' }}
										size={50} />
							}
							<Text style={{ color: this.props.theme.fontColor, ...Styles.textBody }}>{data.author}</Text>
						</View>

						{data.authorId === this.props.userInfo.id ? <View /> :
							<Icon
								onPress={() => this.props.navigation.navigate('ChatRoom', {
									friendAvatar: data.authorAvatar,
									friendName: data.author,
									friendId: data.authorId
								})}
								type='material'
								name='chat'
								size={50}
								underlayColor={this.props.theme.bgBottom}
								color={this.props.theme.iconColor} />}
					</View>
				</View>

				<View style={[Styles.item, { marginBottom: 20 }]}>
					<ButtonGroup
						onPress={(index) => this._onUpdateIndex(index, data._id)}
						buttons={categorys}
						selectedIndex={this.state.selectedIndex}
						containerStyle={{
							height: 50,
							backgroundColor: this.props.theme.bgBottom
						}}
						textStyle={{
							fontWeight: 'bold',
							color: this.props.theme.fontColor
						}}
						selectedButtonStyle={{
							backgroundColor: this.props.theme.primaryColor
						}}
						selectedTextStyle={{
							fontWeight: 'bold',
							color: this.props.theme.fontTitleColor
						}}
					/>
				</View >
			</ScrollView >
		)
	}
};


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ViewHobeeScreen);
