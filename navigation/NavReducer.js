import { router } from './AppNavigator';

export default function NavReducer(state, action) {
	const newState = router.getStateForAction(action, state);
	return newState || state;
}
