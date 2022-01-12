import { Dimensions, StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    flex: 1,
    height: 150,
    width: 400,
  },
  map: {
    marginTop: 20,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 130,
  },
  chipsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    marginTop: 20,
    marginBottom: 0,
  },
  chip: {
    height: 30,
    backgroundColor: '#fff',
    marginLeft: 5,
    color: '#000'
  },
  chipSelected: {
    height: 30,
    backgroundColor: '#016FB9',
    color: '#fff',
  },
})