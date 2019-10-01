import React from "react";
import {
	ScrollView,
	View,
	Text,
	RefreshControl
} from "react-native";
import {
	ListItem,
	Avatar
} from 'react-native-elements';
import { connect } from 'react-redux';
import moment from 'moment';

import LottieView from 'lottie-react-native';

import { fetchUserChats } from './ChatsActions';

import Styles from "./Styles";

const mapStateToProps = (state, ownProps) => ({
	// ... computed data from state and optionally ownProps
	theme: state.theme,
	userInfo: state.user.info,
	chats: state.chats
});

const mapDispatchToProps = {
	// ... normally is an object full of action creators
	fetchUserChats
};

class ChatsScreen extends React.Component {
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
		await this.props.fetchUserChats(userId);
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

		const userId = this.props.userInfo.id;
		await this.props.fetchUserChats(userId);

		this.setState({ refreshing: false });
	};

	render() {
		const {
			data,
			isFetched
		} = this.props.chats;

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
				<View style={Styles.itemContainer}>
					{
						data.length ? data.map((chat, i) => (
							<ListItem
								onPress={() => this.props.navigation.navigate('ChatRoom', {
									friendAvatar: chat.avatar,
									friendName: chat.fullName,
									friendId: chat.friendId,
									chatId: chat.chatId
								})}
								key={i}
								leftAvatar={chat.avatar ? <Avatar
									rounded
									source={{ uri: chat.avatar }}
									size={50} /> : <Avatar
										rounded
										icon={{ type: 'material-community', name: 'account' }}
										size={50} />}
								rightAvatar={chat.avatar ? <Avatar
									rounded
									source={{ uri: chat.avatar }}
									size={20} /> : <Avatar
										rounded
										icon={{ type: 'material-community', name: 'account' }}
										size={20} />}
								title={chat.fullName}
								titleStyle={{ color: this.props.theme.fontTitleColor, marginVertical: 5 }}
								rightSubtitle={this._formatTime(chat.chatHistory.createdAt)}
								rightSubtitleStyle={{ color: this.props.theme.fontColor }}
								subtitle={chat.chatHistory.text}
								subtitleStyle={{ color: this.props.theme.fontColor }}
								containerStyle={{ backgroundColor: this.props.theme.bgTop, borderRadius: 10, marginVertical: 5 }} />
						)) : <View style={{ alignItems: 'center', marginTop: 20 }}>
								<Text style={{
									color: this.props.theme.fontTitleColor,
									fontWeight: 'bold',
									fontSize: 13,
									backgroundColor: this.props.theme.bgBottom
								}}>Opps! No Messages Yet</Text>
							</View>
					}
				</View>
			</ScrollView>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatsScreen);
