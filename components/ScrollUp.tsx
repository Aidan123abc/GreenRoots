import React, { useState } from 'react';
import { View, StyleSheet, Animated, PanResponder, Dimensions, ScrollView } from 'react-native';

const ScrollUpOverlay = ({ children }: { children: React.ReactNode }) => {
  const screenHeight = Dimensions.get('window').height;
  const partiallyOpenHeight = screenHeight * 0.7; // Initial position (1/4th screen visible)
  const fullyOpenHeight = screenHeight * 0.3; // Fully open position (only 30% of screen visible)
  const SWIPE_THRESHOLD = 50; // Minimum distance for swipe to trigger state change

  const [overlayPosition] = useState(new Animated.Value(partiallyOpenHeight));
  const [isFullyOpen, setIsFullyOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true); // Whether scroll view is at the top edge

  const handleScroll = (event: any) => {
    const { contentOffset } = event.nativeEvent;
    setIsAtTop(contentOffset.y === 0);
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (_, gestureState) => {
      // Only activate PanResponder for downward swipes near the top of the component
      return isAtTop && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
    },
    onMoveShouldSetPanResponder: (_, gestureState) => {
      // Continue to allow PanResponder for vertical movements near the top
      return isAtTop && Math.abs(gestureState.dy) > Math.abs(gestureState.dx);
    },
    onPanResponderMove: (_, gestureState) => {
      // Update overlay position only if within defined range
      const newPosition = Math.min(
        partiallyOpenHeight,
        Math.max(fullyOpenHeight, overlayPosition._value + gestureState.dy)
      );
      overlayPosition.setValue(newPosition);
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > SWIPE_THRESHOLD) {
        // Close overlay (swipe down)
        setIsFullyOpen(false);
        Animated.spring(overlayPosition, {
          toValue: partiallyOpenHeight,
          useNativeDriver: false,
        }).start();
      } else if (gestureState.dy < -SWIPE_THRESHOLD) {
        // Open overlay (swipe up)
        setIsFullyOpen(true);
        Animated.spring(overlayPosition, {
          toValue: fullyOpenHeight,
          useNativeDriver: false,
        }).start();
      } else {
        // Return to closest position
        const targetPosition = isFullyOpen ? fullyOpenHeight : partiallyOpenHeight;
        Animated.spring(overlayPosition, {
          toValue: targetPosition,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  return (
    <Animated.View
      style={[
        styles.overlay,
        {
          transform: [{ translateY: overlayPosition }],
        },
      ]}
      {...(isAtTop ? panResponder.panHandlers : {})} // Enable gestures only at the top edge
    >
      <View style={styles.handle} />
      <ScrollView
        style={styles.scrollableContent}
        nestedScrollEnabled
        keyboardShouldPersistTaps="handled"
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  scrollableContent: {
    flex: 1,
    maxHeight: Dimensions.get('window').height * 0.65, // Restrict height to fit within overlay
  },
});

export default ScrollUpOverlay;