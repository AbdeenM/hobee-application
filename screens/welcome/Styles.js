import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
	root: {
		flex: 1,
	},
	video: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	imageContainer: {
		flex: 0.5,
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {
		width: 192,
		height: 192
	},
	buttonContainer: {
		flex: 0.5,
		justifyContent: 'center'
	}
});

export default Styles;
