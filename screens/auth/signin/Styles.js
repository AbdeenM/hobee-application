import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
  root: {
    flex: 1,
  },
  topContainer: {
    flex: 0.3,
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
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    fontSize: 20,
    textAlign: 'center',
    width: '80%'
  },
  wordHobee: {
    fontSize: 25
  },
  bottomContainer: {
    flex: 0.3,
  },
  buttonGoogle: {
    backgroundColor: '#db3236',
    marginVertical: 10
  },
  buttonFacebook: {
    backgroundColor: '#3b5998',
    marginVertical: 10
  },
  buttonEmail: {
    marginVertical: 10
  },
  footerText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 10
  }
});

export default Styles;
