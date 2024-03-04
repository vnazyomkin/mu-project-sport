import { configureStore } from '@reduxjs/toolkit'
import calendarDay from './calendarDay'
import exerciseDataSlice from './exerciseDataSlice'
import dataProfileSlice from './dataProfileSlice'

const store = configureStore({
  reducer: {
    dataProfileSlice: dataProfileSlice,
    exercise: exerciseDataSlice,
    days: calendarDay,
  },
})

export default store
