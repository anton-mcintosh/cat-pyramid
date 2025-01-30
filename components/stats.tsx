import { Cell, CatComponent } from './cat';
import { useContext } from 'react';
import { View, Text } from 'react-native';
import { GameContext } from '../app/index';

export function StatsDisplay() {
  const { coordinates } = useContext(GameContext);
  return (
    <View>
      <Text>X: {coordinates.x}</Text>
      <Text>Y: {coordinates.y}</Text>
    </View>
  )
}


