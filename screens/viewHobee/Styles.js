import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
	root: {
		flex: 1,
	},
	image: {
		height: 200
	},
	item: {
		marginVertical: 5,
		marginHorizontal: 10
	},
	textTitleMain: {
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
		marginVertical: 20
	},
	textTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		marginTop: 30
	},
	textBody: {
		fontSize: 17,
		marginVertical: 5,
		textAlign: 'center'
	}
});

export default Styles;
