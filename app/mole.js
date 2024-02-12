import { useState, useEffect } from "react";
import React from "react";
import { Text, TouchableOpacity, Animated, Image } from "react-native";
import moleImage from "../assets/mole3.png";

const Mole = ({ visible, onWhack }) => {
  if (!visible) return null; // Don't render if not visible

  const [fadeAnim] = useState(new Animated.Value(0)); // Initial opacity is 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: visible ? 1 : 0, // Fade in if visible, else fade out
      duration: 500, // 500ms fade
      useNativeDriver: true,
    }).start();
  }, [visible]);

  // <Text style={{ fontSize: 50 }}>🐹</Text> - OLD MOLE
  return (
    <Animated.View
      style={{
        opacity: fadeAnim,  // Bind opacity to animated value
      }}
    >
    <TouchableOpacity onPress={onWhack}>
      <Image source={moleImage} style={{width: 80, height: 80}} />
    </TouchableOpacity>
    </Animated.View>
  );
};

export default Mole;
