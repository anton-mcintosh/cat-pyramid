import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { randomCell } from '../utils/empty-init';
import { Cat } from '../components/cat';
import { styles } from '../styles/styles';

export default function Index() {
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
            <Cat />
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

