import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
	root: {
		flex: 1,
	},
	item: {
		marginVertical: 20,
		marginHorizontal: 20
	},
	imageContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {
		width: 192,
		height: 192
	}
});

export default Styles;
