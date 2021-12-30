import { StyleSheet, Dimensions } from "react-native"

export default StyleSheet.create({
  img: {
    height: 300,
    width: 400,
  },
  ctnDetails: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 250,
    marginTop: 5,
  },
  txt: {
    marginTop: 5,
  },
  btnRequest: {
    width: 300,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
})