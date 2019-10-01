import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
	root: {
		flex: 1,
	},
	topContainer: {
		flex: 0.45,
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {
		width: 192,
		height: 192
	},
	title: {
		fontSize: 40,
		textAlign: 'center',
		width: '80%'
	},
	middleContainer: {
		flex: 0.35,
		marginHorizontal: 20
	},
	content: {
		fontSize: 20,
		textAlign: 'center',
		width: '80%'
	},
	bottomContainer: {
		flex: 0.2
	}
});

export default Styles;
