import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
	root: {
		flex: 1,
	},
	card: {
		padding: 0,
		borderRadius: 10
	},
	cardTitle: {
		marginTop: 15,
	},
	cardWrapper: {
		borderRadius: 10
	},
	myProfileContainer: {
		marginVertical: 10,
		marginBottom: 15
	},
	joinedHobee: {
		fontWeight: 'bold',
		fontSize: 13,
		marginTop: 15
	},
	keyWords: {
		fontWeight: 'bold',
		fontSize: 13
	},
	mySettingsContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignContent: 'center',
		marginBottom: 10
	},
	buttonSave: {
		borderRadius: 10
	},
	buttonLogout: {
		borderRadius: 10
	}
});

export default Styles;
