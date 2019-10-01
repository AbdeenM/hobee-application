import React from "react";
import {
	ScrollView,
	RefreshControl,
	View
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import LottieView from 'lottie-react-native';

import { HobeePermissions } from '../../constants/Permissions';
import { fetchAllHobees } from './MapActions';

import Styles from './Styles';

const permissions = new HobeePermissions();

const mapStateToProps = (state, ownProps) => ({
	theme: state.theme,
	allHobees: state.map.allHobees
});

const mapDispatchToProps = {
	// ... normally is an object full of action creators
	//fetchUserHobees,
	fetchAllHobees
};

class MapScreen extends React.Component {
	static navigationOptions = {
		tabBarIcon: (
			<Icon
				type='material'
				name='map'
				size={30}
				color='#71cddc' />
		)
	}

	state = {
		refreshing: false,
		loaders: [
			require('../../assets/loading1.json'),
			require('../../assets/loading2.json'),
			require('../../assets/loading3.json'),
			require('../../assets/loading4.json'),
			require('../../assets/loading5.json')
		],
		region: null
	}

	componentDidMount = async () => {
		await permissions.getLocationPermission();

		await this.props.fetchAllHobees();

		const location = await Location.getCurrentPositionAsync();
		this.setState({
			region: {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.003,
				longitudeDelta: 0.003,
			},
		});
	};

	_onRefresh = async () => {
		this.setState({ refreshing: true });

		await permissions.getLocationPermission();

		await this.props.fetchAllHobees();

		this.setState({ refreshing: false });

		const location = await Location.getCurrentPositionAsync();
		this.setState({
			region: {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.003,
				longitudeDelta: 0.003,
			},
		});
	};

	render() {
		const {
			data,
			isFetched,
			error
		} = this.props.allHobees;

		if (!isFetched || this.state.region === null) {
			return (
				<ScrollView style={Styles.root} refreshControl={
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
			<View style={{
				backgroundColor: this.props.theme.bgBottom, ...Styles.root
			}}>
				<MapView
					style={Styles.root}
					provider={PROVIDER_GOOGLE}
					showsCompass={true}
					showsScale={true}
					showsBuildings={true}
					showsUserLocation={true}
					showsMyLocationButton={true}
					initialRegion={this.state.region}
					region={this.state.region}>
					{
						data.map((hobee, i) => (
							<Marker
								onCalloutPress={() => this.props.navigation.navigate('ViewHobee', { hobeeId: hobee._id })}
								key={i}
								pinColor='black'
								coordinate={{ latitude: parseFloat(hobee.hobeeLocation.latitude), longitude: parseFloat(hobee.hobeeLocation.longitude) }}
								title={hobee.title}
								description={hobee.description} />
						))
					}
				</MapView>
			</View>
		);
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MapScreen);
