import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "@react-native-vector-icons/material-design-icons";
import { useAppSelector } from "../store/hooks";
import { PomodoroScreenProps } from "./types";
import { GestureDetector, Gesture, Directions } from "react-native-gesture-handler";

const PomodoroScreen: React.FC<PomodoroScreenProps> = ({ navigation }) => {
  const sessionDuration = useAppSelector((state) => state.pomodoro.sessionDuration);
  const shortBreakDuration = useAppSelector((state) => state.pomodoro.shortBreakDuration);
  const longBreakDuration = useAppSelector((state) => state.pomodoro.longBreakDuration);
  const sessionsUntilLongBreak = useAppSelector((state) => state.pomodoro.sessionsUntilLongBreak);

  const [timeLeft, setTimeLeft] = useState(sessionDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSessionCount, setCurrentSessionCount] = useState(0);
  const [phase, setPhase] = useState<"session" | "shortBreak" | "longBreak">("session");

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      transitionToNextPhase();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  // Reset timer when settings change
  useEffect(() => {
    setTimeLeft(sessionDuration);
    setIsRunning(false);
    setPhase("session");
    setCurrentSessionCount(0);
  }, [sessionDuration, shortBreakDuration, longBreakDuration, sessionsUntilLongBreak]);

  // Handle play/pause
  const handleTimerPress = () => {
    setIsRunning((prev) => !prev);
  };

  // Transition between session, short break, and long break
  const transitionToNextPhase = () => {
    if (phase === "session") {
      if (currentSessionCount + 1 >= sessionsUntilLongBreak) {
        setPhase("longBreak");
        setTimeLeft(longBreakDuration);
        setCurrentSessionCount(0);
      } else {
        setPhase("shortBreak");
        setTimeLeft(shortBreakDuration);
        setCurrentSessionCount((prev) => prev + 1);
      }
    } else {
      setPhase("session");
      setTimeLeft(sessionDuration);
    }
    setIsRunning(false);
  };

  // Swipe Left to Skip Phase
  const swipeLeft = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      transitionToNextPhase();
    });

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (

    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Settings Button */}
      <TouchableOpacity
        style={{ position: "absolute", top: 40, right: 20 }}
        onPress={() => navigation.navigate("PomodoroSettingsScreen")}
      >
        <Icon name="cog" size={30} color="black" />
      </TouchableOpacity>

      <GestureDetector gesture={swipeLeft}>
        <View>
          {/* Phase Text */}
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            {phase === "session"
              ? "Focus Session"
              : phase === "shortBreak"
                ? "Short Break"
                : "Long Break"}
          </Text>

          {/* Timer Display */}
          <TouchableOpacity onPress={handleTimerPress}>
            <Text style={{ fontSize: 40, fontWeight: "bold", textAlign: 'center'}}>
              {formatTime(timeLeft)}
            </Text>
          </TouchableOpacity>
        </View>
      </GestureDetector>

      {/* Session Progress */}
      <View style={{ position: "absolute", bottom: 20, right: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          {currentSessionCount}/{sessionsUntilLongBreak} sessions
        </Text>
      </View>
    </View>

  );
};

export default PomodoroScreen;
