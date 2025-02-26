import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PomodoroState {
  sessionDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsUntilLongBreak: number;
  currentSessionCount: number;
}

const initialState: PomodoroState = {
  sessionDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  sessionsUntilLongBreak: 4,
  currentSessionCount: 0,
};

const pomodoroSlice = createSlice({
  name: "pomodoro",
  initialState,
  reducers: {
    setSessionDuration: (state, action: PayloadAction<number>) => {
      state.sessionDuration = action.payload;
    },
    setShortBreakDuration: (state, action: PayloadAction<number>) => {
      state.shortBreakDuration = action.payload;
    },
    setLongBreakDuration: (state, action: PayloadAction<number>) => {
      state.longBreakDuration = action.payload;
    },
    setSessionsUntilLongBreak: (state, action: PayloadAction<number>) => {
      state.sessionsUntilLongBreak = action.payload;
    },
    incrementSessionCount: (state) => {
      state.currentSessionCount += 1;
    },
    resetSessionCount: (state) => {
      state.currentSessionCount = 0;
    },
  },
});

export const { 
  setSessionDuration, 
  setShortBreakDuration,
  setLongBreakDuration,
  setSessionsUntilLongBreak,
  incrementSessionCount,
  resetSessionCount, 
} = pomodoroSlice.actions;
export default pomodoroSlice.reducer;
