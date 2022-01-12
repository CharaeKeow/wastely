import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: 150,
    height: 150
  },
  fab: {
    position: 'absolute',
    //marginBottom: 40,
    //marginRight: 10,
    right: 10,
    bottom: 50,
    backgroundColor: '#016FB9'
  },
  chipsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 50,
    marginTop: 30,
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
  flatListContainer: {
    marginTop: 20,
    minHeight: Dimensions.get('window').height - 110,
  }
})