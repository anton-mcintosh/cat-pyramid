import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Board from '../components/board';

const App = () => {
  const board = new Board(5); // Example with 5 rows

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {board.cells.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <View
              key={cellIndex}
              style={[
                styles.cell,
                cell.isEmpty ? styles.emptyCell : styles.filledCell,
              ]}
            >
              <Text>{cell.isEmpty ? 'Empty' : 'Filled'}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  emptyCell: {
    backgroundColor: 'lightgray',
  },
  filledCell: {
    backgroundColor: 'blue',
  },
});

export default App;
