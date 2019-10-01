import React from 'react';
import {
	View,
	Text,
	Alert,
	ScrollView,
	RefreshControl
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import SelectMultiple from 'react-native-select-multiple';

import LottieView from 'lottie-react-native';

import {
	updateMyCategorys,
	fetchMyCategorys
} from './CategorysActions';

import Styles from './Styles';

const mapStateToProps = (state, ownProps) => ({
	// ... computed data from state and optionally ownProps
	theme: state.theme,
	userInfo: state.user.info,
	myCategorys: state.categorys

});

const mapDispatchToProps = {
	// ... normally is an object full of action creators
	fetchMyCategorys,
	updateMyCategorys
};

class CategorysScreen extends React.Component {
	state = {
		loaders: [
			require('../../../assets/loading1.json'),
			require('../../../assets/loading2.json'),
			require('../../../assets/loading3.json'),
			require('../../../assets/loading4.json'),
			require('../../../assets/loading5.json')
		],
		categorysList: [
			{ label: 'Fitness & Sports', value: 'Fitness & Sports' },
			{ label: 'Education / Learning / Vocation', value: 'Education / Learning / Vocation' },
			{ label: 'Outdoor & Adventure', value: 'Outdoor & Adventure' },
			{ label: 'Film & Photography', value: 'Film & Photography' },
			{ label: 'Music', value: 'Music' },
			{ label: 'Games', value: 'Games' },
			{ label: 'Arts', value: 'Arts' },
			{ label: 'Pets', value: 'Pets' },
			{ label: 'Social', value: 'Social' }
		],
		selectedCategorys: null
	};

	componentWillMount = async () => {
		const userId = this.props.userInfo.id;
		await this.props.fetchMyCategorys(userId);

		this.setState({ selectedCategorys: this.props.myCategorys.categorys.categorys });
	};

	_onSelectionsChange = (selectedCategorys) => {
		this.setState({ selectedCategorys });
	};

	_onContinue = async () => {
		if (this.state.selectedCategorys.length < 1)
			throw Alert.alert('You must atleast have one category!');

		const userId = this.props.userInfo.id;
		const userCategorys = {
			categorys: this.state.selectedCategorys.map((data) => { return data.value })
		};

		await this.props.updateMyCategorys(userId, userCategorys);
		throw Alert.alert('Yay! Your new categories are saved, Happy Huddling');
	};

	render() {
		const {
			isFetched,
			error
		} = this.props.myCategorys;

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

		const renderLabel = (label, style) => {
			return (
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View style={{ height: 50, marginHorizontal: 10, alignItems: 'center' }}>
						<Text style={{ color: this.props.theme.primaryColor, fontWeight: 'bold', fontSize: 20 }}>{label}</Text>
					</View>
				</View>
			)
		}

		return (
			<View style={{
				backgroundColor: this.props.theme.bgBottom, ...Styles.root
			}}>
				<SelectMultiple
					onSelectionsChange={(selectedCategorys) => this._onSelectionsChange(selectedCategorys)}
					items={this.state.categorysList}
					renderLabel={renderLabel}
					rowStyle={{ backgroundColor: this.props.theme.bgTop }}
					selectedRowStyle={{ borderBottomColor: this.props.theme.going, borderBottomWidth: 10, borderColor: this.props.theme.going, borderWidth: 10 }}
					selectedItems={this.state.selectedCategorys} />


				<Button
					onPress={() => this._onContinue()}
					raised
					title='SAVE'
					titleStyle={{ color: this.props.theme.fontTitleColor, fontWeight: 'bold' }}
					containerStyle={{ marginVertical: 10, marginHorizontal: 20 }}
					buttonStyle={{ backgroundColor: this.props.theme.primaryColor, borderRadius: 10 }} />
			</View >
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CategorysScreen);
