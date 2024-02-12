import { Pressable, Text, View, Image } from "react-native";
import React from "react";
import Styles from "../styles/styles";
import { Link } from "expo-router";
import bgimage from "../assets/mole.png";

export default function Page() {
  // Define levels
  const levels = [1, 2, 3, 4, 5];

  return (
    <View style={Styles.container}>
      <Image source={bgimage} style={{width: 200, height: 200}} />
      <Text style={Styles.title}>Whack-a-Mole {"\n"}</Text>
      <Text style={Styles.subtitle}>
        The objective of the game is to eliminate the moles. {"\n"}
        The game ends after you miss five moles. {"\n"}
        Win by reaching the target score. {"\n"}{"\n"}
      </Text>

    <View style={Styles.grid}>
      {levels.map((level) => (
        <Link
          key={level}
          style={Styles.button}
          href={{
            pathname: "/game",
            params: { level },
          }} asChild
        >
          <Pressable style={Styles.pressable}>
            <Text style={Styles.buttonText}>Level {level}</Text>
          </Pressable>
        </Link>
      ))}
      </View>
    </View>
  );
}

