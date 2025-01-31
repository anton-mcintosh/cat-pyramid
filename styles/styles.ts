import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  text: {
    fontSize: 20,
  },
  emptyCell: {
    width: 125,
    height: 125,
  },
  cat: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
  catID: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  mainContainer: {
    flex: 1,
    width: '100%',
  },
  statsContainer: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
    width: '100%',
  },
  statsBox: {
    width: '100%',
    alignItems: 'center',
  }
});

