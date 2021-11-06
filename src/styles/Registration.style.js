//for both registration and login
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60
  },
  keyboardAwareScrollView: {
    flex: 1,
    width: '100%',
  },
  logo: {
    flex: 1,
    width: 200,
    height: 200,
    marginTop: -20,
    marginBottom: 20,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  input: {
    height: 48,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16
  },
  button: {
    backgroundColor: '#788eec',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  },
  footerText: {
    fontSize: 16,
    color: '#2e2e2d'
  },
  footerLink: {
    color: '#788eec',
    fontWeight: 'bold',
    fontSize: 16
  },
  roleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 12,
  }
});