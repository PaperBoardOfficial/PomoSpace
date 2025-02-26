import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useAppDispatch } from "../store/hooks";
import {
  setSessionDuration, 
  setShortBreakDuration,
  setLongBreakDuration,
  setSessionsUntilLongBreak
} from "../store/slices/pomodoroSlice";
import { PomodoroScreenProps } from './types';


const PomodoroSettingsScreen: React.FC<PomodoroScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const [sessionTime, setSessionTime] = useState("");
  const [shortBreakTime, setShortBreakTime] = useState("");
  const [longBreakTime, setLongBreakTime] = useState("");
  const [sessionsCount, setSessionsCount] = useState("");

  const handleSave = () => {
    if (!isNaN(parseInt(sessionTime))) dispatch(setSessionDuration(parseInt(sessionTime) * 60));
    if (!isNaN(parseInt(shortBreakTime))) dispatch(setShortBreakDuration(parseInt(shortBreakTime) * 60));
    if (!isNaN(parseInt(longBreakTime))) dispatch(setLongBreakDuration(parseInt(longBreakTime) * 60));
    if (!isNaN(parseInt(sessionsCount))) dispatch(setSessionsUntilLongBreak(parseInt(sessionsCount)));
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Set Session Time (minutes):</Text>
      <TextInput keyboardType="numeric" value={sessionTime} onChangeText={setSessionTime} placeholder="25" />
      
      <Text>Set Short Break Time (minutes):</Text>
      <TextInput keyboardType="numeric" value={shortBreakTime} onChangeText={setShortBreakTime} placeholder="5" />

      <Text>Set Long Break Time (minutes):</Text>
      <TextInput keyboardType="numeric" value={longBreakTime} onChangeText={setLongBreakTime} placeholder="15" />

      <Text>Sessions Until Long Break:</Text>
      <TextInput keyboardType="numeric" value={sessionsCount} onChangeText={setSessionsCount} placeholder="4" />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default PomodoroSettingsScreen;
