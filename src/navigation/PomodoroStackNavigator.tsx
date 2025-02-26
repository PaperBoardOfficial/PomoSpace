import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PomodoroScreen from '../screens/PomodoroScreen';
import PomodoroSettingsScreen from '../screens/PomodoroSettingsScreen';

const PomodoroStack = createStackNavigator();

const PomodoroStackNavigator = () => (
  <PomodoroStack.Navigator screenOptions={{ headerShown: false }}>
    <PomodoroStack.Screen name="PomodoroMain" component={PomodoroScreen} />
    <PomodoroStack.Screen name="PomodoroSettingsScreen" component={PomodoroSettingsScreen} />
  </PomodoroStack.Navigator>
);

export default PomodoroStackNavigator;