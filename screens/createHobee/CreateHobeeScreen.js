import React from "react";
import {
	View,
	Picker,
	ScrollView,
	Alert,
	DatePickerAndroid,
	DatePickerIOS,
	Platform,
	RefreshControl
} from "react-native";
import {
	Button,
	Card,
	Input,
	Icon,
	Avatar,
	ListItem
} from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import Axios from "axios";
import { RNS3 } from 'react-native-aws3';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';

import LottieView from 'lottie-react-native';

import { HobeePermissions } from '../../constants/Permissions';
import Config from '../../constants/Config';
import { createHobee } from './CreateHobeeActions';

import Styles from "./Styles";

const permissions = new HobeePermissions();

const mapStateToProps = (state, ownProps) => ({
	// ... computed data from state and optionally ownProps
	theme: state.theme,
	userInfo: state.user.info,
	hobee: state.createHobee,
	settings: state.settings
});

const mapDispatchToProps = {
	// ... normally is an object full of action creators
	createHobee
};

class CreateHobeeScreen extends React.Component {
	state = {
		refreshing: false,
		loaders: [
			require('../../assets/loading1.json'),
			require('../../assets/loading2.json'),
			require('../../assets/loading3.json'),
			require('../../assets/loading4.json'),
			require('../../assets/loading5.json')
		],
		images: [
			require('../../assets/icon.png')
		],
		uploading: false,
		searching: false,
		selectedImage: 0,
		query: '',
		placeId: '',
		locations: [],

		//Hobee data
		location: {
			address: '',
			latitude: '',
			longitude: ''
		},
		avatar: '',
		title: '',
		description: '',
		notes: '',
		date: new Date(),
		category: 'Fitness & Sports',
		attendance: 'Going'
	};

	componentDidMount = async () => {
		await permissions.getCameraPermission();
	};

	_googleSearchPlace = async (query) => {
		this.setState({ searching: true });
		const result = await Axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${Config.G_MAPS_API}&input=${query}`);


		console.log('=================================================');
		console.log(result);

		this.setState({
			locations: result.data.predictions,
			searching: false
		});
	};

	_createHobee = async () => {
		this.setState({ uploading: true });
		// Get location details
		const result = await Axios.get(`https://maps.googleapis.com/maps/api/place/details/json?key=${Config.G_MAPS_API}&placeid=${this.state.placeId}&fields=formatted_address,geometry`);

		this.setState({
			location: {
				address: result.data.result.formatted_address,
				latitude: result.data.result.geometry.location.lat,
				longitude: result.data.result.geometry.location.lng
			}
		});

		if (this.state.title.length < 6) {
			this.setState({ uploading: false });
			throw Alert.alert('We need a longer title for your Hobee!');
		}

		if (this.state.description.length < 50) {
			this.setState({ uploading: false });
			throw Alert.alert('Your description must be atleast 50 characters!');
		}

		if (this.state.location.address === null || this.state.location.latitude === null || this.state.location.longitude === null) {
			this.setState({ uploading: false });
			throw Alert.alert('Select a Hobee location!');
		}

		if (this.state.category === '') {
			this.setState({ uploading: false });
			throw Alert.alert('Please choose a category!');
		}

		if (this.state.date === null) {
			this.setState({ uploading: false });
			throw Alert.alert('Please choose a date for your Hobee!');
		}

		// // Upload Image to S3
		// let file = {
		// 	uri: this.state.images[this.state.selectedImage],
		// 	name: Date.now().toString() + '.png',
		// 	type: 'image/png'
		// };

		// let options = {
		// 	keyPrefix: 'images/',
		// 	bucket: 'huddle-application',
		// 	region: 'us-east-1',
		// 	accessKey: Config.AWS_ACCESS_KEY,
		// 	secretKey: Config.AWS_SECRET_KEY,
		// 	successActionStatus: 201
		// };

		// await RNS3.put(file, options)
		// 	.then(response => {
		// 		if (response.status !== 201) {
		// 			this.setState({ uploading: false });
		// 			throw Alert.alert("Failed to upload your image, Try again!");
		// 		}

		// 		this.setState({ avatar: response.body.postResponse.location });
		// 	});

		// Send Hobee Data to server
		const userId = this.props.userInfo.id;

		const hobeeData = {
			title: this.state.title,
			description: this.state.description,
			notes: this.state.notes,
			hobeeLocation: this.state.location,
			hobeeCategory: this.state.category,
			hobeeDate: this.state.date,
			author: this.props.settings.settings.fullName || this.props.userInfo.name,
			authorId: userId,
			authorAvatar: this.props.settings.settings.avatar || this.props.userInfo.avatar,
			image: this.state.avatar
		};

		await this.props.createHobee(userId, hobeeData);
		this.setState({ uploading: false });
		this.props.navigation.goBack();
	};

	_addImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
			base64: true
		});

		// Image Base64
		const base64 = `data:image/png;base64,${result.base64}`;

		if (!result.cancelled) {
			this.state.images.push({ uri: base64 });
			this.setState({
				avatar: base64,
				selectedImage: this.state.images.length - 1
			});
		}
	};

	_onRefresh = async () => {
		this.setState({ refreshing: true });

		await permissions.getCameraPermission();

		this.setState({ refreshing: false });
	};

	render() {
		const { hobee } = this.props;

		if (hobee.isLoading || this.state.uploading) {
			return (
				<ScrollView style={{
					backgroundColor: this.props.theme.bgBottom, ...Styles.root
				}} refreshControl={
					<RefreshControl
						refreshing={this.state.refreshing}
						onRefresh={this._onRefresh}
						tintColor={this.props.theme.primaryColor} />
				}>
					<LottieView
						loop
						autoPlay
						style={{ height: '100%', width: '100%', backgroundColor: this.props.theme.bgBottom }}
						source={this.state.loaders[Math.floor(Math.random() * this.state.loaders.length)]} />
				</ScrollView>
			);
		}

		if (hobee.error.on)
			Alert.alert(hobee.error.message);

		const images = this.state.images.map((image, i) => (
			<View style={{ marginHorizontal: 5 }} key={i}>
				<Avatar
					onPress={() => this.setState({ selectedImage: i })}
					source={image}
					size={100} />
			</View>
		));

		return (
			<ScrollView style={{
				backgroundColor: this.props.theme.bgBottom, ...Styles.root
			}} refreshControl={
				<RefreshControl
					refreshing={this.state.refreshing}
					onRefresh={this._onRefresh} tintColor={this.props.theme.primaryColor}
				/>
			}>
				<View style={Styles.item}>
					<Card
						title='Hobee Details'
						titleStyle={{
							color: this.props.theme.fontTitleColor, ...Styles.cardTitle
						}}
						wrapperStyle={{
							backgroundColor: this.props.theme.bgTop, ...Styles.cardWrapper
						}}
						containerStyle={Styles.card}>
						<View style={Styles.item}>
							<Input
								placeholder='Hobee Title'
								placeholderTextColor={this.props.theme.fontTitleColor}
								leftIcon={{ type: 'material', name: 'title', color: this.props.theme.fontTitleColor }}
								leftIconContainerStyle={{ marginEnd: 15 }}
								value={this.state.title}
								onChangeText={(title) => this.setState({ title })}
								inputStyle={{ color: this.props.theme.fontColor }}
								style={{
									color: this.props.theme.primaryColor, ...Styles.titleStyle
								}} />
						</View>

						<View style={Styles.item}>
							<Input
								placeholder='Hobee Description'
								placeholderTextColor={this.props.theme.fontTitleColor}
								leftIcon={{ type: 'material', name: 'description', color: this.props.theme.fontTitleColor }}
								leftIconContainerStyle={{ marginEnd: 15 }}
								value={this.state.description}
								onChangeText={(description) => this.setState({ description })}
								inputStyle={{ color: this.props.theme.fontColor }}
								style={{
									color: this.props.theme.primaryColor, ...Styles.descriptionStyle
								}}
								editable={true}
								multiline={true} />
						</View>

						<View style={Styles.item}>
							<Input
								placeholder='Any notes you want to write?'
								placeholderTextColor={this.props.theme.fontTitleColor}
								leftIcon={{ type: 'material', name: 'note', color: this.props.theme.fontTitleColor }}
								leftIconContainerStyle={{ marginEnd: 15 }}
								value={this.state.notes}
								onChangeText={(notes) => this.setState({ notes })}
								inputStyle={{ color: this.props.theme.fontColor }}
								style={{
									color: this.props.theme.primaryColor, ...Styles.notesStyle
								}}
								editable={true}
								multiline={true} />
						</View>
					</Card>
				</View>

				<View style={Styles.item}>
					<Card
						title='Hobee Location'
						titleStyle={{
							color: this.props.theme.fontTitleColor, ...Styles.cardTitle
						}}
						wrapperStyle={{
							backgroundColor: this.props.theme.bgTop, ...Styles.cardWrapper
						}}
						containerStyle={Styles.card}>
						<View style={Styles.item}>
							<Input
								onEndEditing={() => this._googleSearchPlace(this.state.query)}
								onChangeText={(query) => this.setState({ query })}
								autoCorrect={false}
								returnKeyType='google'
								placeholder='Search for a Location...'
								placeholderTextColor={this.props.theme.fontTitleColor}
								leftIcon={{ type: 'material', name: 'search', color: this.props.theme.fontTitleColor }}
								leftIconContainerStyle={{ marginEnd: 15 }}
								value={this.state.query}
								inputStyle={{ color: this.props.theme.fontColor }}
								style={{
									color: this.props.theme.primaryColor, ...Styles.titleStyle
								}} />
							{this.state.locations.map((place, i) => (
								<ListItem
									onPress={() => {
										this.setState({
											query: place.description,
											placeId: place.place_id,
											locations: []
										});
									}}
									key={i}
									title={place.description}
									titleStyle={{ color: this.props.theme.fontTitleColor, fontSize: 15 }}
									containerStyle={{ backgroundColor: this.props.theme.bgTop }} />
							))}
							{this.state.searching ? <LottieView
								loop
								autoPlay
								style={{ alignSelf: 'center', height: 50, width: 50, backgroundColor: this.props.theme.bgTop }}
								source={this.state.loaders[Math.floor(Math.random() * this.state.loaders.length)]} /> : <View />}
						</View>
					</Card>
				</View>

				<View style={Styles.item}>
					<Card
						title='Hobee Category'
						titleStyle={{
							color: this.props.theme.fontTitleColor, ...Styles.cardTitle
						}}
						wrapperStyle={{
							backgroundColor: this.props.theme.bgTop, ...Styles.cardWrapper
						}}
						containerStyle={Styles.card}>
						<Picker
							selectedValue={this.state.category}
							onValueChange={(itemValue, itemIndex) => {
								this.setState({ category: itemValue });
							}}
							style={{ color: this.props.theme.fontTitleColor }}
							itemStyle={{ color: this.props.theme.fontTitleColor }}>
							<Picker.Item label="Fitness & Sports" value="Fitness & Sports" />
							<Picker.Item label="Education / Learning / Vocation" value="Education / Learning / Vocation" />
							<Picker.Item label="Outdoor & Adventure" value="Outdoor & Adventure" />
							<Picker.Item label="Film & Photography" value="Film & Photography" />
							<Picker.Item label="Music" value="Music" />
							<Picker.Item label="Games" value="Games" />
							<Picker.Item label="Arts" value="Arts" />
							<Picker.Item label="Pets" value="Pets" />
							<Picker.Item label="Social" value="Social" />
						</Picker>
					</Card>
				</View>

				<View style={Styles.item}>
					<Card
						title='Hobee Image'
						titleStyle={{
							color: this.props.theme.fontTitleColor, ...Styles.cardTitle
						}}
						wrapperStyle={{
							backgroundColor: this.props.theme.bgTop, ...Styles.cardWrapper
						}}
						containerStyle={Styles.card}>
						<View style={Styles.imagesContainer}>
							<Avatar
								style={{ width: '100%', height: 300 }}
								source={this.state.images[this.state.selectedImage]} />
							<ScrollView horizontal indicatorStyle='white'>
								<View style={Styles.images}>
									<Icon
										onPress={() => this._addImage()}
										type='material'
										name='add'
										size={50}
										underlayColor={this.props.theme.bgTop}
										color={this.props.theme.iconColor} />
									{images}
								</View>
							</ScrollView>
						</View>
					</Card>
				</View>

				<View style={Styles.item}>
					<Card
						title='Hobee Date'
						titleStyle={{
							color: this.props.theme.fontTitleColor, ...Styles.cardTitle
						}}
						wrapperStyle={{
							backgroundColor: this.props.theme.bgTop, ...Styles.cardWrapper
						}}
						containerStyle={Styles.card}>
						<DatePicker
							onDateChange={(date) => { this.setState({ date: moment(date, 'YYYY-MM-DD HH:mm A') }) }}
							style={{ width: '100%' }}
							customStyles={{
								dateText: {
									fontSize: 20,
									color: this.props.theme.fontTitleColor
								},
								dateInput: {
									borderWidth: 0,
									borderRadius: 10
								}
							}}
							date={this.state.date}
							mode='datetime'
							showIcon={false}
							placeholder='Choose a Hobee Date/Time'
							format='YYYY-MM-DD HH:mm A'
							confirmBtnText='Confirm'
							cancelBtnText='Cancel' />
					</Card>
				</View>

				<View style={Styles.item}>
					<Button
						onPress={() => this._createHobee()}
						raised
						title='CREATE HOBEE'
						titleStyle={{ color: this.props.theme.fontTitleColor, fontWeight: 'bold' }}
						containerStyle={{ marginVertical: 10, marginHorizontal: 20 }}
						buttonStyle={{ backgroundColor: this.props.theme.primaryColor, borderRadius: 10 }} />
				</View>
			</ScrollView>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateHobeeScreen);
