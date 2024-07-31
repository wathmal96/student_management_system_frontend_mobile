import React, { useRef } from 'react';
import { Animated, StyleSheet, View, Text } from 'react-native';
import { GestureHandlerRootView, RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const AppleStyleSwipeableRow = () => {
  const swipeableRef = useRef(null);

  const clickLeft = () => {
    swipeableRef.current.close();
    console.log("left action");
  };

  const clickRight = () => {
    swipeableRef.current.close();
    console.log("right action");
  };

  const renderLeftActions = (progress, dragX) => {


    return (
      <RectButton style={styles.leftAction} onPress={clickLeft}>
        <Animated.Text
          style={[
            styles.actionText,
          ]}
        >
          Archive
        </Animated.Text>
      </RectButton>
    );
  };

  const renderRightActions = (progress, dragX) => {


    return (
      <RectButton style={styles.rightAction} onPress={clickRight}>
        <Animated.Text
          style={[
            styles.actionTextRight,
          ]}
        >
          Archive
        </Animated.Text>
      </RectButton>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Swipeable
        ref={swipeableRef}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
  
      >
        <View style={styles.swipeableRow}>
          <Text style={styles.rowText}>Hello</Text>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swipeableRow: {
    padding: 20,
    backgroundColor: 'white',
  },
  leftAction: {
    flex: 1,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'flex-start',
  
  },
  rightAction: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    padding: 10,
    textAlign: 'left',
  },
  actionTextRight: {
    color: 'white',
    fontSize: 16,
    padding: 10,
    textAlign: 'right',
  },
  rowText: {
    fontSize: 18,
  },
});

export default AppleStyleSwipeableRow;
