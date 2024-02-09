import { Pressable, Text, View } from "react-native";
import React from "react";
import Styles from "../styles/styles";
import { Link } from "expo-router";

export default function Page() {
  return (
    <View style={Styles.container}>
      <Text style={Styles.title}>Whack-a-Mole</Text>
      <Text style={Styles.subtitle}>:)</Text>
      <Link
        style={Styles.button}
        href={{
          pathname: "/game",
        }} asChild
      >
        <Pressable style={Styles.pressable}>
          <Text style={Styles.buttonText}>PLAY</Text>
        </Pressable>
      </Link>
    </View>
  );
}
