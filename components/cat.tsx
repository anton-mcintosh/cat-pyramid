import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useContext } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { styles } from '../styles/styles';
import { Cell } from '../components/board';
import { GameContext } from '../app/index';

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

interface CatComponentProps {
  cat: Cat;
  cellSize: number;
  onMove?: (from: Cell, to: Cell) => void;
}

export function CatComponent({ cat, cellSize, onMove }: CatComponentProps) {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0});

  const { setCoordinates } = useContext(GameContext);


  const initialPosition = cat.location.getCenter(cellSize);
  offset.value = {
    x: initialPosition.x - cellSize / 2,
    y: initialPosition.y - cellSize / 2
  };

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

  const updateCatLocation = (newX: number, newY: number) => {
    const row = Math.floor(newY / cellSize);
    const col = Math.floor(newX / cellSize);

    const centerPosition = {
    x: col * cellSize + cellSize / 2,
    y: row * cellSize + cellSize / 2
  };

    offset.value = {
      x: centerPosition.x - cellSize / 2,
      y: centerPosition.y - cellSize / 2
    };
  }

  const gesture = Gesture.Pan()
    .onBegin(() => {
      console.log(cat.location);
      isPressed.value = true;
  })
    .onUpdate((e) => {
      console.log("updating");
      offset.value = {
        x: e.translationX + start.value.x,
        y: e.translationY + start.value.y,
    };
  })
    .onEnd(() => {
      const finalX = offset.value.x + cellSize / 2;
      const finalY = offset.value.y + cellSize / 2
      runOnJS(updateCatLocation)(finalX, finalY);
      setCoordinates({ x: finalX, y: finalY });
  })
    .onFinalize(() => {
      isPressed.value = false;
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.cat, animatedStyle]}>
      </Animated.View>
    </GestureDetector>
  );
}

export default Cat;
