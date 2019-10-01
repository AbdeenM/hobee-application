import React from 'react';
import { AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import Store from './redux/Store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';

import EStyleSheet from 'react-native-extended-stylesheet';

import AppNavigator from './navigation/AppNavigator';

//AsyncStorage.clear();

EStyleSheet.build();
const Persistor = persistStore(Store);

export default class App extends React.Component {
	state = {
		loaders: [
			require('./assets/loading1.json'),
			require('./assets/loading2.json'),
			require('./assets/loading3.json'),
			require('./assets/loading4.json'),
			require('./assets/loading5.json')
		]
	};

	render() {
		return (
			<Provider store={Store}>
				<PersistGate
					loading={null}
					persistor={Persistor}>
					<AppNavigator />
				</PersistGate>
			</Provider>
		);
	}
}
