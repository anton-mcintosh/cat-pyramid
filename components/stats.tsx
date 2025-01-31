import { Cell, CatComponent } from './cat';
import { useContext } from 'react';
import { View, Text } from 'react-native';
import { GameContext } from '../app/index';
import { styles } from '../styles/styles';

export function StatsDisplay() {
  const { coordinates } = useContext(GameContext);
  const { catId } = useContext(GameContext);
  return (
    <View style={styles.statsBox}>
      <Text>Cat: {catId}</Text>
      <Text>X: {Math.round(coordinates.x)}</Text>
      <Text>Y: {Math.round(coordinates.y)}</Text>
    </View>
  )
}


