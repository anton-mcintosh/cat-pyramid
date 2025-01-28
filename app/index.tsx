import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

export default function Index() {
  const rows = 5;

  const renderPyramid = () => {
    const pyramid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < i + 1; j++) {
        row.push(
          <View key={j} style={styles.cell}>
          <Text style={styles.text}>{j + 1}</Text>
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
    <ScrollView contentContainerStyle={styles.container}>
      {renderPyramid()}
    </ScrollView>
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
});
