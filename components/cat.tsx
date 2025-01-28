import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { styles } from '../styles/styles';

export function Cat() {
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
    });
    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.cat, animatedStyle]} />
      </GestureDetector>
    );
  }

