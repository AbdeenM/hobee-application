import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
	root: {
		flex: 1,
	},
	bodyContainer: {
		flex: 1,
	},
	card: {
		padding: 0,
		borderRadius: 10
	},
	cardTitle: {
		marginTop: 15
	},
	cardWrapper: {
		borderRadius: 10
	},
	myHobeeContainer: {
		flexDirection: 'row',
		marginHorizontal: 10,
		marginBottom: 15
	},
	userHobeesTitleContatiner: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginHorizontal: 10
	},
	userHobeesTitle: {
		fontSize: 17,
		marginEnd: 15
	},
	hobees: {
		flexDirection: 'row',
		marginEnd: 10
	},
	buttonCreate: {
		borderRadius: 10,
	},
	cardCalendarWrapper: {
		height: 400,
		borderRadius: 10
	},
	emptyCalendarContainer: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'column'
	},
	emptyCalendarText: {
		fontWeight: 'bold',
		fontSize: 15,
		marginVertical: '3%'
	},
	item: {
		backgroundColor: 'white',
		flex: 1,
		borderRadius: 5,
		padding: 10,
		marginRight: 10,
		marginTop: 17
	},
	emptyDate: {
		height: 15,
		flex: 1,
		paddingTop: 30
	}
})

export default Styles;
