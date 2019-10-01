import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
	root: {
		flex: 1,
	},
	bodyContainer: {
		height: 350,
	},
	item: {
		marginHorizontal: 10,
		marginVertical: 10
	},
	titleBrowse: {
		fontSize: 30,
		fontWeight: 'bold'
	},
	subTitleBrowse: {
		fontSize: 25,
		fontWeight: 'bold'
	},
	hobeeTitleBrowse: {
		fontSize: 15,
		fontWeight: 'bold',
		marginVertical: 10
	}
});

export default Styles;
