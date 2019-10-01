import React from "react";
import {
	View,
	AsyncStorage
} from "react-native";
import { connect } from 'react-redux';
import SocketIOClient from 'socket.io-client';

import { GiftedChat } from 'react-native-gifted-chat'

import Config from "../../constants/Config";

import Styles from './Styles';

const mapStateToProps = (state, ownProps) => ({
	// ... computed data from state and optionally ownProps
	theme: state.theme,
	userInfo: state.user.info
});

const mapDispatchToProps = {
	// ... normally is an object full of action creators
};

class ChatRoomScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			friendId: this.props.navigation.getParam('friendId'),
			friendName: this.props.navigation.getParam('friendName'),
			friendAvatar: this.props.navigation.getParam('friendAvatar'),
			messages: []
		};

		this._userJoined = this._userJoined.bind(this);
		this._onRecievedMessage = this._onRecievedMessage.bind(this);
		this._onSend = this._onSend.bind(this);
		this._storeMessages = this._storeMessages.bind(this);

		this.socket = SocketIOClient(Config.SERVER_URL);
		this.socket.on('message', this._onRecievedMessage);
		this._userJoined();
	};

	_userJoined = () => {
		AsyncStorage.getItem('token')
			.then(() => {
				this.socket.emit('userJoined', this.props.userInfo.id, this.state.friendId);
			})
			.catch((err) => Alert.alert(err));
	};

	_onRecievedMessage = (messages) => {
		this._storeMessages(messages);
	};

	_storeMessages = (messages) => {
		this.setState((previousState) => {
			return {
				messages: GiftedChat.append(previousState.messages, messages)
			}
		});
	};

	_onSend = async (messages = []) => {
		this.socket.emit('message', messages[0]);
		this._storeMessages(messages);
	};

	render() {
		return (
			<View style={{
				backgroundColor: this.props.theme.bgBottom, ...Styles.root
			}}>
				<GiftedChat
					messages={this.state.messages}
					onSend={(message) => {
						message[0].friendId = this.state.friendId;
						this._onSend(message);
					}}
					user={{
						_id: this.props.userInfo.id,
						name: this.props.userInfo.name,
						avatar: this.props.userInfo.avatar
					}}
				//renderInputToolbar={(props) => <InputToolbar {...props} containerStyle={{ borderTopColor: this.props.theme.bgTop, backgroundColor: this.props.theme.bgTop }} />}
				//inverted={false}
				//showUserAvatar={true}
				//renderUsernameOnMessage={true}
				/>
			</View>
		)
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ChatRoomScreen);
