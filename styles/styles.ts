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
  empty: {
    width: 100,
    height: 100,
  },
  cat: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
    alignSelf: 'center',
  }
});

