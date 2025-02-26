import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '@react-native-vector-icons/material-design-icons';
import SpacedRepetitionScreen from '../screens/SpacedRepetitionScreen';
import HabitTrackingScreen from '../screens/HabitTrackingScreen';
import PomodoroStackNavigator from './PomodoroStackNavigator';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: 'timer-outline' | 'calendar-clock-outline' | 'checkbox-marked-outline' = 'timer-outline';
        if (route.name === 'Pomodoro') {
          iconName = 'timer-outline';
        } else if (route.name === 'Spaced Repetition') {
          iconName = 'calendar-clock-outline';
        } else if (route.name === 'Habit Tracking') {
          iconName = 'checkbox-marked-outline';
        }
        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarStyle: {
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        paddingTop: 5,
        height: Platform.OS === 'ios' ? 60 : 50,
        backgroundColor: '#fff',
        elevation: 5,
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      tabBarShowLabel: false,
    })}
  >
    <Tab.Screen name="Pomodoro" component={PomodoroStackNavigator} />
    <Tab.Screen name="Spaced Repetition" component={SpacedRepetitionScreen} />
    <Tab.Screen name="Habit Tracking" component={HabitTrackingScreen} />
  </Tab.Navigator>
);

export default TabNavigator;