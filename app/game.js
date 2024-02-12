import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, TouchableOpacity, Image } from "react-native";
import Mole from "./mole";
import styles from "../styles/styles";
import { StatusBar } from "expo-status-bar";
import { Link, useLocalSearchParams } from "expo-router";
import pauseImage from "../assets/pause.png";
import homeImage from "../assets/home.png";
import nextImage from "../assets/arrow.png";
import resetImage from "../assets/reset.png";
import victoryMole from "../assets/mole2.png";

const App = () => {
  const [activeMole, setActiveMole] = useState(null);
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const moleTimerRef = useRef(null);
  const [prbutton, setPrbutton] = useState(true);
  const params = useLocalSearchParams();
  const { level } = params;
  const [speed, setSpeed] = useState(2000);
  const [tiles, setTiles] = useState(3);
  const [isPauseMenuVisible, setIsPauseMenuVisible] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [victory, setVictory] = useState(false);
  const [totalVictory, setTotalVictory] = useState(false);
  const targetScores = { 1: 5, 2: 10, 3: 20, 4: 10, 5: 5 };
  const [currentLevel, setCurrentLevel] = useState(parseInt(level, 10));
  const maxMissesAllowed = 5;
  const gameActiveRef = useRef(true);

  // Speed effect - start or resume the mole switching when the game is not paused.
  useEffect(() => {
    // If the game is not paused, start or resume the mole switching.
    if (!isPauseMenuVisible) {
      moleTimerRef.current = setInterval(switchMole, speed);
    }
    // Cleanup function to clear the interval when the component unmounts or the pause menu becomes visible.
    return () => clearInterval(moleTimerRef.current);
  }, [speed, isPauseMenuVisible]);

  // Game level effect - update the game level when the level parameter changes.
  useEffect(() => {
    setLevel();
  }, [currentLevel]);

  // Tiles/Speed effect - set the tiles and speed based on the current level.
  const setLevel = () => {
    console.log("Current Level: ", currentLevel);
    switch (currentLevel) {
      case 1:
        setSpeed(1000);
        setTiles(6);
        setCurrentLevel(1);
        break;
      case 2:
        setSpeed(900);
        setTiles(9);
        setCurrentLevel(2);
        break;
      case 3:
        setSpeed(800);
        setTiles(12);
        setCurrentLevel(3);
        break;
      case 4:
        setSpeed(700);
        setTiles(12);
        setCurrentLevel(4);
        break;
      case 5:
        setSpeed(600);
        setTiles(15);
        setCurrentLevel(5);
        break;
      default:
        setSpeed(2000);
        setTiles(6);
        setCurrentLevel(1);
    }
  };

  // Mole switching effect - switch the mole when the game is active.
  const switchMole = () => {
    if (!gameActiveRef.current) {
      return; // Immediately exit if the game is not active
    }

    const nextMole = Math.floor(Math.random() * tiles);
    setActiveMole(nextMole);

    clearTimeout(moleTimerRef.current); // Ensure previous timeout is cleared

    moleTimerRef.current = setTimeout(() => {
      setActiveMole((currentActiveMole) => {
        if (currentActiveMole === nextMole) {
          setMisses((currentMisses) => {
            const newMisses = currentMisses + 1;
            if (newMisses >= maxMissesAllowed) {
              gameActiveRef.current = false; // Stop the game
              setGameOver(true);
              setActiveMole(null);
              return newMisses;
            }
            return newMisses;
          });
        }
        if (gameActiveRef.current) {
          switchMole(); // Continue only if the game is still active
        }
      });
    }, speed);
  };

  // Whack effect - handle the whack event when the mole is whacked. Handle the Victory and Total Victory conditions.
  const handleWhack = () => {
    const newScore = score + 1;
    setScore(newScore);
    clearInterval(moleTimerRef.current);
    setActiveMole(null);
    moleTimerRef.current = setInterval(switchMole, speed);
    console.log("whack");

    if (newScore >= targetScores[currentLevel]) {
      if (currentLevel === 5) {
        setTotalVictory(true);
        clearInterval(moleTimerRef.current);
        return;
      }
      setVictory(true);
      clearInterval(moleTimerRef.current); // Stop the game
    }
  };

  // Pause/Resume effect - toggle the pause/resume state when the pause/resume button is clicked.
  const togglePauseResume = () => {
    // Toggle the game pause state and pause menu visibility together.
    setPrbutton(!prbutton);
    setIsPauseMenuVisible(!isPauseMenuVisible);

    // Directly control the game's state based on the pause/resume button state.
    if (prbutton) {
      clearInterval(moleTimerRef.current);
      setActiveMole(null);
    } else {
      moleTimerRef.current = setInterval(switchMole, speed);
    }
  };

  // Close Pause Menu and Resume Game effect - close the pause menu and resume the game when the resume button is clicked.
  const closePauseMenuAndResumeGame = () => {
    setIsPauseMenuVisible(false);
    setPrbutton(true); // Ensure game is marked as resumed.
  };

  // Next Level effect - handle the next level event when the next level button is clicked.
  const handleNextLevel = () => {
    const nextLevel = currentLevel + 1;
    if (nextLevel <= 5) {
      setCurrentLevel(nextLevel); // This method would trigger a state update that your game responds to
      console.log("nextLevel", nextLevel);
      console.log("currentLevel", currentLevel);
      setVictory(false); // Reset victory state to hide the victory overlay
      clearInterval(moleTimerRef.current);
      setActiveMole(null);
      setScore(0);
      setMisses(0);
      moleTimerRef.current = setInterval(switchMole, speed);
      setPrbutton(true);
      setIsPauseMenuVisible(false);
    }
  };

  // Reset Game effect - reset the game when the reset button is clicked.
  const resetGame = () => {
    gameActiveRef.current = true; // Allow the game to run again
    clearInterval(moleTimerRef.current);
    setActiveMole(null);
    setScore(0);
    setMisses(0);
    setGameOver(false); // Reset game over state
    setVictory(false); // Reset victory state
    setPrbutton(true);
    setIsPauseMenuVisible(false);
    switchMole();
  };

  // Speed effect - log the speed when it changes. (DEBUG)
  useEffect(() => {
    console.log("speed", speed);
  }, [speed]);

  // Function to output the back to home button
  backToHome = () => {
    return (
      <Link style={styles.button} href={{ pathname: "/" }} asChild>
        <Pressable style={styles.pressable}>
          <Image source={homeImage} style={{ width: 40, height: 40 }} />
        </Pressable>
      </Link>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Level: {currentLevel}</Text>
      <Text style={{ fontSize: 20 }}>
        Score: {score}/{targetScores[currentLevel]}
      </Text>
      <Text style={{ fontSize: 20 }}>Misses: {misses}/5</Text>

      <View style={styles.row}>
        {backToHome()}
        <TouchableOpacity onPress={togglePauseResume} style={styles.pressable}>
          <Image source={pauseImage} style={{ width: 50, height: 50 }} />
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
      <View style={styles.grid}>
        {Array.from({ length: tiles }).map((_, index) => (
          <View key={index} style={styles.cell}>
            <Mole visible={activeMole === index} onWhack={handleWhack} />
          </View>
        ))}
      </View>
      {isPauseMenuVisible && (
        <View style={styles.overlay}>
          <Text style={styles.menuTitle}>Game Paused</Text>
          <Pressable
            style={[styles.pressable, styles.menuButton]}
            onPress={() => {
              resetGame();
            }}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
          <Pressable
            style={[styles.pressable, styles.menuButton]}
            onPress={closePauseMenuAndResumeGame}
          >
            <Text style={styles.buttonText}>Resume</Text>
          </Pressable>
        </View>
      )}
      {victory && (
        <View style={styles.overlay}>
          <Text style={styles.menuTitle}>Victory!</Text>
          <Pressable style={styles.pressable} onPress={handleNextLevel}>
            <Image source={nextImage} style={{ width: 40, height: 40 }} />
          </Pressable>
          {backToHome()}
        </View>
      )}
      {gameOver && (
        <View style={styles.overlay}>
          <Text style={styles.menuTitle}>Game Over!</Text>
          <Pressable style={styles.pressable} onPress={resetGame}>
            <Image source={resetImage} style={{ width: 40, height: 40 }} />
          </Pressable>
          {backToHome()}
        </View>
      )}
      {totalVictory && (
        <View style={styles.overlay}>
          <Image source={victoryMole} style={{ width: 100, height: 100 }} />
          <Text style={styles.menuTitle}>Total Victory!</Text>
          {backToHome()}
        </View>
      )}
    </View>
  );
};

export default App;
