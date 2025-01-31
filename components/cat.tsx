import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { useContext } from 'react';
import { Text, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming, runOnJS } from 'react-native-reanimated';
import { styles } from '../styles/styles';
import { Cell } from '../components/board';
import { GameContext } from '../app/index';
import { findTarget } from '../utils/target-cell'

class Cat {
  id: number;
  location: Cell;
  neighbors: Cell[];

  constructor(location: Cell, neighbors: Cell[], id) {
    this.id = id;
    this.location = location;
    this.neighbors = neighbors;
  }
  
  getLocation() {
    return this.location;
  }

  updateLocation(newLocation: Cell) {
    this.location = newLocation;
  }

  updateNeighbors(newNeighbors: Cell[]) {
    this.neighbors = newNeighbors;
  }
}

export function CatMovement({ cat, cellSize, board }: {cat: Cat, cellSize: number, board: Board}) {
  const initialCenter = cat.location.getCenter(cellSize);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);
  const absoluteX = useSharedValue(initialCenter.x);
  const absoluteY = useSharedValue(initialCenter.y);


  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translationX.value },
                { translateY: translationY.value },
    ],
  }));

  const { setCatId } = useContext(GameContext);

  const pan = Gesture.Pan()
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
      setCatId(cat.Id);
    })

    .onUpdate((event) => {
      translationX.value = prevTranslationX.value + event.translationX; 
      translationY.value = prevTranslationY.value + event.translationY;
      absoluteX.value = initialCenter.x + translationX.value;
      absoluteY.value = initialCenter.y + translationY.value;
  })
    .onEnd(() => {
      const [targetRow, targetCell] = findTarget(absoluteX.value, absoluteY.value, cellSize);
      console.log("target cell: ", targetCell);
      const targetBoardCell = board.cells[targetRow][targetCell];
      const targetCenter = targetBoardCell.getCenter(cellSize);
      translationX.value = withSpring(targetCenter.x - initialCenter.x);
      translationY.value = withSpring(targetCenter.y - initialCenter.y);
      cat.updateLocation(targetBoardCell);

      console.log("Snapping to coords: ", targetCenter.x, targetCenter.y);
      console.log("Actual cell center: ", targetBoardCell.row, targetBoardCell.cell);
      
  })
  .runOnJS(true);

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[styles.cat, animatedStyle]} />
    </GestureDetector>
  );
}
/*
interface CatComponentProps {
  cat: Cat;
  cellSize: number;
}

export function CatComponent({ cat, cellSize }: CatComponentProps) {
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0});

  const { setCoordinates } = useContext(GameContext);
  const { setCatId } = useContext(GameContext);


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
        //{ scale: withSpring(isPressed.value ? 1.2 : 1) }
      ],
      backgroundColor: isPressed.value ? 'red' : 'blue',
    };
  });

  const updateCatLocation = (newX: number, newY: number) => {
    const row = Math.floor(newY / cellSize);
    const col = Math.floor(newX / cellSize);

    if (row < 0 || col < 0 || row >= 5 || col >= 5) {
      offset.value = {
        x: cat.location.getCenter(cellSize).x - cellSize / 2,
        y: cat.location.getCenter(cellSize).y - cellSize / 2
      };
      return;
    }

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
      isPressed.value = true;
      setCatId( cat.id );
  })
    .onUpdate((e) => {
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
      isPressed.value = false;
  })

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.cat, animatedStyle]}>
        <Text style={[styles.catID]}>{cat.id}</Text>
      </Animated.View>
    </GestureDetector>
  );
}
*/
export default Cat;
