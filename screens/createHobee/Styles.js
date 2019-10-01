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
	imageContainer: {
		flexDirection: 'row',
		marginVertical: 10,
		marginHorizontal: 10,
	},
	images: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10,
		marginHorizontal: 10,
	},
	item: {
		marginVertical: 10
	},
	titleStyle: {
		marginHorizontal: 30,
		marginVertical: 10,
		fontWeight: 'bold',
		fontSize: 15,
	},
	descriptionStyle: {
		marginHorizontal: 30,
		marginVertical: 10,
		fontWeight: 'bold',
		fontSize: 15,
	},
	notesStyle: {
		marginHorizontal: 30,
		marginVertical: 10,
		//fontWeight: 'bold',
		fontSize: 15,
	}
});

export default Styles;
