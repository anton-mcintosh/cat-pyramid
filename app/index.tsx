import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { randomCell } from '../utils/empty-init';

export default function Index() {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue(0);
  const rows = 5;
  const renderPyramid = () => {
    const pyramid = [];
    var emptyCells = [];
    var cell = randomCell(rows);
    emptyCells.push(cell);
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < i + 1; j++) {
        if ( emptyCells.some(cell => cell.row === i && cell.cell === j) ) {
          row.push(
            <View key={j} style={styles.cell}>
            <View style={styles.empty}></View>
            </View>
          );
          continue;
        }
        row.push(
          <View key={j} style={styles.cell}>
          <View style={styles.cat}></View>
          </View>
        );
      }
      pyramid.push(
      <View key={i} style={styles.row}>
        {row}
      </View>
      );
    }
    return pyramid;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      {renderPyramid()}
    </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
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
