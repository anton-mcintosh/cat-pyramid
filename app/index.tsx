import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Board from '../components/board';
import { Cat, CatComponent } from '../components/cat';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';

const App = () => {
  const board = new Board(5); // Example with 5 rows
  const cats = board.createCats();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {board.cells.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <View
              key={cellIndex}
              style={[
                styles.cell,
                cell.isEmpty ? styles.emptyCell : styles.cell,
              ]}
            >
              {cell.isEmpty ? null : <CatComponent cat={cats.
              find(cat => cat.location.row === rowIndex && cat.location.cell === cellIndex)} />}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default App;
