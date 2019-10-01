import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
	root: {
		flex: 1,
	},
	card: {
		padding: 0,
		borderRadius: 10
	},
	item: {
		marginVertical: 10
	},
	backgroundImage: {
		flex: 1,
		height: 150,
		marginVertical: 10,
		//marginHorizontal: 10,
		resizeMode: 'cover',
		borderWidth: 20
	}
});

export default Styles;
