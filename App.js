import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button } from "react-native";
import Mole from "./app/mole";
import styles from "./styles/styles";
import { StatusBar } from "expo-status-bar";

const App = () => {
  const [activeMole, setActiveMole] = useState(null); // Track the active mole
  const [score, setScore] = useState(0); // Track the score
  const [misses, setMisses] = useState(0); // Track the misses
  const moleTimerRef = useRef(null); // Reference to keep track of the timer
  const [prbutton, setPrbutton] = useState(true); // Track the state of the pause and resume button

  const switchMole = () => {
    const nextMole = Math.floor(Math.random() * 9); // Assuming 9 moles
    setActiveMole(nextMole);
  
    if (moleTimerRef.current) {
      clearInterval(moleTimerRef.current);
    }
  
    moleTimerRef.current = setTimeout(() => {
      setActiveMole((currentActiveMole) => {
        // Check if the mole was not whacked
        if (currentActiveMole === nextMole) {
          setMisses((currentMisses) => currentMisses + 1);
          console.log("Missed a mole!");
        }
        return null; // Hide the mole
      });
      switchMole(); // Optionally immediately switch to another mole
    }, 2000);
  };

  // Function to handle mole whacking
  const handleWhack = () => {
    // Increment the score
    setScore(score + 1);
    console.log("Mole whacked!", score + 1);
    
    clearInterval(moleTimerRef.current); // Clear the current timer
    setActiveMole(null); // Hide the mole immediately
    moleTimerRef.current = setInterval(switchMole, 2000); // Start a new cycle after a delay
  };

  useEffect(() => {
    moleTimerRef.current = setInterval(switchMole, 2000); // Change mole every 2 seconds
    return () => clearInterval(moleTimerRef.current); // Cleanup on unmount
  }, [setActiveMole]);

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30}}>Whack-a-Mole</Text>
      <Text>Score: {score}</Text>
      <Text>Misses: {misses}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Reset"
          onPress={() => {
            clearInterval(moleTimerRef.current); // Clear the current timer
            setActiveMole(null); // Hide the mole immediately
            setScore(0); // Reset the score
            setMisses(0);
            moleTimerRef.current = setInterval(switchMole, 2000); // Change mole every 2 seconds
            setPrbutton(true);
            console.log("Game Reset")
          }}
        >
          Reset Game
        </Button>
        <View style={{ width: 20, height: 'auto' }} /> 
        <Button
          title={prbutton ? "Pause" : "Resume"}
          onPress={() => {
            if (prbutton) {
              clearInterval(moleTimerRef.current);
              setActiveMole(null);
              setPrbutton(false);
              console.log("Game Paused");
            } else {
              moleTimerRef.current = setInterval(switchMole, 2000);
              setPrbutton(true);
              console.log("Game Resumed");
            }
          }}
        >
          Pause Game
        </Button>
        </View>
      <StatusBar style="auto" />
      <View style={styles.grid}>
        {Array.from({ length: 9 }).map((_, index) => (
          <View key={index} style={styles.cell}>
            <Mole visible={activeMole === index} onWhack={handleWhack} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default App;
