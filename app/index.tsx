import React, { createContext, useContext, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Cell } from '../components/board';
import Board from '../components/board';
import { Cat, CatComponent } from '../components/cat';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../styles/styles';
import { StatsDisplay } from '../components/stats';

export const GameContext = createContext({ 
  coordinates: { x: 0, y: 0 },
  setCoordinates: (coords: {x: number, y: number}) => {},
  catId: 0,
  setCatId: (id: number) => {}
});

const App = () => {
  const board = new Board(5);
  const cats = board.createCats();
  const cellSize = 125; 

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [catId, setCatId] = useState(0);


  return (
    <GameContext.Provider value={{ coordinates, setCoordinates, catId, setCatId }}>
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
              {cell.isEmpty ? null : (
                <CatComponent
                  cat={cats.find(cat => cat.location.row === rowIndex && cat.location.cell === cellIndex)}
                  cellSize={cellSize}
                />
              )}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
      <StatsDisplay />
    </GameContext.Provider> 
  );
};

export default App;
