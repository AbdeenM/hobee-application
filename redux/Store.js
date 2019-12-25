import { AsyncStorage } from 'react-native';
import {
	applyMiddleware,
	createStore,
	compose
} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { createLogger } from 'redux-logger'
import { persistReducer } from 'redux-persist';

import RootReducer from './RootReducer';

const middlewares = [
	promise,
	thunk
]

if (__DEV__) {
	middlewares.push(createLogger());
}

const persistConfig = {
	key: 'root',
	storage: AsyncStorage
}

const pReducer = persistReducer(persistConfig, RootReducer);

export default Store = createStore(
	pReducer,
	undefined,
	compose(
		applyMiddleware(...middlewares)
	)
);
