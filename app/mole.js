import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Mole = ({ visible, onWhack }) => {
  if (!visible) return null; // Don't render if not visible

  return (
    <TouchableOpacity onPress={onWhack}>
      <Text style={{fontSize: 40}}>🐹</Text>
    </TouchableOpacity>
  );
};

export default Mole;
