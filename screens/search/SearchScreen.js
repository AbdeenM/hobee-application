import React from "react";
import {
	ScrollView,
	View,
	RefreshControl
} from "react-native";
import {
	SearchBar,
	ListItem,
	Icon,
	Avatar,
	Text
} from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';

import LottieView from 'lottie-react-native';

import {
	fetchBrowse,
	fetchSearch
} from './SearchActions';

import Styles from './Styles';

const mapStateToProps = (state, ownProps) => ({
	// ... computed data from state and optionally ownProps
	theme: state.theme,
	mySearch: state.search,
	myBrowse: state.browse
});

const mapDispatchToProps = {
	// ... normally is an object full of action creators
	fetchBrowse,
	fetchSearch
};

class SearchScreen extends React.Component {
	static navigationOptions = {
		tabBarIcon: (
			<Icon
				type='material'
				name='search'
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
		search: ''
	};

	componentDidMount = async () => {
		await this.props.fetchBrowse();
	};

	_onChangeText = (text) => {
		this.setState({ search: text });
		if (text.length >= 2) {
			this.props.fetchSearch({ search: text });
		}
	};

	_onClearText = (text) => {
		this.setState({ search: text });
		if (text.length >= 2) {
			this.props.fetchSearch({ search: text });
		}
	};

	_formatTime(dateTime) {
		if (moment(dateTime).isSame(Date.now(), 'day')) {
			return moment(dateTime).format('HH:mm A');
		} else if (moment(dateTime).isSame(Date.now(), 'week')) {
			const day = moment(dateTime).format('ddd');
			const date = moment(dateTime).date();
			return date + ' ' + day;
		} else {
			return moment(dateTime).format('DD/MM');
		}
	};

	_onRefresh = async () => {
		this.setState({ refreshing: true });

		await this.props.fetchBrowse();

		this.setState({ refreshing: false });
	};

	render() {
		const {
			data,
			isFetched,
		} = this.props.mySearch;

		const {
			browse,
			isBrowseFetched,
		} = this.props.myBrowse;

		if (!isFetched || !isBrowseFetched) {
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
				<ScrollView style={Styles.bodyContainer}>
					<SearchBar
						round
						autoCapitalize='none'
						autoCorrect={false}
						containerStyle={{
							backgroundColor: this.props.theme.bgBottom
						}}
						inputContainerStyle={{ backgroundColor: this.props.theme.bgBottom }}
						inputStyle={{ color: this.props.theme.fontColor }}
						onChangeText={(text) => this._onChangeText(text)}
						onClearText={(text) => this._onClearText(text)}
						placeholder='Search for HOBEES...'
						placeholderTextColor={this.props.theme.fontColor}
						value={this.state.search} />
					{
						data.map((hobee, i) => (
							<ListItem
								onPress={() => this.props.navigation.navigate('ViewHobee', { hobeeId: hobee._id })}
								key={i}
								leftAvatar={<Avatar
									rounded
									source={{ uri: hobee.image }}
									size={50} />}
								roundAvatar
								title={hobee.title}
								rightAvatar={null}
								rightSubtitle={this._formatTime(hobee.time)}
								subtitle={hobee.hobeeCategory}
								titleStyle={{ color: this.props.theme.fontTitleColor, fontSize: 23 }}
								rightSubtitleStyle={{ color: this.props.theme.fontColor }}
								subtitleStyle={{ color: this.props.theme.fontColor }}
								containerStyle={{ backgroundColor: this.props.theme.bgTop, borderRadius: 10, marginVertical: 5 }} />
						))
					}
				</ScrollView>

				<View style={Styles.item}>
					<Text style={{
						color: this.props.theme.primaryColor, ...Styles.titleBrowse
					}}>BROWSE</Text>
				</View>

				{
					browse.map((category, i) => (
						<View style={[Styles.item, { marginVertical: 10 }]} key={i}>
							{category['Fitness & Sports'] ? <View style={{ alignItems: 'center' }}>
								<View style={Styles.item}>
									<Text style={{
										color: this.props.theme.fontTitleColor, ...Styles.subTitleBrowse
									}}>Fitness & Sports</Text>
								</View>
								<ScrollView horizontal indicatorStyle='white' contentContainerStyle={{ alignItems: 'center' }}>
									{category['Fitness & Sports'].map((hobees, index) => (
										<View style={{ marginEnd: 15 }} key={index}>
											<Avatar
												onPress={() => this.props.navigation.navigate('ViewHobee', { hobeeId: hobees._id })}
												size={150}
												source={{ uri: hobees.image }} />
											<View style={{ backgroundColor: this.props.theme.bgTop, alignItems: 'center' }}>
												<Text style={{
													color: this.props.theme.fontTitleColor, ...Styles.hobeeTitleBrowse
												}}>{hobees.title}</Text>
											</View>
										</View>
									))}
								</ScrollView>
							</View> : <View />}

							{category['Education / Learning / Vocation'] ? <View style={{ alignItems: 'center' }}>
								<View style={Styles.item}>
									<Text style={{
										color: this.props.theme.fontTitleColor, ...Styles.subTitleBrowse
									}}>Education / Learning / Vocation</Text>
								</View>
								<ScrollView horizontal indicatorStyle='white' contentContainerStyle={{ alignItems: 'center' }}>
									{category['Education / Learning / Vocation'].map((hobees, index) => (
										<View style={{ marginEnd: 15 }} key={index}>
											<Avatar
												onPress={() => this.props.navigation.navigate('ViewHobee', { hobeeId: hobees._id })}
												size={150}
												source={{ uri: hobees.image }} />
											<View style={{ backgroundColor: this.props.theme.bgTop, alignItems: 'center' }}>
												<Text style={{
													color: this.props.theme.fontTitleColor, ...Styles.hobeeTitleBrowse
												}}>{hobees.title}</Text>
											</View>
										</View>
									))}
								</ScrollView>
							</View> : <View />}

							{category['Outdoor & Adventure'] ? <View style={{ alignItems: 'center' }}>
								<View style={Styles.item}>
									<Text style={{
										color: this.props.theme.fontTitleColor, ...Styles.subTitleBrowse
									}}>Outdoor & Adventure</Text>
								</View>
								<ScrollView horizontal indicatorStyle='white' contentContainerStyle={{ alignItems: 'center' }}>
									{category['Outdoor & Adventure'].map((hobees, index) => (
										<View style={{ marginEnd: 15 }} key={index}>
											<Avatar
												onPress={() => this.props.navigation.navigate('ViewHobee', { hobeeId: hobees._id })}
												size={150}
												source={{ uri: hobees.image }} />
											<View style={{ backgroundColor: this.props.theme.bgTop, alignItems: 'center' }}>
												<Text style={{
													color: this.props.theme.fontTitleColor, ...Styles.hobeeTitleBrowse
												}}>{hobees.title}</Text>
											</View>
										</View>
									))}
								</ScrollView>
							</View> : <View />}

							{category['Film & Photography'] ? <View style={{ alignItems: 'center' }}>
								<View style={Styles.item}>
									<Text style={{
										color: this.props.theme.fontTitleColor, ...Styles.subTitleBrowse
									}}>Film & Photography</Text>
								</View>
								<ScrollView horizontal indicatorStyle='white' contentContainerStyle={{ alignItems: 'center' }}>
									{category['Film & Photography'].map((hobees, index) => (
										<View style={{ marginEnd: 15 }} key={index}>
											<Avatar
												onPress={() => this.props.navigation.navigate('ViewHobee', { hobeeId: hobees._id })}
												size={150}
												source={{ uri: hobees.image }} />
											<View style={{ backgroundColor: this.props.theme.bgTop, alignItems: 'center' }}>
												<Text style={{
													color: this.props.theme.fontTitleColor, ...Styles.hobeeTitleBrowse
												}}>{hobees.title}</Text>
											</View>
										</View>
									))}
								</ScrollView>
							</View> : <View />}

							{category['Music'] ? <View style={{ alignItems: 'center' }}>
								<View style={Styles.item}>
									<Text style={{
										color: this.props.theme.fontTitleColor, ...Styles.subTitleBrowse
									}}>Music</Text>
								</View>
								<ScrollView horizontal indicatorStyle='white' contentContainerStyle={{ alignItems: 'center' }}>
									{category['Music'].map((hobees, index) => (
										<View style={{ marginEnd: 15 }} key={index}>
											<Avatar
												onPress={() => this.props.navigation.navigate('ViewHobee', { hobeeId: hobees._id })}
												size={150}
												source={{ uri: hobees.image }} />
											<View style={{ backgroundColor: this.props.theme.bgTop, alignItems: 'center' }}>
												<Text style={{
													color: this.props.theme.fontTitleColor, ...Styles.hobeeTitleBrowse
												}}>{hobees.title}</Text>
											</View>
										</View>
									))}
								</ScrollView>
							</View> : <View />}

							{category['Games'] ? <View style={{ alignItems: 'center' }}>
								<View style={Styles.item}>
									<Text style={{
										color: this.props.theme.fontTitleColor, ...Styles.subTitleBrowse
									}}>Games</Text>
								</View>
								<ScrollView horizontal indicatorStyle='white' contentContainerStyle={{ alignItems: 'center' }}>
									{category['Games'].map((hobees, index) => (
										<View style={{ marginEnd: 15 }} key={index}>
											<Avatar
												onPress={() => this.props.navigation.navigate('ViewHobee', { hobeeId: hobees._id })}
												size={150}
												source={{ uri: hobees.image }} />
											<View style={{ backgroundColor: this.props.theme.bgTop, alignItems: 'center' }}>
												<Text style={{
													color: this.props.theme.fontTitleColor, ...Styles.hobeeTitleBrowse
												}}>{hobees.title}</Text>
											</View>
										</View>
									))}
								</ScrollView>
							</View> : <View />}

							{category['Arts'] ? <View style={{ alignItems: 'center' }}>
								<View style={Styles.item}>
									<Text style={{
										color: this.props.theme.fontTitleColor, ...Styles.subTitleBrowse
									}}>Arts</Text>
								</View>
								<ScrollView horizontal indicatorStyle='white' contentContainerStyle={{ alignItems: 'center' }}>
									{category['Arts'].map((hobees, index) => (
										<View style={{ marginEnd: 15 }} key={index}>
											<Avatar
												onPress={() => this.props.navigation.navigate('ViewHobee', { hobeeId: hobees._id })}
												size={150}
												source={{ uri: hobees.image }} />
											<View style={{ backgroundColor: this.props.theme.bgTop, alignItems: 'center' }}>
												<Text style={{
													color: this.props.theme.fontTitleColor, ...Styles.hobeeTitleBrowse
												}}>{hobees.title}</Text>
											</View>
										</View>
									))}
								</ScrollView>
							</View> : <View />}

							{category['Pets'] ? <View style={{ alignItems: 'center' }}>
								<View style={Styles.item}>
									<Text style={{
										color: this.props.theme.fontTitleColor, ...Styles.subTitleBrowse
									}}>Pets</Text>
								</View>
								<ScrollView horizontal indicatorStyle='white' contentContainerStyle={{ alignItems: 'center' }}>
									{category['Pets'].map((hobees, index) => (
										<View style={{ marginEnd: 15 }} key={index}>
											<Avatar
												onPress={() => this.props.navigation.navigate('ViewHobee', { hobeeId: hobees._id })}
												size={150}
												source={{ uri: hobees.image }} />
											<View style={{ backgroundColor: this.props.theme.bgTop, alignItems: 'center' }}>
												<Text style={{
													color: this.props.theme.fontTitleColor, ...Styles.hobeeTitleBrowse
												}}>{hobees.title}</Text>
											</View>
										</View>
									))}
								</ScrollView>
							</View> : <View />}

							{category['Social'] ? <View style={{ alignItems: 'center' }}>
								<View style={Styles.item}>
									<Text style={{
										color: this.props.theme.fontTitleColor, ...Styles.subTitleBrowse
									}}>Social</Text>
								</View>
								<ScrollView horizontal indicatorStyle='white' contentContainerStyle={{ alignItems: 'center' }}>
									{category['Social'].map((hobees, index) => (
										<View style={{ marginEnd: 15 }} key={index}>
											<Avatar
												onPress={() => this.props.navigation.navigate('ViewHobee', { hobeeId: hobees._id })}
												size={150}
												source={{ uri: hobees.image }} />
											<View style={{ backgroundColor: this.props.theme.bgTop, alignItems: 'center' }}>
												<Text style={{
													color: this.props.theme.fontTitleColor, ...Styles.hobeeTitleBrowse
												}}>{hobees.title}</Text>
											</View>
										</View>
									))}
								</ScrollView>
							</View> : <View />}
						</View>
					))
				}
			</ScrollView>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchScreen);
