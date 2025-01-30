import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { styles } from '../styles/styles';
import { Cell } from '../components/board';

class Cat {
  location: Cell;
  neighbors: Cell[];

  constructor(location: Cell, neighbors: Cell[]) {
    this.location = location;
    this.neighbors = neighbors;
  }

  updateLocation(newLocation: Cell) {
    this.location = newLocation;
  }

  updateNeighbors(newNeighbors: Cell[]) {
    this.neighbors = newNeighbors;
  }
}
export default Cat;

export function CatComponent({ cat }: { cat: Cat }) {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.2 : 1) }
      ],
      backgroundColor: isPressed.value ? 'red' : 'blue',
    };
  });

  const start = useSharedValue({ x: 0, y: 0 });
  const cellSize = 125; // Assuming each cell is 125x125 pixels, adjust as needed

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
      };
    })
    .onEnd(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
    })
    .onFinalize(() => {
      isPressed.value = false;
      cat.updateLocation(/* new location based on offset.value */);
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.cat, animatedStyle]}>
        {/* Render additional information about the cat if needed */}
      </Animated.View>
    </GestureDetector>
  );
}
